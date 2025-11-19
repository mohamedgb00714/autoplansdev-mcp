#!/usr/bin/env node

/**
 * MCP Server wrapper for Autoplans.dev HTTP API
 * This proxies MCP stdio calls to the Autoplans.dev HTTP server
 */

const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");

const AUTOPLANS_API_URL = "https://autoplans.dev/api/v1/mcp";

const server = new Server(
  {
    name: "autoplans-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool list handler - proxies to Autoplans API
server.setRequestHandler("tools/list", async () => {
  const apiKey = process.env.AUTOPLANS_API_KEY;
  if (!apiKey) {
    throw new Error("AUTOPLANS_API_KEY environment variable is required");
  }

  try {
    const response = await fetch(AUTOPLANS_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list",
        params: {}
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { tools: data.result?.tools || [] };
  } catch (error) {
    throw new Error(`Failed to fetch tools: ${error.message}`);
  }
});

// Tool call handler - proxies to Autoplans API  
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  const apiKey = process.env.AUTOPLANS_API_KEY;
  
  if (!apiKey) {
    throw new Error("AUTOPLANS_API_KEY environment variable is required");
  }

  try {
    const response = await fetch(AUTOPLANS_API_URL, {
      method: "POST", 
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: { name, arguments: args }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error(`Failed to call tool ${name}: ${error.message}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Autoplans MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});