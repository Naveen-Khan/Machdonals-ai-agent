#!/bin/bash

# n8n Workflow Auto-Import Script
# This runs when n8n container starts

WORKFLOW_FILE="/root/repo/McDonald's chatbot assistant copy (1).json"
N8N_DATA_DIR="/data"
WORKFLOWS_DIR="$N8N_DATA_DIR/workflows"

# Create workflows directory if it doesn't exist
mkdir -p "$WORKFLOWS_DIR"

# Copy workflow file to n8n workflows directory
if [ -f "$WORKFLOW_FILE" ]; then
    cp "$WORKFLOW_FILE" "$WORKFLOWS_DIR/"
    echo "✅ Workflow imported: McDonald's chatbot assistant"
else
    echo "⚠️ Workflow file not found at $WORKFLOW_FILE"
fi

# Start n8n
exec n8n start

