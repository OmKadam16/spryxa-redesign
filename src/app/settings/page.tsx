"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { Field, TabPage, Toggle } from "@/components/ui";
import { useShell } from "@/components/Shell";

function Workspace() {
  const { toast } = useShell();
  const [n, setN] = useState({ audit: true, published: true, approval: true, digest: false });
  const [slack, setSlack] = useState(false);
  return (
    <>
      <section className="card panel">
        <div className="panel-head"><div><h2 className="hd section-title" style={{ fontSize: 18 }}>Verified facts</h2><div className="row-meta" style={{ margin: 0 }}>Approved claims and proof points Spryxa may use in your content.</div></div><button className="btn btn-secondary" onClick={() => toast("Prototype: verified facts")}>Review facts</button></div>
      </section>
      <section className="card panel">
        <h2 className="hd section-title" style={{ fontSize: 18 }}>Workspace defaults</h2>
        <div className="form2">
          <Field label="Client name" id="w-n"><input id="w-n" className="input" defaultValue="Watervo" /></Field>
          <Field label="Website URL" id="w-u"><input id="w-u" className="input" defaultValue="https://watervo.com" /></Field>
          <Field label="Default timezone" id="w-t"><select id="w-t" className="input" defaultValue="America/Los_Angeles">{["America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York", "UTC"].map((t) => <option key={t}>{t}</option>)}</select></Field>
        </div>
        <h3 className="hd section-title" style={{ fontSize: 16, marginTop: 6 }}>Brand defaults</h3>
        <div className="form2">
          <Field label="Brand voice" id="w-v"><input id="w-v" className="input" defaultValue="Direct and Informative" /></Field>
          <Field label="Content pillars" id="w-p" hint="Separate with commas."><input id="w-p" className="input" placeholder="e.g. Water health, Product how-tos, Customer stories" /></Field>
        </div>
      </section>
      <section className="card panel">
        <h2 className="hd section-title" style={{ fontSize: 18 }}>Notifications</h2>
        <div>
          <Toggle on={n.audit} onChange={(v) => setN({ ...n, audit: v })} label="Audit completed" />
          <Toggle on={n.published} onChange={(v) => setN({ ...n, published: v })} label="Content published" />
          <Toggle on={n.approval} onChange={(v) => setN({ ...n, approval: v })} label="Approval needed" />
          <Toggle on={n.digest} onChange={(v) => setN({ ...n, digest: v })} label="Weekly digest" />
          <Toggle on={slack} onChange={setSlack} label="Send to Slack" desc="Post these alerts to a channel." />
        </div>
        {slack && (
          <div className="form2">
            <Field label="Slack webhook URL" id="s-w"><input id="s-w" className="input" placeholder="https://hooks.slack.com/…" /></Field>
            <Field label="Channel name" id="s-c"><input id="s-c" className="input" placeholder="#marketing" /></Field>
          </div>
        )}
        <div className="form-foot"><span /><button className="btn btn-lg btn-primary" onClick={() => toast("Settings saved")}>Save settings</button></div>
      </section>
    </>
  );
}

function People() {
  const { toast } = useShell();
  return (
    <section className="card rows">
      <div className="list-row">
        <span className="avatar" style={{ cursor: "default" }}>OK</span>
        <div className="row-main"><div className="row-title">Om Kadam</div><div className="row-meta" style={{ margin: 0 }}>om4kadam@gmail.com</div></div>
        <span className="chip chip-blue">Client admin</span>
      </div>
      <div className="list-row">
        <span className="row-meta" style={{ margin: 0, flex: 1 }}>Client roles control who can approve, publish and spend.</span>
        <button className="btn btn-secondary" onClick={() => toast("Prototype: manage custom roles")}>Manage custom roles</button>
        <button className="btn btn-primary" onClick={() => toast("Prototype: invite someone")}><Icon name="plus" />Invite</button>
      </div>
    </section>
  );
}

function Teams() {
  const { toast } = useShell();
  return (
    <section className="card panel">
      <div className="panel-head"><div><h2 className="hd section-title" style={{ fontSize: 18 }}>Coverage</h2><div className="row-meta" style={{ margin: 0 }}>See what's covered, switch on what's missing, and rerun the first run.</div></div></div>
      <div className="actions">
        <button className="btn btn-primary" onClick={() => toast("Prototype: review coverage")}>Review coverage</button>
        <button className="btn btn-secondary" onClick={() => toast("First run restarted (prototype)")}>Rerun first run</button>
      </div>
    </section>
  );
}

const social = ["YouTube", "TikTok", "Search Console", "LinkedIn", "X / Twitter", "Instagram", "Facebook"];
const other = ["HubSpot", "Klaviyo", "Salesforce", "GoHighLevel", "Reddit"];
const more = ["Research services", "AI agent keys", "Outbound webhooks"];

function Connections() {
  const { toast } = useShell();
  const [q, setQ] = useState("");
  const f = (l: string) => l.toLowerCase().includes(q.toLowerCase());
  return (
    <>
      <input className="input" style={{ maxWidth: 420 }} placeholder="Search connections" aria-label="Search connections" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="card rows">
        {social.filter(f).map((c) => (
          <div className="list-row" key={c}><span className="tile" style={{ ["--t" as string]: "var(--primary)", width: 36, height: 36 }}><Icon name="plug" size={16} /></span><div className="row-main"><div className="row-title">{c}</div><div className="row-meta" style={{ margin: 0 }}>Not connected</div></div><button className="btn btn-sm btn-primary" onClick={() => toast(`Prototype: add ${c}`)}>Add</button></div>
        ))}
        {other.filter(f).map((c) => (
          <div className="list-row" key={c}><span className="tile" style={{ ["--t" as string]: "var(--orange)", width: 36, height: 36 }}><Icon name="plug" size={16} /></span><div className="row-main"><div className="row-title">{c}</div><div className="row-meta" style={{ margin: 0 }}>Not connected</div></div><button className="btn btn-sm btn-secondary" onClick={() => toast(`Prototype: ${c} settings`)}>Open settings</button></div>
        ))}
        {more.filter(f).map((c) => (
          <div className="list-row" key={c}><span className="tile" style={{ ["--t" as string]: "var(--violet)", width: 36, height: 36 }}><Icon name="key" size={16} /></span><div className="row-main"><div className="row-title">{c}</div></div><button className="btn btn-sm btn-secondary" onClick={() => toast(`Prototype: ${c}`)}>Open settings</button></div>
        ))}
        {![...social, ...other, ...more].some(f) && <div className="empty-line">No connections match “{q}”.</div>}
      </div>
    </>
  );
}

function Autopilot() {
  const { toast } = useShell();
  const [on, setOn] = useState(false);
  return (
    <section className="card panel">
      <div className="panel-head"><div><h2 className="hd section-title" style={{ fontSize: 18 }}>Trust and autopilot</h2><div className="row-meta" style={{ margin: 0 }}>Available on Small Team and above. Ask an account owner to review plan access.</div></div><span className="chip chip-warn">Plan required</span></div>
      <Toggle on={on} onChange={setOn} label="Let trusted work run on autopilot" desc="Spryxa publishes and sends approved kinds of work without asking each time." />
      <div className="form-foot">
        <button className="btn btn-lg btn-secondary" onClick={() => setOn(false)}>Discard</button>
        <button className="btn btn-lg btn-primary" onClick={() => toast("Prototype: needs a plan upgrade")}>Save autopilot settings</button>
      </div>
    </section>
  );
}

export default function Settings() {
  return (
    <TabPage
      title="Settings"
      sub="Watervo · watervo.com"
      tabs={[
        { id: "workspace", label: "Workspace", node: <Workspace /> },
        { id: "people", label: "People", node: <People /> },
        { id: "teams", label: "Teams", node: <Teams /> },
        { id: "connections", label: "Connections", node: <Connections /> },
        { id: "autopilot", label: "Autopilot", node: <Autopilot /> },
      ]}
    />
  );
}
