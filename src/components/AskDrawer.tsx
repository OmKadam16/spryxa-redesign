"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const prompts = ["What should I work on next?", "What is running right now?", "Check outcome evidence"];

export default function ChatPanel({ onClose, focusSignal, prefill }: { onClose: () => void; focusSignal: number; prefill: string }) {
  const [tab, setTab] = useState<"chat" | "history">("chat");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<{ from: "me" | "sys"; text: string }[]>([]);
  const ref = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (focusSignal > 0) { setTab("chat"); if (prefill) setText(prefill); setTimeout(() => ref.current?.focus(), 0); } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusSignal]);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [msgs]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "me", text: t }, { from: "sys", text: "Prototype only: replies aren't connected in this redesign." }]);
    setText("");
  };

  return (
    <>
      <div className="chat-head">
        <div className="drawer-tabs" role="tablist" style={{ margin: 0, border: 0, flex: 1 }}>
          <button className="drawer-tab" role="tab" aria-selected={tab === "chat"} onClick={() => setTab("chat")}>Chat</button>
          <button className="drawer-tab" role="tab" aria-selected={tab === "history"} onClick={() => setTab("history")}>History</button>
        </div>
        <button className="btn btn-sm btn-quiet" onClick={() => { setMsgs([]); setTab("chat"); ref.current?.focus(); }}><Icon name="plus" size={16} />New chat</button>
        <button className="icon-btn chat-close" onClick={onClose} aria-label="Hide chat panel"><Icon name="x" /></button>
      </div>

      <div className="chat-scroll">
        {tab === "history" ? (
          <div className="empty-line">No past chats yet.</div>
        ) : msgs.length === 0 ? (
          <div className="chat-empty">
            <span className="tile" style={{ ["--t" as string]: "var(--violet)", width: 52, height: 52 }}><Icon name="spark" size={26} /></span>
            <h3 className="hd" style={{ margin: "14px 0 6px", fontSize: 20 }}>Ready when you are, Watervo</h3>
            <p className="page-sub" style={{ margin: 0, fontSize: 14 }}>Tell Spryxa what you want to grow. It does the work and checks in with you on important calls.</p>
            <div className="prompt-list">
              {prompts.map((p) => (
                <button key={p} className="prompt" onClick={() => { setText(p); ref.current?.focus(); }}>{p}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="msgs">
            {msgs.map((m, i) => <div key={i} className={`msg msg-${m.from}`}>{m.text}</div>)}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div className="chat-foot">
        <div className="composer">
          <button className="icon-btn" aria-label="Attach a file" disabled><Icon name="clip" /></button>
          <textarea
            ref={ref}
            value={text}
            rows={2}
            placeholder="Ask about Watervo…"
            aria-label="Message Spryxa"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <button className="btn btn-primary" onClick={send} disabled={!text.trim()} aria-label="Send message"><Icon name="send" /></button>
        </div>
        <span className="hint" style={{ margin: 0 }}><span className="kbd">Enter</span> to send · <span className="kbd">Shift</span>+<span className="kbd">Enter</span> for a new line</span>
      </div>
    </>
  );
}
