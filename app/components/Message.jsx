export default function Message({ text, isUser, time, chips, onChipClick }) {
  const formatMessage = (text) => {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  };

  return (
    <div className={`msg-row ${isUser ? "user" : "ai"}`}>
      {!isUser && <div className="msg-avatar">🤖</div>}
      <div className="msg-content">
        <div
          className="msg-bubble"
          dangerouslySetInnerHTML={{ __html: formatMessage(text) }}
        />
        {chips && chips.length > 0 && (
          <div className="quick-replies">
            {chips.map((chip, i) => (
              <button
                key={i}
                className="chip"
                onClick={() => onChipClick(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
        <div className="msg-time">{time}</div>
      </div>
      {isUser && <div className="msg-avatar">👤</div>}
    </div>
  );
}
