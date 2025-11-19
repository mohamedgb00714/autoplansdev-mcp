# Autoplans MCP Server

**What We've Built**

This repo contains everything needed to publish your Autoplans.dev MCP server to the official registry:

1. **`server.json`** - MCP Registry manifest using latest 2025-10-17 schema
2. **`package.json`** - npm package configuration  
3. **`index.js`** - stdio wrapper that proxies to your HTTP API
4. **`mcp.json`** - Original manifest (kept for reference)

**How It Works**

Your server runs as HTTP at `https://autoplans.dev/api/v1/mcp`, but the MCP Registry expects stdio-based packages. Our wrapper solves this by:

- Publishing an npm package that provides stdio transport
- Proxying MCP stdio calls to your HTTP API  
- Requiring users to set `AUTOPLANS_API_KEY` environment variable
- Enabling discovery through the official MCP Registry

**Publishing Status**
- ✅ GitHub repo: https://github.com/mohamedgb00714/autoplans-mcp
- ✅ npm package: https://npm.im/autoplans-mcp v0.1.1  
- ✅ MCP Registry: https://registry.modelcontextprotocol.io/v0/servers?search=autoplans
- ✅ **LIVE AND DISCOVERABLE!** 🎉

**Installation & Usage**

```bash
# Install the MCP server
npm install -g autoplans-mcp

# Set your API key (get from https://autoplans.dev)  
export AUTOPLANS_API_KEY="your_api_key_here"

# Use with any MCP client
autoplans-mcp
```

**Quick Setup for Popular Editors**

**VS Code / Cursor:**
```json
{
  "mcp.servers": {
    "autoplans": {
      "command": "npx",
      "args": ["autoplans-mcp"],
      "env": {
        "AUTOPLANS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**Claude Desktop:**
```json
{
  "mcpServers": {
    "autoplans": {
      "command": "npx",
      "args": ["autoplans-mcp"],
      "env": {
        "AUTOPLANS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

📖 **[Complete Installation Guide](./INSTALLATION.md)** - Detailed setup for all editors

**Publish steps**

Initialize git and push to GitHub (example):

```bash
git init
git add .
git commit -m "Initial MCP manifest and README"
git branch -M main
git remote add origin https://github.com/msaid/autoplans-mcp.git
git push -u origin main
```

Install the MCP Publisher CLI (example on macOS using Homebrew):

```bash
brew install mcp-publisher
```

Authenticate with the MCP registry:

```bash
mcp-publisher login
```

Publish the manifest (run from the repo root where `mcp.json` lives):

```bash
mcp-publisher publish ./mcp.json
```

The registry will register your server and make the listed tools discoverable.

**Updating / Releasing**
1. Bump the `version` field in `mcp.json`.
2. Commit and push the change to GitHub.
3. Run `mcp-publisher publish ./mcp.json` again to update the registry pointer.

**Security & Auth**
- `mcp.json` in this repo indicates `bearer` auth for clients (API keys in `Authorization` header).
- Ensure your server validates and scopes API keys correctly.

**API Examples**

Get all available tools:
```bash
curl -X POST "https://autoplans.dev/api/v1/mcp" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'
```

Call a tool (list projects):
```bash
curl -X POST "https://autoplans.dev/api/v1/mcp" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "list_projects",
      "arguments": { "limit": 5 }
    }
  }'
```

**Available Tools (14+)**
- **Projects**: `list_projects`, `create_project`, `get_project`
- **Tasks**: `create_task`, `list_tasks`, `get_task`, `update_task`, `delete_task`
- **Bulk Operations**: `bulk_update_tasks`, `bulk_create_tasks`
- **Business Plans**: `get_business_plan`, `create_business_plan`
- **Branding**: `get_branding`, `create_branding`

**Ready to Publish!**

Your MCP server is fully functional and the manifest is complete. To publish to the official MCP registry:

1. **Push to GitHub**: Run the git commands above
2. **Install MCP Publisher**: `brew install mcp-publisher` (or download for your OS)
3. **Authenticate**: `mcp-publisher login`
4. **Publish**: `mcp-publisher publish ./mcp.json`

**Get Your API Key**
Users need their own API key from https://autoplans.dev to use these tools.

**Need Help?**
- Server issues: contact support@autoplans.dev
- MCP registry: check https://github.com/mcp documentation
