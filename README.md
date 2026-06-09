# 🍔 Machdollas AI Customer Support Agent

A production-ready AI customer support chatbot designed for Machdollas (a McDonald's-style restaurant). This project provides an interactive, modern web interface that communicates seamlessly with a robust **n8n** automation backend to handle customer queries, track orders, and display menu options.

![Machdollas Chatbot](https://img.shields.io/badge/Status-Active-success.svg)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FVanilla%20JS-blue)
![Backend](https://img.shields.io/badge/Backend-n8n%20Automation-orange)
![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel%20%26%20Railway-black)

## ✨ Features

- **Real-Time Chat Interface**: A beautiful, dark-themed UI with glassmorphism elements, micro-animations, and smooth transitions.
- **Smart AI Routing**: Powered by an n8n webhook, the agent intelligently handles natural language queries.
- **Quick Actions**: One-click quick reply buttons for common tasks like "View Menu", "Place Order", "Track Order", and "Cancel Order".
- **Dynamic Typing Indicators**: Simulates human-like response times with animated typing dots.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript
- **Backend / Automation Flow**: [n8n](https://n8n.io/)
- **Frontend Hosting**: [Vercel](https://vercel.com)
- **Backend Hosting**: [Railway](https://railway.app)

## 🚀 Architecture & Deployment

This project uses a decoupled architecture for maximum scalability and 24/7 uptime:

1. **Frontend (`index.html`)**: Hosted statically on Vercel. Contains the UI logic and sends `POST` requests to the n8n backend.
2. **Backend (n8n)**: Hosted continuously on Railway. Processes incoming webhooks, executes the AI/logic workflow, and returns JSON responses.

### Deployment Guide

#### 1. Backend (n8n on Railway)
- Deploy the n8n Docker image to Railway.
- Expose the following environment variables:
  - `N8N_PORT=5678`
  - `WEBHOOK_URL=https://<your-railway-app-url>`
  - `N8N_CORS_ORIGIN=*` *(Required to accept requests from the Vercel frontend)*
- Import the provided `McDonald's chatbot assistant copy (1).json` workflow into n8n.
- **Crucial**: Ensure the workflow is toggled to **Active** so the production webhook is registered.

#### 2. Frontend (Vercel)
- The frontend connects to the backend via the `RAILWAY_URL` configured in `index.html`.
- Pushing the code to the `main` branch automatically triggers a deployment on Vercel thanks to the `vercel.json` configuration.

## ⚙️ Configuration

To point the frontend to a different n8n instance, update the configuration block in `index.html`:

```javascript
//  CONFIG — Paste your Railway n8n URL below
// ════════════════════════════════════════════════════════
const RAILWAY_URL  = 'https://n8n-production-a44f.up.railway.app';
const WEBHOOK_PATH = '/webhook/9c586978-d61f-45ce-ae00-9c274f07ee26/chat';
// ════════════════════════════════════════════════════════
```

## 📝 License
This project is for educational/portfolio purposes.
