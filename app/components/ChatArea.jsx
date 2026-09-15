"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

export default function ChatArea() {
  const [messages, setMessages] = useState([
    {
      text: "👋 Assalam-o-Alaikum! I'm **Naveen**, your AI assistant.\n\nI can help you with our menu, place orders, track your order status, or cancel/update existing orders. How can I help you today?",
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      chips: ["Show me the menu", "Place an order", "Track my order", "What are your offers?"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Generate a random session ID once when component mounts
  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    setSessionId("session-" + Math.random().toString(36).slice(2, 10));
  }, []);

  const scrollToBottom = () => {
    const container = document.getElementById("chatMessages");
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const parseResponse = (data) => {
    if (typeof data === "string") {
      try {
        const j = JSON.parse(data);
        return j.output || j.text || j.message || j.reply || j.response || JSON.stringify(j);
      } catch (e) {
        return data;
      }
    }
    if (typeof data === "object") {
      return data.output || data.text || data.message || data.reply || data.response || JSON.stringify(data);
    }
    return String(data);
  };

  const getSuggestedChips = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("placed") || lower.includes("order confirmed"))
      return ["📦 Track my order", "🍔 View menu", "✏️ Update my order"];
    if (lower.includes("menu") || lower.includes("burger") || lower.includes("meal"))
      return ["🛒 Place an order", "💰 Check prices", "🎉 View offers"];
    if (lower.includes("cancel"))
      return ["🛒 Place new order", "🍔 View menu"];
    if (lower.includes("track") || lower.includes("status") || lower.includes("delivery"))
      return ["📞 Contact support", "✏️ Update order"];
    return [];
  };

  const sendMessage = async (textOverride = null) => {
    const text = textOverride || inputValue.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add user message
    setMessages((prev) => [...prev, { text, isUser: true, time }]);
    setInputValue("");
    setIsTyping(true);
    
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const webhookUrl = "/api/chat";
      
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: text,
          sessionId: sessionId,
        }),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);

      const rawText = await res.text();
      const reply = parseResponse(rawText);
      const chips = getSuggestedChips(reply);

      setMessages((prev) => [
        ...prev,
        {
          text: reply || "No response received.",
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          chips,
        },
      ]);
    } catch (err) {
      console.error("Webhook error:", err);
      const msg = err.message || "";
      
      let errorText = "⚠️ Could not reach n8n. Make sure **n8n is running** and the workflow is **activated**.";
      
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("CORS") || msg.includes("blocked")) {
        errorText = "⚠️ **Connection blocked by CORS policy or server is asleep.**\n\nIf using Render, the instance might be spinning up. Wait a minute and try again.\n\nMake sure your n8n has `N8N_CORS_ORIGIN=*` set.";
        showToast("❌ CORS or Sleep issue — see chat");
      } else if (msg.includes("HTTP")) {
        errorText = `❌ Server returned an error (${msg}). Please check your n8n workflow is active.`;
        showToast("❌ " + msg);
      } else {
        showToast("❌ Connection failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          text: errorText,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
  };

  return (
    <>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onQuickAction={(text) => {
          setIsSidebarOpen(false);
          sendMessage(text);
        }}
      />
      
      <div className="chat-main">
        <div className="chat-header">
          <button 
            className="mobile-toggle" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <div className="header-avatar">🤖</div>
          <div className="header-info">
            <div className="header-title">Customer support Agent</div>
            <div className="header-sub">Typically replies instantly</div>
          </div>
          <div className="header-badge">Online</div>
        </div>

        <div className="chat-messages" id="chatMessages">
          <div className="date-divider">Today</div>
          
          {messages.map((msg, idx) => (
            <Message
              key={idx}
              text={msg.text}
              isUser={msg.isUser}
              time={msg.time}
              chips={msg.chips}
              onChipClick={sendMessage}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              className="message-input"
              rows={1}
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isTyping}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <div className="input-hint">Press Enter to send · Shift+Enter for new line</div>
        </div>

        <div className={`toast ${toastMessage ? "show" : ""}`}>
          {toastMessage}
        </div>
      </div>
    </>
  );
}
