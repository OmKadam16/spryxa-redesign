"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { Empty, Field, Menu, Seg, TabPage } from "@/components/ui";
import { useShell } from "@/components/Shell";

function CampaignCalendar() {
  const { openAsk } = useShell();
  return (
    <>
      <div className="card running">
        <span className="tile" style={{ ["--t" as string]: "var(--muted)" }}><Icon name="bolt" /></span>
        <div>
          <div className="lbl">Running now</div>
          <div className="row-title">Nothing is running.</div>
        </div>
      </div>
      <Empty icon="calendar" tone="var(--orange)" title="No campaign plans yet" text="A campaign plan lays out what goes out, where and when. You approve it before anything runs.">
        <button className="btn btn-lg btn-primary" onClick={() => openAsk("Create a campaign plan for Watervo")}><Icon name="plus" />Create campaign plan</button>
      </Empty>
    </>
  );
}

function AdCampaigns() {
  const { toast, openAsk } = useShell();
  const [view, setView] = useState<"Overview" | "Manage">("Overview");
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("watervo.com");
  const [budget, setBudget] = useState("900");
  const [goal, setGoal] = useState("Leads");
  const [loc, setLoc] = useState("");
  return (
    <>
      <div className="cal-bar">
        <Seg items={["Overview", "Manage"] as const} value={view} onChange={setView} label="Ad campaigns view" />
        <div className="actions">
          <button className="btn btn-primary" onClick={() => openAsk("Plan a new ad campaign for Watervo")}><Icon name="plus" />New campaign</button>
          <Menu label="More campaign types" items={[
            { label: "Event campaign", onClick: () => openAsk("Plan an event campaign for Watervo") },
            { label: "Video ad", onClick: () => openAsk("Draft a video ad for Watervo") },
            { label: "Props video", onClick: () => openAsk("Draft a props video for Watervo") },
          ]} />
        </div>
      </div>

      {view === "Overview" ? (
        <Empty icon="megaphone" title="No campaigns yet" text="Spryxa plans the campaign, writes the ads and shows you the budget before spending anything.">
          <button className="btn btn-lg btn-primary" onClick={() => openAsk("Plan a new ad campaign for Watervo")}>Create a campaign</button>
        </Empty>
      ) : (
        <>
          <div className="grid2">
            <section className="card panel" aria-labelledby="g-ads">
              <div className="panel-head">
                <h2 id="g-ads" className="hd section-title" style={{ fontSize: 18 }}>Google Ads campaign</h2>
                <span className="chip chip-warn">Not connected</span>
              </div>
              <Field label="What should the ads say?" id="g-prompt"><textarea id="g-prompt" className="field" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the product, who it's for and the offer…" /></Field>
              <Field label="Website URL" id="g-url"><input id="g-url" className="input" value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
              <div className="form2">
                <Field label="Monthly budget (USD)" id="g-b"><input id="g-b" className="input" inputMode="numeric" value={budget} onChange={(e) => setBudget(e.target.value)} /></Field>
                <Field label="Goal" id="g-goal">
                  <select id="g-goal" className="input" value={goal} onChange={(e) => setGoal(e.target.value)}>
                    {["Leads", "Sales", "Website traffic", "Brand awareness"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Locations" id="g-loc"><input id="g-loc" className="input" value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="e.g. California, Arizona" /></Field>
              <div className="actions">
                <button className="btn btn-ai" disabled={!prompt.trim()} onClick={() => toast("Draft requested (prototype)")}><Icon name="spark" />Generate draft</button>
                <button className="btn btn-primary" onClick={() => toast("Prototype: connect Google Ads")}>Connect Google Ads</button>
              </div>
              {!prompt.trim() && <span className="row-meta" style={{ margin: 0 }}>Describe what to advertise to generate a draft.</span>}
            </section>

            <section className="card panel" aria-labelledby="m-ads">
              <div className="panel-head">
                <h2 id="m-ads" className="hd section-title" style={{ fontSize: 18 }}>Meta Ads campaign</h2>
                <span className="chip chip-warn">Not connected</span>
              </div>
              <p style={{ margin: 0, color: "var(--muted)" }}>Connect Meta Ads first, then create a campaign for Facebook and Instagram.</p>
              <div className="actions">
                <button className="btn btn-primary" onClick={() => toast("Prototype: connect Meta Ads")}>Connect Meta Ads</button>
                <button className="btn btn-secondary" disabled>Create new</button>
              </div>
              <span className="row-meta" style={{ margin: 0 }}>Create new unlocks after you connect Meta Ads.</span>
            </section>
          </div>

          <Empty icon="doc" tone="var(--orange)" title="No ads yet" dashed>
            <button className="btn btn-quiet" onClick={() => openAsk("Plan a campaign for Watervo")}>Plan a campaign →</button>
          </Empty>
        </>
      )}
    </>
  );
}

function Outreach() {
  const { toast, openAsk } = useShell();
  return (
    <>
      <div className="cal-bar">
        <div><h2 className="hd section-title">Outreach campaigns</h2><div className="row-meta" style={{ margin: 0 }}>0 campaigns</div></div>
        <div className="actions">
          <button className="btn btn-secondary" onClick={() => toast("Prototype: sender identity")}>Sender identity</button>
          <button className="btn btn-secondary" onClick={() => toast("Up to date")}><Icon name="refresh" />Refresh</button>
          <button className="btn btn-primary" onClick={() => openAsk("Start an outreach campaign for Watervo")}><Icon name="plus" />New campaign</button>
        </div>
      </div>
      <Empty icon="mail" tone="var(--orange)" title="Start your first outreach campaign" text="Upload a CSV of LinkedIn prospects. Spryxa scores each one against your ideal customer and drafts warm introductions for you to approve.">
        <label className="btn btn-lg btn-secondary" style={{ cursor: "pointer" }}>
          <Icon name="upload" />Upload CSV
          <input type="file" accept=".csv" className="sr-only" onChange={(e) => e.target.files?.[0] && toast(`${e.target.files[0].name} selected (prototype)`)} />
        </label>
        <button className="btn btn-lg btn-primary" onClick={() => openAsk("Start an outreach campaign for Watervo")}>Start your first campaign →</button>
      </Empty>
    </>
  );
}

const agents: { group: string; items: { name: string; note?: string; open?: boolean }[] }[] = [
  { group: "Leadership", items: [{ name: "CMO Agent", note: "6 to approve", open: true }, { name: "Market Research Agent" }, { name: "Brand Steward Agent" }] },
  { group: "Creative", items: [{ name: "Short-Form Video Agent" }] },
  { group: "Website and email", items: [{ name: "Website Agent" }, { name: "Newsletter Agent" }, { name: "Email Campaigns Agent" }] },
  { group: "Sales and measurement", items: [{ name: "CRM and Outreach Agent" }, { name: "Measurement Agent" }] },
];

function Workflows() {
  const { openApprovals, toast } = useShell();
  return (
    <>
      <div className="card running" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <div className="row-title">Autopilot is off</div>
          <div className="row-meta" style={{ margin: 0 }}>Agents wait for your approval before they publish, send or spend.</div>
        </div>
        <Link href="/settings?tab=autopilot" className="btn btn-secondary">Turn on autopilot</Link>
      </div>
      {agents.map((g) => (
        <section key={g.group}>
          <div className="section-head"><h2 className="hd section-title" style={{ fontSize: 17 }}>{g.group}</h2></div>
          <div className="card rows">
            {g.items.map((a) => (
              <div className="list-row" key={a.name}>
                <span className="tile" style={{ ["--t" as string]: a.open ? "var(--primary)" : "var(--muted)", width: 36, height: 36 }}><Icon name={a.open ? "spark" : "lock"} size={16} /></span>
                <div className="row-main"><div className="row-title">{a.name}</div></div>
                {a.open ? (
                  <button className="btn btn-sm btn-primary" onClick={openApprovals}>{a.note}</button>
                ) : (
                  <button className="btn btn-sm btn-secondary" onClick={() => toast("Prototype: plan upgrade needed to start this agent")}>Upgrade to start</button>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default function Campaigns() {
  return (
    <TabPage
      title="Campaigns"
      sub="Plan, launch and watch every campaign. Spend waits for your approval."
      tabs={[
        { id: "campaign-calendar", label: "Campaign calendar", node: <CampaignCalendar /> },
        { id: "ad-campaigns", label: "Ad campaigns", node: <AdCampaigns /> },
        { id: "outreach", label: "Outreach", node: <Outreach /> },
        { id: "workflows", label: "Workflows", node: <Workflows /> },
      ]}
    />
  );
}
