#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

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

const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error("Server connection error:", error);
  process.exit(1);
});
