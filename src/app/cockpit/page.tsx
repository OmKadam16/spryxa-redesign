"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import Icon from "@/components/Icon";
import { Seg } from "@/components/ui";
import { useShell } from "@/components/Shell";
import { crews } from "@/lib/data";

const actions: [string, string][] = [
  ["Create Content", "doc"], ["Grow Audience", "users"], ["Launch Campaign", "megaphone"], ["Understand Market", "target"],
  ["Optimize Website", "globe"], ["Build Brand", "spark"], ["Measure & Report", "chart"], ["Run marketing team", "bolt"],
  ["Start from a template", "panel"], ["Start outreach campaign", "mail"], ["Promote an event", "calendar"], ["Manage my reputation", "shield"],
];

const plans = [
  { name: "Improve website conversion", status: "Shipped", tone: "chip-ok" },
  { name: "Make reporting trustworthy", status: "Ready", tone: "chip-blue" },
  { name: "Publish content consistently", status: "Ready", tone: "chip-blue" },
];

function Panel({ id, title, shut, toggle, children }: { id: string; title: string; shut: boolean; toggle: (id: string) => void; children: ReactNode }) {
  return (
    <section className="card" style={{ overflow: "hidden" }}>
      <div className="cpanel-head">
        <h2 className="hd">{title}</h2>
        <button className="icon-btn" aria-expanded={!shut} aria-label={`${shut ? "Expand" : "Collapse"} ${title}`} onClick={() => toggle(id)}>
          <span style={{ display: "grid", transform: shut ? "none" : "rotate(180deg)" }}><Icon name="chevdown" /></span>
        </button>
      </div>
      {!shut && children}
    </section>
  );
}

const Row = ({ label, value, tone }: { label: string; value: ReactNode; tone?: string }) => (
  <div className="list-row"><span style={{ flex: 1 }} className="row-title">{label}</span><span className={`chip ${tone ?? ""}`}>{value}</span></div>
);

export default function Cockpit() {
  const { openApprovals, openAsk, pending, toast } = useShell();
  const [shut, setShut] = useState<Record<string, boolean>>({});
  const [tab, setTab] = useState<"Plans" | "Audit" | "Content" | "Campaigns" | "Insights">("Plans");
  const toggle = (id: string) => setShut((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="hd page-title">Full cockpit</h1>
          <p className="page-sub">Everything Spryxa is doing for Watervo, on one screen.</p>
        </div>
        <div className="actions"><button className="btn btn-secondary" onClick={() => setShut({})}>Reset view</button></div>
      </div>

      <div className="card running" style={{ flexWrap: "wrap", justifyContent: "space-between" }}>
        <div className="stage" aria-label="Stage">
          <span className="stage-pill cur"><span className="lbl">Current stage</span><b>Foundation</b></span>
          <Icon name="arrow" />
          <span className="stage-pill"><span className="lbl">Suggested next</span><b>Traction</b></span>
        </div>
        <div className="stage">
          <span className="row-meta" style={{ margin: 0 }}>0 running · {pending} approvals waiting · 0 setup items blocked · 0 connected</span>
          <button className="btn btn-secondary" onClick={() => toast("No activity yet")}>Activity</button>
          <button className="btn btn-primary" onClick={openApprovals}>Review approvals</button>
        </div>
      </div>

      <div className="cockpit">
        <Panel id="audit" title="Business audit" shut={!!shut.audit} toggle={toggle}>
          <Row label="Audit finding" value="2 of 2" tone="chip-ok" />
          <Row label="Executive summary score" value="76" />
          <Row label="Recommendations" value="55 actions" />
          <Row label="Business info" value="3 of 6" tone="chip-warn" />
          <Row label="Ideal customer" value="2 profiles" tone="chip-ok" />
          <Row label="Brand book" value="79" tone="chip-ok" />
          <Row label="Empathy maps" value="Not run" />
          <Row label="Competitors" value="Name one — waiting on you" tone="chip-warn" />
          <Row label="Market research" value="Not run" />
          <Row label="Content gaps" value="52" tone="chip-ok" />
          <Row label="Website" value="4 of 9" tone="chip-warn" />
          <div className="list-row"><Link href="/website" className="btn btn-primary">Review strategy</Link></div>
        </Panel>

        <Panel id="next" title="Next steps" shut={!!shut.next} toggle={toggle}>
          <div style={{ padding: "14px 20px 0" }}><Seg items={["Plans", "Audit", "Content", "Campaigns", "Insights"] as const} value={tab} onChange={setTab} label="Next steps" /></div>
          {tab === "Plans" ? (
            <>
              <div className="list-row"><div><div className="lbl">Goal</div><div className="row-title">Next focus: Conversion path</div></div></div>
              {plans.map((p) => (
                <div className="list-row" key={p.name}>
                  <div className="row-main"><div className="row-title">{p.name}</div></div>
                  <span className={`chip ${p.tone}`}>{p.status}</span>
                  <button className="btn btn-sm btn-secondary" onClick={() => openAsk(`Review and start: ${p.name}`)}>Review and start</button>
                </div>
              ))}
            </>
          ) : (
            <div className="list-row">
              <span className="row-meta" style={{ margin: 0, flex: 1 }}>Open the {tab.toLowerCase()} page for this.</span>
              <Link className="btn btn-sm btn-secondary" href={tab === "Audit" ? "/website" : `/${tab.toLowerCase()}`}>Open {tab}</Link>
            </div>
          )}
        </Panel>

        <Panel id="crews" title="Crews" shut={!!shut.crews} toggle={toggle}>
          <div className="list-row"><span className="row-meta" style={{ margin: 0, flex: 1 }}>Autopilot is off.</span><Link href="/settings?tab=autopilot" className="btn btn-sm btn-secondary">Turn on</Link></div>
          {crews.map((c) => (
            <div className="list-row" key={c.key}>
              <span className="tile" style={{ ["--t" as string]: c.color, width: 34, height: 34 }}><Icon name={c.icon} size={16} /></span>
              <span className="row-title" style={{ flex: 1 }}>{c.name}</span>
              <span className={`chip ${c.state === "needs" ? "chip-warn" : ""}`}>{c.status}</span>
            </div>
          ))}
        </Panel>

        <Panel id="actions" title="Actions" shut={!!shut.actions} toggle={toggle}>
          <div className="actions-grid">
            {actions.map(([l, i]) => (
              <button key={l} className="action-btn" onClick={() => openAsk(l)}><Icon name={i} />{l}</button>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
