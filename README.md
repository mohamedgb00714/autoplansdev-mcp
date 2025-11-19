# Autoplans MCP Server

This repository contains the MCP manifest for the live **Autoplans.dev MCP Server** - a comprehensive project management and planning tool suite accessible via the Model Context Protocol.

**Files**
- `mcp.json` - MCP manifest with metadata, 14+ real tools, auth, and healthcheck
- `README.md` - Usage examples and publish instructions

**Live Server**: `https://autoplans.dev/api/v1/mcp`

**Ready to publish checklist**
✅ Server is live at `https://autoplans.dev/api/v1/mcp`  
✅ All 14+ tools are working (verified with curl)  
✅ Authentication with API keys is implemented  
✅ Health check endpoint is available  
✅ Manifest contains real tool schemas

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
