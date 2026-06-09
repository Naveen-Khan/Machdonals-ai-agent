#!/usr/bin/env node

/**
 * n8n Workflow Auto-Import Script
 * This script imports the McDonald's chatbot workflow into n8n on startup
 */

const fs = require('fs');
const path = require('path');

// Read the workflow file
const workflowPath = path.join(__dirname, "McDonald's chatbot assistant copy (1).json");
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

// Export for n8n to use
module.exports = {
  workflows: [workflow]
};

console.log('✅ Workflow loaded:', workflow.name);

