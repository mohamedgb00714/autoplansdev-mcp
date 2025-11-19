#!/usr/bin/env node

/**
 * Test script to verify Autoplans MCP server installation
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Testing Autoplans MCP Server Installation...\n');

// Check if API key is set
if (!process.env.AUTOPLANS_API_KEY) {
  console.error('❌ AUTOPLANS_API_KEY environment variable not set');
  console.log('💡 Set it with: export AUTOPLANS_API_KEY="your_api_key"');
  process.exit(1);
}

console.log('✅ AUTOPLANS_API_KEY is set');

// Test the server by sending a tools/list request
const serverPath = path.join(__dirname, 'index.js');
const server = spawn('node', [serverPath]);

let output = '';
let hasStarted = false;

server.stdout.on('data', (data) => {
  output += data.toString();
});

server.stderr.on('data', (data) => {
  const message = data.toString();
  if (message.includes('Autoplans MCP server running')) {
    console.log('✅ Server started successfully');
    hasStarted = true;
    
    // Send a tools/list request to test functionality
    const testRequest = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/list",
      params: {}
    }) + '\n';
    
    server.stdin.write(testRequest);
    
    setTimeout(() => {
      server.kill();
      if (output.includes('tools') || output.includes('list_projects')) {
        console.log('✅ Tools list received successfully');
        console.log('🎉 Installation test PASSED!');
        console.log('\n📖 Ready to use with:');
        console.log('   • VS Code MCP extension');
        console.log('   • Cursor editor');
        console.log('   • Claude Desktop');
        console.log('   • Any MCP-compatible client');
      } else {
        console.log('⚠️  Server started but no tools response received');
        console.log('🔍 Check your API key validity at https://autoplans.dev');
      }
    }, 2000);
  }
});

server.on('error', (error) => {
  console.error('❌ Server error:', error.message);
  process.exit(1);
});

// Timeout after 10 seconds
setTimeout(() => {
  if (!hasStarted) {
    console.error('❌ Server failed to start within 10 seconds');
    server.kill();
    process.exit(1);
  }
}, 10000);