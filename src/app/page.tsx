"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { Sheet } from "@/components/ui";
import { useShell } from "@/components/Shell";
import { crews, approvals, connectors, firstDecision, recommended, type Crew } from "@/lib/data";

export default function Home() {
  const { openApprovals, openAsk, toast, pending } = useShell();
  const [tab, setTab] = useState<"review" | "handled">("review");
  const [crew, setCrew] = useState<Crew | null>(null);
  const [auto, setAuto] = useState(false);
  const attention = approvals.slice(0, Math.min(pending, 5));

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="hd page-title">Welcome, Om</h1>
          <p className="page-sub">{pending > 0 ? `${pending} items need your attention today.` : "Nothing needs you right now."}</p>
        </div>
        {pending > 0 && (
          <div className="actions">
            <button className="btn btn-lg btn-primary" onClick={openApprovals}>Review {pending} approvals</button>
          </div>
        )}
      </div>

      <section className="card first" aria-labelledby="first-t">
        <div className="first-head">
          <div>
            <h2 id="first-t" className="hd section-title">Your first decision</h2>
            <p className="trust"><Icon name="check" size={16} />Nothing is published, sent, or changed on your site until you approve it.</p>
          </div>
          <button className="btn btn-sm btn-secondary" onClick={() => toast("Set aside. You can bring it back from Handled.")}>Set aside</button>
        </div>
        <ol className="steps">
          {firstDecision.map((s) => (
            <li key={s.label} className={`step step-${s.state}`}>
              <span className="step-k">{s.state === "done" ? "Done" : s.state === "now" ? "Now" : "Next"}</span>
              <span className="step-v">{s.label}</span>
            </li>
          ))}
        </ol>

        <div className="tabs-mini" role="tablist" aria-label="Prepared for your business">
          <button className="tab-mini" role="tab" aria-selected={tab === "review"} onClick={() => setTab("review")}>To review <b>10</b></button>
          <button className="tab-mini" role="tab" aria-selected={tab === "handled"} onClick={() => setTab("handled")}>Handled <b>0</b></button>
        </div>

        {tab === "handled" ? (
          <div className="first-rec"><span className="row-meta" style={{ margin: 0 }}>No recommendations handled yet.</span></div>
        ) : (
          <>
            <div className="first-rec">
              <span className="tile" style={{ ["--t" as string]: "var(--ok)" }}><Icon name="doc" /></span>
              <div className="row-main">
                <div className="lbl">Recommended next · {recommended.source}</div>
                <div className="row-title">{recommended.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                  <span className="chip chip-warn">{recommended.priority}</span>
                  <span className="chip">1 Ready</span><span className="chip">2 Prepare draft</span><span className="chip">3 Review draft</span>
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-primary" onClick={() => openAsk(`Prepare a draft for: ${recommended.title}`)}>Prepare draft</button>
                <button className="btn btn-quiet" onClick={() => toast("Prototype: all 10 recommendations")}>Browse all 10</button>
              </div>
            </div>
            <details className="auto" open={auto} onToggle={(e) => setAuto((e.target as HTMLDetailsElement).open)}>
              <summary>Let Spryxa prepare your first draft automatically</summary>
              <div className="auto-body">
                <span className="row-meta" style={{ margin: 0 }}>Uses workspace credits. You still approve the draft before anything goes live.</span>
                <button className="btn btn-secondary" onClick={() => toast("Starter draft enabled (prototype)")}>Enable one starter draft</button>
              </div>
            </details>
          </>
        )}
      </section>

      <section className="card setup" aria-labelledby="setup-t">
        <div className="setup-copy">
          <h2 id="setup-t" className="hd setup-title">Connect your data to unlock insights</h2>
          <p className="setup-text">Spryxa can only measure what moved your traffic and leads once it can see them.</p>
          <div className="progress">
            <div className="progress-bar"><i style={{ width: "0%" }} /></div>
            <span className="progress-text">0 of 4 connected</span>
          </div>
        </div>
        <div className="setup-actions">
          {connectors.map((c, i) => (
            <Link key={c.name} href="/settings?tab=connections" className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}>Connect {c.name}</Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="needs-t">
        <div className="section-head">
          <h2 id="needs-t" className="hd section-title">Today · {pending} waiting</h2>
          {pending > 0 && <button className="btn btn-sm btn-quiet" onClick={openApprovals}>See all {pending}</button>}
        </div>
        <div className="card rows">
          {attention.length === 0 && <div className="empty-line"><Icon name="check" />You're all caught up.</div>}
          {attention.map((a) => (
            <div className="row" key={a.id}>
              <span className="tile" style={{ ["--t" as string]: a.high ? "var(--warn-solid)" : "var(--primary)" }}>
                <Icon name={a.high ? "spark" : "doc"} />
              </span>
              <div className="row-main">
                <div className="row-title">{a.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                  <span className="chip">{a.kind === "Initiative" ? "Initiative decision" : "Agent question"}</span>
                  {a.high && <span className="chip chip-warn">High impact</span>}
                </div>
              </div>
              <button className="btn btn-secondary" onClick={openApprovals}>View</button>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="areas-t">
        <div className="section-head">
          <h2 id="areas-t" className="hd section-title">What Spryxa handles for you</h2>
        </div>
        <div className="areas">
          {crews.map((a) => (
            <button key={a.key} className="card area" onClick={() => setCrew(a)} style={{ textAlign: "left", font: "inherit", cursor: "pointer" }}>
              <span className="tile" style={{ ["--t" as string]: a.color }}><Icon name={a.icon} /></span>
              <span className="area-main">
                <span className="area-top">
                  <span className="area-name">{a.name}</span>
                  <span className={`chip ${a.state === "needs" ? "chip-warn" : ""}`}>{a.status}</span>
                </span>
                <span className="area-desc">{a.desc}</span>
              </span>
              <span className="go"><Icon name="chevron" /></span>
            </button>
          ))}
        </div>
      </section>

      {crew && (
        <Sheet
          title={crew.plain}
          onClose={() => setCrew(null)}
          footer={
            <>
              <Link href={crew.link.href} className="btn btn-lg btn-primary" onClick={() => setCrew(null)}>{crew.link.label}</Link>
              <button className="btn btn-lg btn-secondary" onClick={() => setCrew(null)}>Close</button>
            </>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className="tile" style={{ ["--t" as string]: crew.color }}><Icon name={crew.icon} /></span>
              <div>
                <div className="row-title">{crew.name} crew</div>
                <span className={`chip ${crew.state === "needs" ? "chip-warn" : ""}`}>{crew.status}</span>
              </div>
            </div>
            <p style={{ margin: 0 }}>{crew.desc}</p>
            <div className="card" style={{ padding: 16, boxShadow: "none" }}>
              <div className="lbl">Last run</div>
              <div className="row-title" style={{ marginTop: 4 }}>Has not run yet</div>
              <div className="row-meta" style={{ marginBottom: 0 }}>{crew.state === "needs" ? "Connect the missing source to start." : "Runs daily once it's turned on."}</div>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  );
}
