import { useChatMutation, type IChatMessage } from "@/redux/features/ai/ai.api";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import { Bot, ChevronDown, Loader2, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SUGGESTED_PROMPTS = [
  "What's my current balance?",
  "Summarise my recent activity",
  "How much have I spent this month?",
  "Am I receiving more than I'm sending?",
];

function TypingDots() {
  return (
    <span className="ai-typing-dots">
      <span />
      <span />
      <span />
    </span>
  );
}

function MessageBubble({ msg, isNew }: { msg: IChatMessage; isNew?: boolean }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`ai-message ${isUser ? "ai-message--user" : "ai-message--assistant"} ${isNew ? "ai-message--new" : ""}`}
    >
      {!isUser && (
        <div className="ai-avatar">
          <Bot size={14} />
        </div>
      )}
      <div className="ai-bubble">{msg.content}</div>
    </div>
  );
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<IChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [newMsgIndex, setNewMsgIndex] = useState<number | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const [sendMessage] = useChatMutation();

  const userName = userInfo?.data?.name?.split(" ")[0] ?? "there";

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isThinking]);

  const handleSend = async (text?: string) => {
    const message = (text ?? input).trim();
    if (!message || isThinking) return;

    const userMsg: IChatMessage = { role: "user", content: message };
    const nextHistory = [...history, userMsg];
    setHistory(nextHistory);
    setInput("");
    setIsThinking(true);
    setNewMsgIndex(null);

    try {
      const result = await sendMessage({ message, history }).unwrap();
      const assistantMsg: IChatMessage = {
        role: "assistant",
        content: result.data.reply,
      };
      setHistory((prev) => {
        const updated = [...prev, assistantMsg];
        setNewMsgIndex(updated.length - 1);
        return updated;
      });
      if (!open) setHasUnread(true);
    } catch {
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = history.length === 0;

  return (
    <>
      <style>{`
        /* ── Widget shell ── */
        .ai-widget {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 9999;
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* ── FAB button ── */
        .ai-fab {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
          box-shadow: 0 4px 24px rgba(22,163,74,0.45), 0 2px 8px rgba(0,0,0,0.18);
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
          color: white;
        }
        .ai-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 30px rgba(22,163,74,0.55), 0 2px 10px rgba(0,0,0,0.2);
        }
        .ai-fab:active { transform: scale(0.96); }
        .ai-fab-icon { transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
        .ai-fab.open .ai-fab-icon { transform: rotate(20deg); }

        .ai-unread-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: white;
          font-size: 11px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          animation: ai-badge-pop 0.3s cubic-bezier(.34,1.56,.64,1);
        }

        /* ── Panel ── */
        .ai-panel {
          position: absolute;
          bottom: 68px;
          right: 0;
          width: 360px;
          max-height: 560px;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: var(--ai-panel-bg, #ffffff);
          box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.08);
          transform-origin: bottom right;
          animation: ai-panel-in 0.28s cubic-bezier(.34,1.56,.64,1);
        }
        .dark .ai-panel {
          --ai-panel-bg: #1a1a2e;
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3);
        }

        /* ── Header ── */
        .ai-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
          color: white;
          flex-shrink: 0;
        }
        .ai-header-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ai-header-text { flex: 1; }
        .ai-header-title {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .ai-header-sub {
          font-size: 11px;
          opacity: 0.8;
          margin-top: 1px;
        }
        .ai-header-pill {
          font-size: 10px;
          font-weight: 600;
          background: rgba(255,255,255,0.2);
          padding: 2px 7px;
          border-radius: 20px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ai-close-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }
        .ai-close-btn:hover { background: rgba(255,255,255,0.28); }

        /* ── Messages ── */
        .ai-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--ai-msg-bg, #f8fafc);
          min-height: 200px;
        }
        .dark .ai-messages { --ai-msg-bg: #12121f; }
        .ai-messages::-webkit-scrollbar { width: 4px; }
        .ai-messages::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }

        /* ── Empty state ── */
        .ai-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 1;
          padding: 24px 16px;
          text-align: center;
        }
        .ai-empty-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #16a34a;
          margin-bottom: 4px;
        }
        .dark .ai-empty-icon { background: linear-gradient(135deg, #14532d33, #15803d33); }
        .ai-empty-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ai-text, #0f172a);
          letter-spacing: -0.01em;
        }
        .dark .ai-empty-title { --ai-text: #f8fafc; }
        .ai-empty-sub {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.5;
          max-width: 240px;
        }
        .dark .ai-empty-sub { color: #94a3b8; }

        /* ── Suggestion chips ── */
        .ai-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
          justify-content: center;
        }
        .ai-chip {
          font-size: 11.5px;
          padding: 5px 10px;
          border-radius: 20px;
          border: 1.5px solid #16a34a33;
          background: #f0fdf4;
          color: #16a34a;
          cursor: pointer;
          transition: all 0.15s;
          font-weight: 500;
        }
        .dark .ai-chip { background: #14532d22; border-color: #16a34a55; color: #4ade80; }
        .ai-chip:hover { background: #dcfce7; border-color: #16a34a; transform: translateY(-1px); }
        .dark .ai-chip:hover { background: #14532d44; }

        /* ── Message bubbles ── */
        .ai-message {
          display: flex;
          align-items: flex-end;
          gap: 7px;
          max-width: 88%;
        }
        .ai-message--user { align-self: flex-end; flex-direction: row-reverse; }
        .ai-message--assistant { align-self: flex-start; }
        .ai-message--new .ai-bubble { animation: ai-bubble-in 0.25s cubic-bezier(.34,1.56,.64,1); }

        .ai-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #15803d);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          margin-bottom: 2px;
        }
        .ai-bubble {
          padding: 9px 13px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.55;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .ai-message--user .ai-bubble {
          background: #16a34a;
          color: white;
          border-bottom-right-radius: 4px;
        }
        .ai-message--assistant .ai-bubble {
          background: var(--ai-ass-bg, white);
          color: var(--ai-ass-text, #0f172a);
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .dark .ai-message--assistant .ai-bubble {
          --ai-ass-bg: #1e1e35;
          --ai-ass-text: #e2e8f0;
          border-color: rgba(255,255,255,0.07);
        }

        /* ── Thinking indicator ── */
        .ai-thinking {
          align-self: flex-start;
          display: flex;
          align-items: flex-end;
          gap: 7px;
        }
        .ai-thinking-bubble {
          background: var(--ai-ass-bg, white);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 11px 14px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .dark .ai-thinking-bubble {
          background: #1e1e35;
          border-color: rgba(255,255,255,0.07);
        }

        /* ── Typing animation ── */
        .ai-typing-dots {
          display: inline-flex;
          gap: 4px;
          align-items: center;
        }
        .ai-typing-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #16a34a;
          animation: ai-dot-bounce 1.2s infinite;
        }
        .ai-typing-dots span:nth-child(2) { animation-delay: 0.15s; }
        .ai-typing-dots span:nth-child(3) { animation-delay: 0.3s; }

        /* ── Input area ── */
        .ai-input-area {
          border-top: 1px solid rgba(0,0,0,0.07);
          padding: 10px 12px;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: var(--ai-panel-bg, white);
          flex-shrink: 0;
        }
        .dark .ai-input-area { border-color: rgba(255,255,255,0.07); }
        .ai-textarea {
          flex: 1;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 9px 12px;
          font-size: 13.5px;
          font-family: inherit;
          resize: none;
          line-height: 1.45;
          max-height: 96px;
          min-height: 40px;
          background: var(--ai-input-bg, #f8fafc);
          color: var(--ai-text, #0f172a);
          transition: border-color 0.15s;
          outline: none;
        }
        .dark .ai-textarea {
          --ai-input-bg: #12121f;
          --ai-text: #f1f5f9;
          border-color: rgba(255,255,255,0.1);
        }
        .ai-textarea:focus { border-color: #16a34a; }
        .ai-textarea::placeholder { color: #94a3b8; }
        .ai-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          border: none;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.15s, opacity 0.15s;
          box-shadow: 0 2px 8px rgba(22,163,74,0.4);
        }
        .ai-send-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        .ai-send-btn:not(:disabled):hover { transform: scale(1.08); }
        .ai-send-btn:not(:disabled):active { transform: scale(0.94); }

        .ai-footer-hint {
          text-align: center;
          font-size: 10.5px;
          color: #94a3b8;
          padding: 4px 12px 8px;
          background: var(--ai-panel-bg, white);
          flex-shrink: 0;
        }
        .dark .ai-footer-hint { color: #475569; }

        /* ── Animations ── */
        @keyframes ai-panel-in {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ai-bubble-in {
          from { opacity: 0; transform: scale(0.85) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ai-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes ai-badge-pop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }

        @media (max-width: 400px) {
          .ai-panel { width: calc(100vw - 2rem); right: 0; }
        }
      `}</style>

      <div className="ai-widget">
        {/* Chat panel */}
        {open && (
          <div className="ai-panel">
            {/* Header */}
            <div className="ai-header">
              <div className="ai-header-icon">
                <Bot size={18} />
              </div>
              <div className="ai-header-text">
                <div className="ai-header-title">WalletXpress AI</div>
                <div className="ai-header-sub">
                  Your personal finance assistant
                </div>
              </div>
              <div className="ai-header-pill">
                <Sparkles size={10} />
                Live
              </div>
              <button
                className="ai-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-messages">
              {isEmpty ? (
                <div className="ai-empty">
                  <div className="ai-empty-icon">
                    <Sparkles size={24} />
                  </div>
                  <div className="ai-empty-title">Hey {userName}! 👋</div>
                  <div className="ai-empty-sub">
                    Ask me anything about your wallet — balance, spending
                    patterns, or recent transactions.
                  </div>
                  <div className="ai-suggestions">
                    {SUGGESTED_PROMPTS.map((p) => (
                      <button
                        key={p}
                        className="ai-chip"
                        onClick={() => handleSend(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {history.map((msg, i) => (
                    <MessageBubble
                      key={i}
                      msg={msg}
                      isNew={i === newMsgIndex}
                    />
                  ))}
                  {isThinking && (
                    <div className="ai-thinking">
                      <div className="ai-avatar">
                        <Bot size={14} />
                      </div>
                      <div className="ai-thinking-bubble">
                        <TypingDots />
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ai-input-area">
              <textarea
                ref={inputRef}
                className="ai-textarea"
                placeholder="Ask about your finances…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isThinking}
              />
              <button
                className="ai-send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || isThinking}
                aria-label="Send"
              >
                {isThinking ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={15} />
                )}
              </button>
            </div>
            <div className="ai-footer-hint">
              Powered by Groq · Enter to send · Shift+Enter for new line
            </div>
          </div>
        )}

        {/* FAB */}
        <button
          className={`ai-fab ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        >
          <span className="ai-fab-icon">
            {open ? <X size={22} /> : <Bot size={22} />}
          </span>
          {!open && hasUnread && <span className="ai-unread-badge">1</span>}
        </button>
      </div>
    </>
  );
}
