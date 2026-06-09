# 🍔 Machdollas AI Customer Support

An AI-powered customer support chatbot for Machdollas restaurant, built with n8n, Google Sheets, and a custom HTML frontend.

---

## ✨ Features

- 📋 **View Menu** — Browse items, prices, and availability
- 🛒 **Place Orders** — AI collects order details and confirms before placing
- 📦 **Track Orders** — Check real-time order status by Order ID
- ✏️ **Update Orders** — Add items to existing orders
- ❌ **Cancel Orders** — Cancel orders that are still being prepared
- 📧 **Email Confirmation** — Automatic confirmation email on order placement

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| AI Agent | n8n + OpenRouter (LLM) |
| Database | Google Sheets |
| Frontend | HTML + Tailwind CSS |
| Hosting (backend) | Railway |
| Hosting (frontend) | Vercel |
| Email | Gmail (via n8n) |

---

## 📁 Project Structure

```
machdollas-ai/
├── index.html          → Chat frontend (deployed on Vercel)
├── workflow.json       → n8n workflow (deployed on Railway)
└── README.md           → This file
```

---

## ⚙️ Setup

### 1. n8n (Railway)
- Deploy n8n on Railway using the n8n template
- Import `workflow.json`
- Add credentials: Google Sheets, OpenRouter, Gmail
- Set environment variables:
  ```
  N8N_CORS_ORIGIN = *
  WEBHOOK_URL     = https://your-app.railway.app
  N8N_HOST        = 0.0.0.0
  N8N_PORT        = 5678
  ```
- Activate the workflow

### 2. Frontend (Vercel)
- Update webhook URL in `index.html`:
  ```js
  const webhookUrl = 'https://your-app.railway.app/webhook/YOUR-ID/chat';
  ```
- Deploy `index.html` on Vercel

---

## 📊 Google Sheets Structure

### Sheet 1 — Menu Items
| Category | Item Name | Description | Price | Available | Prep Time |

### Sheet 2 — Orders
| Order ID | Customer Name | Phone | Items | Quantity | Total | Status | Order Time | Estimated Ready Time |

---

## 🔄 Order Flow

```
Customer Message
      ↓
  AI Agent (Naveen)
      ↓
Place Order → Google Sheets (append)
Update/Cancel → Google Sheets (update by Order ID)
      ↓
Respond to Customer
```

---

## 📌 Order Statuses

| Status | Meaning |
|---|---|
| Preparing | Order received, kitchen working on it |
| Ready | Order ready for pickup/delivery |
| Delivered | Order delivered to customer |
| Cancelled | Order cancelled |

---

## 🤖 AI Agent

- **Name:** Naveen
- **Model:** Google Gemini (via OpenRouter)
- **Memory:** Simple Buffer Window Memory
- **Tools:** Menu Items, Post Order, Update and Cancel Order

---

## 👤 Author

Built by **[Your Name]**
