# Installation Guide for Editors

## VS Code

### Method 1: MCP Extension (Recommended)
1. Install the MCP extension from VS Code marketplace
2. Open VS Code settings (Ctrl/Cmd + ,)
3. Search for "MCP"
4. Add server configuration:
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

### Method 2: Settings.json
Add to your VS Code `settings.json`:
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

## Cursor Editor

### Configuration
Add to Cursor's MCP settings:
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

## Claude Desktop

### Configuration File
Add to `~/.claude/claude_desktop_config.json`:
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

## Continue.dev

### Configuration
Add to your Continue configuration:
```json
{
  "mcpServers": [
    {
      "name": "autoplans",
      "command": "npx",
      "args": ["autoplans-mcp"],
      "env": {
        "AUTOPLANS_API_KEY": "your_api_key_here"
      }
    }
  ]
}
```

## Windmill (if supported)

### Configuration
```json
{
  "mcp_servers": {
    "autoplans": {
      "command": "npx autoplans-mcp",
      "env": {
        "AUTOPLANS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Global Installation (All Editors)

### Step 1: Install Globally
```bash
npm install -g autoplans-mcp
```

### Step 2: Set Environment Variable
```bash
# Linux/Mac - Add to ~/.bashrc or ~/.zshrc
export AUTOPLANS_API_KEY="your_api_key_here"

# Windows - Add to system environment variables
setx AUTOPLANS_API_KEY "your_api_key_here"
```

### Step 3: Use Direct Command
Use `autoplans-mcp` instead of `npx autoplans-mcp` in configurations.

## Getting Your API Key

1. Visit https://autoplans.dev
2. Sign up or log in
3. Navigate to API settings
4. Generate new API key
5. Copy and use in configurations above

## Troubleshooting

### Server Not Starting
- Verify `AUTOPLANS_API_KEY` is set
- Check if `npx autoplans-mcp` runs in terminal
- Ensure npm package is installed: `npm list -g autoplans-mcp`

### Permission Issues
```bash
# Fix npm permissions (Linux/Mac)
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
```

### Network Issues
- Verify https://autoplans.dev/api/v1/mcp is accessible
- Check firewall settings
- Ensure API key is valid

## Available Tools

Once configured, you'll have access to 14+ tools:
- **Projects**: list_projects, create_project, get_project
- **Tasks**: create_task, list_tasks, get_task, update_task, delete_task
- **Bulk Operations**: bulk_update_tasks, bulk_create_tasks
- **Business Plans**: get_business_plan, create_business_plan
- **Branding**: get_branding, create_branding