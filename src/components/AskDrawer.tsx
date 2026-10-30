"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const prompts = [
  { icon: "target", title: "What should I focus on next?", detail: "Priorities for this workspace" },
  { icon: "chart", title: "Summarize recent performance", detail: "Signals and opportunities" },
  { icon: "inbox", title: "What needs my approval?", detail: "Decisions waiting on me" },
];

type Message = { from: "me" | "sys"; text: string };

export default function ChatPanel({ onClose, focusSignal, prefill }: { onClose: () => void; focusSignal: number; prefill: string }) {
  const [tab, setTab] = useState<"chat" | "history">("chat");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Message[]>([]);
  const ref = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusSignal > 0) {
      setTab("chat");
      if (prefill) setText(prefill);
      window.setTimeout(() => ref.current?.focus(), 0);
    }
  }, [focusSignal, prefill]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" }); }, [msgs]);

  const send = () => {
    const value = text.trim();
    if (!value) return;
    setMsgs((current) => [
      ...current,
      { from: "me", text: value },
      { from: "sys", text: "This workspace preview isn't connected to a live AI service yet. Your message is displayed here, but no task has been executed." },
    ]);
    setText("");
  };

  const newChat = () => {
    setMsgs([]);
    setText("");
    setTab("chat");
    ref.current?.focus();
  };

  return (
    <section className="spryxa-chat">
      <header className="chat-head chat-head-v2">
        <div className="chat-identity">
          <span className="chat-brand-mark"><Icon name="spark" size={17} /></span>
          <span className="chat-identity-copy">
            <strong>Spryxa</strong>
            <span><i /> Workspace assistant</span>
          </span>
        </div>
        <div className="chat-head-actions">
          <button className="icon-btn chat-new-btn" onClick={newChat} aria-label="Start a new chat" title="New chat"><Icon name="plus" /></button>
          <button className="icon-btn chat-close" onClick={onClose} aria-label="Hide chat panel"><Icon name="x" /></button>
        </div>
      </header>

      <div className="chat-context-row">
        <span className="chat-context-label">CURRENT CONTEXT</span>
        <span className="chat-context-chip"><span className="chat-context-avatar">W</span> Watervo</span>
        <span className="chat-preview-badge">PREVIEW</span>
      </div>

      <div className="chat-tabs-v2" role="tablist" aria-label="Assistant views">
        <button className={`chat-tab-v2 ${tab === "chat" ? "is-active" : ""}`} role="tab" aria-selected={tab === "chat"} onClick={() => setTab("chat")}>Conversation</button>
        <button className={`chat-tab-v2 ${tab === "history" ? "is-active" : ""}`} role="tab" aria-selected={tab === "history"} onClick={() => setTab("history")}>History</button>
      </div>

      <div className="chat-scroll chat-scroll-v2">
        {tab === "history" ? (
          <div className="chat-history-empty">
            <span className="chat-empty-icon"><Icon name="chat" size={21} /></span>
            <strong>No conversations yet</strong>
            <p>Your recent conversations will appear here so you can pick up where you left off.</p>
            <button className="btn btn-secondary btn-sm" onClick={newChat}><Icon name="plus" size={14} /> Start a conversation</button>
          </div>
        ) : msgs.length === 0 ? (
          <div className="chat-empty chat-empty-v2">
            <span className="chat-hero-mark"><Icon name="spark" size={25} /></span>
            <span className="chat-kicker">YOUR GROWTH PARTNER</span>
            <h3 className="hd">What would you like to move forward?</h3>
            <p>Ask about your strategy, explore an opportunity, or decide what your team should work on next.</p>
            <div className="chat-prompt-heading">SUGGESTED STARTING POINTS</div>
            <div className="prompt-list prompt-list-v2">
              {prompts.map((prompt) => (
                <button key={prompt.title} className="chat-prompt-card" onClick={() => { setText(prompt.title); ref.current?.focus(); }}>
                  <span className="chat-prompt-icon"><Icon name={prompt.icon} size={16} /></span>
                  <span className="chat-prompt-copy"><strong>{prompt.title}</strong><small>{prompt.detail}</small></span>
                  <Icon name="arrow-up-right" size={14} />
                </button>
              ))}
            </div>
            <div className="chat-trust-note"><Icon name="shield" size={14} /> You review important work before it goes live.</div>
          </div>
        ) : (
          <div className="msgs msgs-v2" role="log" aria-live="polite" aria-label="Conversation">
            {msgs.map((message, index) => (
              <div key={`${index}-${message.from}`} className={`chat-message-row chat-message-${message.from}`}>
                {message.from === "sys" && <span className="chat-message-avatar"><Icon name="spark" size={14} /></span>}
                <div className="chat-message-content">
                  <span className="chat-message-label">{message.from === "me" ? "You" : "Spryxa"}</span>
                  <div className={`msg msg-${message.from}`}>{message.text}</div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <footer className="chat-foot chat-foot-v2">
        <div className="composer composer-v2">
          <textarea
            ref={ref}
            value={text}
            rows={2}
            placeholder="Message Spryxa…"
            aria-label="Message Spryxa"
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } }}
          />
          <button className="btn btn-primary chat-send" onClick={send} disabled={!text.trim()} aria-label="Send message"><Icon name="send" size={16} /></button>
        </div>
        <div className="chat-foot-meta">
          <span><span className="kbd">Enter</span> to send</span>
          <span>Preview environment</span>
        </div>
      </footer>
    </section>
  );
}
