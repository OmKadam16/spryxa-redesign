"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { approvals } from "@/lib/data";

export default function ApprovalsDrawer({
  onClose,
  decided,
  onDecide,
}: {
  onClose: () => void;
  decided: string[];
  onDecide: (id: string) => void;
}) {
  const [tab, setTab] = useState<"pending" | "decided">("pending");
  const [open, setOpen] = useState<string | null>(approvals[0].id);
  const [confirming, setConfirming] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { closeRef.current?.focus(); }, []);

  const pending = approvals.filter((a) => !decided.includes(a.id));
  const done = approvals.filter((a) => decided.includes(a.id));
  const list = tab === "pending" ? pending : done;
  const current = pending.find((a) => a.id === open) ?? null;

  const decide = (id: string) => {
    const idx = pending.findIndex((a) => a.id === id);
    onDecide(id);
    setConfirming(null);
    const next = pending[idx + 1] ?? pending[idx - 1];
    setOpen(next ? next.id : null);
  };

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Approvals">
        <div className="drawer-head">
          <div className="drawer-title-row">
            <h2 className="hd section-title" style={{ fontSize: 22 }}>Approvals</h2>
            <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close approvals"><Icon name="x" /></button>
          </div>
          <div className="drawer-tabs" role="tablist">
            <button className="drawer-tab" role="tab" aria-selected={tab === "pending"} onClick={() => setTab("pending")}>Needs you ({pending.length})</button>
            <button className="drawer-tab" role="tab" aria-selected={tab === "decided"} onClick={() => setTab("decided")}>Decided ({done.length})</button>
          </div>
        </div>

        <div className="drawer-body">
          {list.length === 0 && (
            <div className="empty-line">
              <Icon name="check" />
              {tab === "pending" ? "You're all caught up. Spryxa will tell you when something needs a decision." : "Nothing decided yet."}
            </div>
          )}
          {list.map((a) => {
            const isOpen = tab === "pending" && open === a.id;
            return (
              <div key={a.id} className={`ap${isOpen ? " open" : ""}`}>
                <button className="ap-head" aria-expanded={isOpen} onClick={() => tab === "pending" && setOpen(isOpen ? null : a.id)}>
                  <span className="tile" style={{ ["--t" as string]: a.high ? "var(--warn-solid)" : "var(--primary)" }}>
                    <Icon name={a.high ? "spark" : "doc"} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className={`ap-title${isOpen ? " ap-open-title" : ""}`}>{a.title}</span>
                    <span style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      <span className="chip">{a.kind}</span>
                      {a.high && <span className="chip chip-warn">High impact</span>}
                      {tab === "decided" && <span className="chip chip-ok">Approved</span>}
                    </span>
                  </span>
                </button>
                {isOpen && (
                  <div className="ap-body">
                    <div><div className="ap-lab">Why it needs you</div>{a.why}</div>
                    <div><div className="ap-lab">What happens next</div>{a.happens}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {tab === "pending" && current && (
          <div className="drawer-foot">
            {confirming === current.id ? (
              <div className="confirm">
                <span style={{ flex: 1, fontWeight: 600 }}>Reject this high-impact item?</span>
                <button className="btn btn-sm btn-secondary" onClick={() => setConfirming(null)}>Keep reviewing</button>
                <button className="btn btn-sm btn-danger" onClick={() => decide(current.id)}>Yes, reject</button>
              </div>
            ) : (
              <>
                <button className="btn btn-lg btn-primary" onClick={() => decide(current.id)}>
                  <Icon name="check" />Approve
                </button>
                <button className="btn btn-lg btn-danger" onClick={() => (current.high ? setConfirming(current.id) : decide(current.id))}>Reject</button>
              </>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
