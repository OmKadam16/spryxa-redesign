"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import { searchIndex, type SearchItem } from "@/lib/data";

export default function Palette({ onClose, openApprovals }: { onClose: () => void; openApprovals: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef.current?.focus(), []);

  const items = searchIndex.filter((x) => `${x.group} ${x.label}`.toLowerCase().includes(q.trim().toLowerCase()));
  const go = (x: SearchItem) => {
    onClose();
    if (x.action === "approvals") openApprovals();
    else router.push(x.href);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setI((n) => Math.min(n + 1, items.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setI((n) => Math.max(n - 1, 0)); }
    if (e.key === "Enter" && items[i]) go(items[i]);
    if (e.key === "Escape") onClose();
  };

  let last = "";
  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div className="palette" role="dialog" aria-modal="true" aria-label="Search Watervo">
        <div className="palette-input">
          <Icon name="search" />
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={onKey} placeholder="Search Watervo…" aria-label="Search Watervo" />
          <span className="kbd">Esc</span>
        </div>
        <div className="palette-list" role="listbox">
          {items.length === 0 && <div className="empty-line">No pages match “{q}”.</div>}
          {items.map((x, n) => {
            const head = x.group !== last;
            last = x.group;
            return (
              <div key={x.group + x.label}>
                {head && <div className="lbl" style={{ padding: "10px 16px 4px" }}>{x.group}</div>}
                <button role="option" aria-selected={n === i} className={`palette-item${n === i ? " active" : ""}`} onMouseEnter={() => setI(n)} onClick={() => go(x)}>
                  {x.label}
                  <Icon name="chevron" size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
