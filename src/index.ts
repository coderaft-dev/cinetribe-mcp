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

// Support both HTTP (for Cloud Run) and stdio (for local MCP)
const PORT = process.env.PORT || 3000;
const isCloudRun = process.env.NODE_ENV === 'production' && process.env.PORT;

let httpServer: http.Server | null = null;

// Graceful shutdown handling
const gracefulShutdown = (signal: string) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  
  if (httpServer) {
    httpServer.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
    
    // Force close after 10 seconds
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

// Handle process signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

if (isCloudRun) {
  console.log('Starting in Cloud Run mode...');
  console.log(`Port: ${PORT}`);
  console.log(`Node Environment: ${process.env.NODE_ENV}`);
  console.log(`TMDB API Key configured: ${!!TMDB_API_KEY}`);
  
  // HTTP server for Cloud Run
  httpServer = http.createServer(async (req, res) => {
    try {
      if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          status: 'healthy', 
          service: 'cinetribe-mcp-tmdb',
          tmdb_api_key_configured: !!TMDB_API_KEY,
          timestamp: new Date().toISOString()
        }));
        return;
      }
      
      if (req.method === 'GET' && req.url === '/ready') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          status: 'ready', 
          service: 'cinetribe-mcp-tmdb',
          tmdb_api_key_configured: !!TMDB_API_KEY,
          timestamp: new Date().toISOString()
        }));
        return;
      }

      if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          service: 'CineTribe MCP TMDB Server',
          version: SERVER_CONFIG.version,
          status: 'running',
          tmdb_api_key_configured: !!TMDB_API_KEY,
          timestamp: new Date().toISOString(),
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
    } catch (error) {
      console.error('Request handling error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });

  console.log('HTTP server created, starting to listen...');
  
  httpServer.listen(PORT, () => {
    console.log(`✅ CineTribe MCP TMDB Server running on port ${PORT}`);
    console.log(`✅ Health check: http://localhost:${PORT}/health`);
    console.log(`✅ MCP endpoint: http://localhost:${PORT}/mcp`);
    console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ Process ID: ${process.pid}`);
    console.log(`✅ TMDB API Key configured: ${!!TMDB_API_KEY}`);
    
    if (!TMDB_API_KEY) {
      console.warn('⚠️  Warning: TMDB_API_KEY environment variable is not set. MCP tools will not function properly.');
    }
    
    // Log that the server is ready to accept requests
    console.log('🚀 Server is ready to accept requests');
    
    // Send a signal that the server is fully started
    if (process.send) {
      process.send('ready');
    }
  });

  // Handle server errors
  httpServer.on('error', (error) => {
    console.error('HTTP server error:', error);
    process.exit(1);
  });
} else {
  // Stdio transport for local MCP
  if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY environment variable is required for local MCP mode");
    process.exit(1);
  }
  
  const transport = new StdioServerTransport();
  server.connect(transport).catch((error) => {
    console.error("Server connection error:", error);
    process.exit(1);
  });
}
