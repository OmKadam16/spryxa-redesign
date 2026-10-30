"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { Sheet } from "@/components/ui";
import { useShell } from "@/components/Shell";
import { crews, approvals, connectors, recommended, type Crew } from "@/lib/data";

export default function Home() {
  const { openApprovals, openAsk, toast, pending } = useShell();
  const [crew, setCrew] = useState<Crew | null>(null);
  const attention = approvals.slice(0, Math.min(pending, 4));
  const needsSetup = crews.filter((item) => item.state === "needs").length;
  const setupDone = 0;
  const progress = Math.max(0, Math.min(100, Math.round((setupDone / connectors.length) * 100)));

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  }, []);

  return (
    <div className="page home-dashboard">
      <header className="home-welcome">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> WORKSPACE OVERVIEW</div>
          <h1 className="hd page-title">{greeting}, Om.</h1>
          <p className="page-sub">Here’s what’s happening across your growth workspace.</p>
        </div>
        <div className="home-head-actions">
          <button className="btn btn-secondary" onClick={() => openAsk("Give me a concise overview of the workspace and the most important next action.")}>
            <Icon name="spark" size={16} /> Ask Spryxa
          </button>
          <button className="btn btn-primary" onClick={openApprovals}>
            Review approvals <span className="button-count">{pending}</span>
          </button>
        </div>
      </header>

      <section className="home-metrics" aria-label="Workspace summary">
        <article className="metric-card">
          <div className="metric-top"><span>Needs your review</span><span className="metric-icon metric-blue"><Icon name="inbox" size={17} /></span></div>
          <div className="metric-value">{pending}</div>
          <div className="metric-foot"><span className={pending ? "status-dot status-amber" : "status-dot"} /> {pending ? "Items waiting for a decision" : "You're all caught up"}</div>
        </article>
        <article className="metric-card">
          <div className="metric-top"><span>Growth teams</span><span className="metric-icon metric-violet"><Icon name="users" size={17} /></span></div>
          <div className="metric-value">{crews.length}</div>
          <div className="metric-foot"><span className="status-dot status-blue" /> {needsSetup} need a connection</div>
        </article>
        <article className="metric-card">
          <div className="metric-top"><span>Data connections</span><span className="metric-icon metric-cyan"><Icon name="plug" size={17} /></span></div>
          <div className="metric-value">{setupDone}<span className="metric-total"> / {connectors.length}</span></div>
          <div className="metric-progress"><i style={{ width: `${progress}%` }} /></div>
        </article>
        <article className="metric-card metric-card-note">
          <div className="metric-top"><span>Approval-first workflow</span><span className="metric-icon metric-green"><Icon name="shield-check" size={17} /></span></div>
          <div className="metric-note-title">You stay in control.</div>
          <div className="metric-foot">Nothing goes live without your approval.</div>
        </article>
      </section>

      <section className="home-focus-grid">
        <article className="card focus-card">
          <div className="focus-head">
            <div>
              <div className="eyebrow">RECOMMENDED NEXT STEP</div>
              <h2 className="hd focus-title">Make progress on your growth plan</h2>
            </div>
            <span className="focus-symbol"><Icon name="target" size={21} /></span>
          </div>
          <p className="focus-copy">{recommended.title}</p>
          <div className="focus-meta">
            <span className="chip chip-blue">{recommended.priority}</span>
            <span className="focus-source">{recommended.source}</span>
          </div>
          <div className="focus-actions">
            <button className="btn btn-primary" onClick={() => openAsk(`Prepare a draft for: ${recommended.title}`)}>Prepare this draft <Icon name="arrow-up-right" size={15} /></button>
            <button className="btn btn-quiet" onClick={() => openAsk("Show me the other recommended actions for this workspace.")}>Explore recommendations</button>
          </div>
        </article>

        <article className="card approval-card">
          <div className="section-head">
            <div>
              <div className="eyebrow">YOUR DECISIONS</div>
              <h2 className="hd section-title">Approval queue</h2>
            </div>
            <button className="text-action" onClick={openApprovals}>View all <Icon name="arrow-up-right" size={14} /></button>
          </div>
          {attention.length === 0 ? (
            <div className="approval-empty"><span className="empty-check"><Icon name="check" /></span><span>Nothing waiting for your review.</span></div>
          ) : (
            <div className="approval-preview">
              {attention.slice(0, 3).map((item) => (
                <button className="approval-preview-row" key={item.id} onClick={openApprovals}>
                  <span className={`approval-kind-icon ${item.high ? "is-high" : ""}`}><Icon name={item.high ? "spark" : "file-text"} size={16} /></span>
                  <span className="approval-preview-copy">
                    <span className="approval-preview-title">{item.title}</span>
                    <span className="approval-preview-meta">{item.kind}{item.high ? " · High impact" : ""}</span>
                  </span>
                  <Icon name="chevron" size={16} />
                </button>
              ))}
            </div>
          )}
          <button className="approval-bottom-link" onClick={openApprovals}>Open approval center <Icon name="arrow-right" size={15} /></button>
        </article>
      </section>

      <section className="home-setup card">
        <div className="setup-main">
          <div className="setup-icon"><Icon name="plug" size={19} /></div>
          <div className="setup-copy">
            <div className="eyebrow">CONNECT YOUR WORKSPACE</div>
            <h2 className="hd setup-title">Give Spryxa the context to measure what matters.</h2>
            <p className="setup-text">Connect your analytics, search, advertising and CRM data to unlock more useful recommendations.</p>
            <div className="setup-progress-line">
              <div className="metric-progress"><i style={{ width: `${progress}%` }} /></div>
              <span>{setupDone} of {connectors.length} connected</span>
            </div>
          </div>
        </div>
        <div className="setup-connector-list">
          {connectors.map((connector) => (
            <Link key={connector.name} href="/settings?tab=connections" className="connector-pill">
              <span className="connector-status" />
              {connector.name}
              <Icon name="plus" size={14} />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-teams-section">
        <div className="section-head home-section-head">
          <div>
            <div className="eyebrow">YOUR AI GROWTH TEAM</div>
            <h2 className="hd section-title">Teams working across your business</h2>
            <p className="section-description">Specialist teams prepare work and surface decisions. You remain in control of execution.</p>
          </div>
          <Link href="/cockpit" className="text-action">Open full cockpit <Icon name="arrow-up-right" size={14} /></Link>
        </div>
        <div className="home-team-grid">
          {crews.map((item) => (
            <button key={item.key} className="home-team-card" onClick={() => setCrew(item)}>
              <span className="home-team-icon" style={{ ["--team-color" as string]: item.color }}><Icon name={item.icon} size={18} /></span>
              <span className="home-team-copy">
                <span className="home-team-name">{item.name}</span>
                <span className="home-team-desc">{item.desc}</span>
              </span>
              <span className={`team-status ${item.state === "needs" ? "team-status-needs" : ""}`}><i />{item.status}</span>
              <Icon name="chevron" size={15} />
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
              <div><div className="row-title">{crew.name} team</div><span className={`chip ${crew.state === "needs" ? "chip-warn" : "chip-ok"}`}>{crew.status}</span></div>
            </div>
            <p style={{ margin: 0 }}>{crew.desc}</p>
            <div className="card" style={{ padding: 16, boxShadow: "none" }}>
              <div className="lbl">Current status</div>
              <div className="row-title" style={{ marginTop: 4 }}>{crew.state === "needs" ? "Connection required" : "Ready to be configured"}</div>
              <div className="row-meta" style={{ marginBottom: 0 }}>{crew.state === "needs" ? "Connect the required source to unlock this team's capabilities." : "Configure this team and choose what it should prepare for review."}</div>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  );
}
