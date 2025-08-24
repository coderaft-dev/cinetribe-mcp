#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as http from 'http';

// Import modular components
import { TMDB_API_KEY, SERVER_CONFIG, CAPABILITIES } from './config/index.js';
import { TOOL_DEFINITIONS } from './tools/definitions.js';
import { ToolImplementations } from './tools/implementations.js';
import { ResourceHandlers } from './handlers/resourceHandlers.js';

// Create server instance
const server = new Server(SERVER_CONFIG, { capabilities: CAPABILITIES });

// Set up resource handlers
server.setRequestHandler(ListResourcesRequestSchema, ResourceHandlers.handleListResources);
server.setRequestHandler(ReadResourceRequestSchema, ResourceHandlers.handleReadResource);

// Set up tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOL_DEFINITIONS };
});

// Set up tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const args = request.params.arguments || {};
  return await ToolImplementations.executeTool(request.params.name, args);
});

// Start the server
if (!TMDB_API_KEY) {
  console.error("TMDB_API_KEY environment variable is required");
  process.exit(1);
}

// Support both HTTP (for Cloud Run) and stdio (for local MCP)
const PORT = process.env.PORT || 3000;
const isCloudRun = process.env.NODE_ENV === 'production' && process.env.PORT;

if (isCloudRun) {
  // HTTP server for Cloud Run
  const httpServer = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'healthy', service: 'cinetribe-mcp-tmdb' }));
      return;
    }
    
    if (req.method === 'GET' && req.url === '/ready') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ready', service: 'cinetribe-mcp-tmdb' }));
      return;
    }

    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        service: 'CineTribe MCP TMDB Server',
        version: SERVER_CONFIG.version,
        status: 'running',
        endpoints: {
          health: '/health',
          ready: '/ready',
          mcp: '/mcp (SSE endpoint)'
        }
      }));
      return;
    }

    if (req.url === '/mcp') {
      // SSE transport for MCP
      const transport = new SSEServerTransport("/mcp", res);
      await server.connect(transport);
      return;
    }

    // 404 for other paths
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  });

  httpServer.listen(PORT, () => {
    console.log(`CineTribe MCP TMDB Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);
  });
} else {
  // Stdio transport for local MCP
  const transport = new StdioServerTransport();
  server.connect(transport).catch((error) => {
    console.error("Server connection error:", error);
    process.exit(1);
  });
}
