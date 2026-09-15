"use client";

export default function Sidebar({ onQuickAction, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      <div className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        {/* Brand */}
        <div className="brand">
          <div className="brand-logo">
            <div className="brand-m">M</div>
            <div className="brand-name">machdonals</div>
          </div>
          <div className="brand-sub">Customer Support</div>
        </div>

        {/* Agent Status */}
        <div className="agent-status">
          <div className="agent-avatar">🤖</div>
          <div className="agent-info">
            <div className="agent-name">Customer support Agent</div>
            <div className="agent-role">Support Agent · Online</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-label">Quick Actions</div>
        <div className="quick-actions">
          <button
            className="quick-btn q-menu"
            id="btn-menu"
            onClick={() => onQuickAction("Show me the menu")}
          >
            <div className="qicon">🍔</div>
            View Menu
          </button>
          <button
            className="quick-btn q-order"
            id="btn-order"
            onClick={() => onQuickAction("I want to place an order")}
          >
            <div className="qicon">🛒</div>
            Place Order
          </button>
          <button
            className="quick-btn q-track"
            id="btn-track"
            onClick={() => onQuickAction("Track my order")}
          >
            <div className="qicon">📦</div>
            Track Order
          </button>
          <button
            className="quick-btn q-cancel"
            id="btn-cancel"
            onClick={() => onQuickAction("I want to cancel my order")}
          >
            <div className="qicon">❌</div>
            Cancel Order
          </button>
        </div>

        {/* Hours Widget */}
        <div className="hours-widget">
          <div className="hours-title">Restaurant Hours</div>
          <div className="hours-row">
            <span>Mon – Thu</span>
            <span>9am – 11pm</span>
          </div>
          <div className="hours-row">
            <span>Fri – Sat</span>
            <span>9am – 1am</span>
          </div>
          <div className="hours-row">
            <span>Sunday</span>
            <span>10am – 10pm</span>
          </div>
          <div className="hours-open">Open Now</div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          Powered by <span>n8n</span> AI Agent
        </div>
      </div>
    </>
  );
}
