"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useShell } from "@/components/Shell";
import CalendarView from "@/components/CalendarView";
import CreateForm from "@/components/CreateForm";
import { Empty, Field, Seg } from "@/components/ui";

const tabs = [
  { id: "queue", label: "Queue" },
  { id: "calendar", label: "Calendar" },
  { id: "create", label: "Create" },
  { id: "generate", label: "Generate" },
  { id: "content-strategy", label: "Content strategy" },
  { id: "library", label: "Library" },
] as const;

const channels = ["All", "Social", "Email", "Direct Message", "Website"] as const;

const samples = [
  { id: "s1", channel: "Website", title: "How atmospheric water generation works, in plain language", meta: "Blog post · 900 words" },
  { id: "s2", channel: "Social", title: "Three questions to ask before choosing a home water filter", meta: "LinkedIn post · scheduled draft" },
  { id: "s3", channel: "Email", title: "Welcome note for new Watervo subscribers", meta: "Email · 120 words" },
];

function Queue({ goCreate }: { goCreate: () => void }) {
  const { openAsk } = useShell();
  const [filter, setFilter] = useState<(typeof channels)[number]>("All");
  const [sample, setSample] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const items = sample ? samples.filter((s) => !done.includes(s.id)) : [];
  const count = (c: string) => (c === "All" ? items.length : items.filter((i) => i.channel === c).length);
  const shown = filter === "All" ? items : items.filter((i) => i.channel === filter);

  return (
    <>
      <div className="seg" role="tablist" aria-label="Channel">
        {channels.map((c) => (
          <button key={c} role="tab" className="seg-btn" aria-selected={filter === c} onClick={() => setFilter(c)}>
            {c}<span className="seg-n">{count(c)}</span>
          </button>
        ))}
      </div>

      <div className="two">
        <details className="card fold">
          <summary><span>Audit findings</span><span className="chip">0 open</span></summary>
          <p className="row-meta">Content issues found in your audit show up here, each with a fix Spryxa can draft.</p>
        </details>
        <details className="card fold">
          <summary><span>Content refresh</span><span className="chip">Off</span></summary>
          <p className="row-meta">Turn this on and Spryxa suggests updates to older posts that are losing traffic. You approve every change.</p>
          <Link href="/settings?tab=autopilot" className="btn btn-sm btn-secondary">Turn on refresh</Link>
        </details>
      </div>

      {shown.length === 0 ? (
        <Empty icon="inbox" title="Nothing to review yet" text="Drafts land here when they're ready for your approval. Write one yourself, or ask Spryxa to draft one now.">
          <button className="btn btn-lg btn-primary" onClick={goCreate}><Icon name="pen" />Write content</button>
          <button className="btn btn-lg btn-ai" onClick={() => openAsk("Draft a post for Watervo")}><Icon name="spark" />Ask Spryxa to draft</button>
          {!sample && <button className="btn btn-sm btn-quiet" onClick={() => setSample(true)}>Preview with sample drafts</button>}
        </Empty>
      ) : (
        <div className="card rows">
          {shown.map((s) => (
            <div className="row" key={s.id}>
              <span className="tile" style={{ ["--t" as string]: "var(--primary)" }}><Icon name={s.channel === "Email" ? "mail" : s.channel === "Social" ? "chat" : "globe"} /></span>
              <div className="row-main">
                <div className="row-title">{s.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                  <span className="chip">{s.channel}</span>
                  <span className="chip chip-warn">Needs approval</span>
                  <span className="chip chip-blue">Sample</span>
                  <span className="row-meta" style={{ margin: 0, alignSelf: "center" }}>{s.meta}</span>
                </div>
              </div>
              <button className="btn btn-secondary">Edit</button>
              <button className="btn btn-primary" onClick={() => setDone((d) => [...d, s.id])}><Icon name="check" />Approve</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const platformNames = ["LinkedIn", "X", "Facebook", "Instagram", "YouTube"];

function Generate() {
  const { toast } = useShell();
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [cta, setCta] = useState("");
  const [picked, setPicked] = useState<string[]>(["LinkedIn"]);
  const reason = !topic.trim() ? "Add a topic to generate." : picked.length === 0 ? "Pick at least one platform." : "";
  return (
    <div className="grid2" style={{ gridTemplateColumns: "minmax(0, 1.6fr) minmax(260px, 1fr)" }}>
      <section className="card panel">
        <h2 className="hd section-title">Generate social content</h2>
        <Field label="Topic" id="g-t"><textarea id="g-t" className="field" rows={3} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="What should the posts be about?" /></Field>
        <div className="field-group">
          <span className="lbl">Platforms</span>
          <div className="seg">
            {platformNames.map((p) => (
              <button key={p} type="button" className="seg-btn" aria-pressed={picked.includes(p)} aria-selected={picked.includes(p)} onClick={() => setPicked((l) => (l.includes(p) ? l.filter((x) => x !== p) : [...l, p]))}>{p}</button>
            ))}
          </div>
        </div>
        <div className="form2">
          <Field label="Goal" id="g-g"><input id="g-g" className="input" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Get more waitlist sign-ups" /></Field>
          <Field label="Call to action" id="g-c"><input id="g-c" className="input" value={cta} onChange={(e) => setCta(e.target.value)} placeholder="e.g. Reserve yours today" /></Field>
        </div>
        <div className="form-foot">
          <span className="row-meta" style={{ margin: 0 }}>{reason}</span>
          <button className="btn btn-lg btn-ai" disabled={!!reason} onClick={() => toast("Generating post variants (prototype)")}><Icon name="spark" />Generate</button>
        </div>
      </section>
      <aside className="card panel" aria-label="Progress">
        <h2 className="hd section-title" style={{ fontSize: 18 }}>Progress</h2>
        <div className="row-meta" style={{ margin: 0 }}>No active job.</div>
        <div><div className="lbl">Post variants</div><div className="row-meta" style={{ margin: "4px 0 0" }}>Variants appear here as they're written.</div></div>
        <div><button className="btn btn-secondary" onClick={() => toast("Open the Queue tab to see drafts")}>View queue</button></div>
      </aside>
    </div>
  );
}

const briefFields = ["Traffic intent", "Awareness", "Priority audience", "Problem", "Desired outcome", "Creative angle", "Attention device", "Mechanism", "Offer", "Call to action", "Framework"];

function ContentStrategy() {
  const { toast } = useShell();
  const [sub, setSub] = useState<"Strategy briefs" | "Swipe references" | "Experiments">("Strategy briefs");
  return (
    <>
      <div className="cal-bar">
        <div><h2 className="hd section-title">Creative strategy</h2><div className="row-meta" style={{ margin: 0 }}>Briefs (0)</div></div>
        <Seg items={["Strategy briefs", "Swipe references", "Experiments"] as const} value={sub} onChange={setSub} label="Creative strategy" />
      </div>
      {sub === "Strategy briefs" ? (
        <section className="card panel">
          <div className="form2">
            {briefFields.map((f) => (
              <Field key={f} label={f} id={`b-${f}`}><input id={`b-${f}`} className="input" /></Field>
            ))}
          </div>
          <div className="form-foot">
            <button className="btn btn-lg btn-secondary" onClick={() => toast("Draft saved")}>Save draft</button>
            <button className="btn btn-lg btn-primary" onClick={() => toast("Brief saved and approved")}>Save and approve</button>
          </div>
        </section>
      ) : (
        <Empty icon={sub === "Swipe references" ? "doc" : "target"} tone="var(--violet)" title={sub === "Swipe references" ? "No swipe references yet" : "No experiments yet"} text={sub === "Swipe references" ? "Save posts and ads you admire so Spryxa can learn the style." : "Test two angles against each other and keep the one that works."} />
      )}
    </>
  );
}

function Library() {
  const { toast } = useShell();
  return (
    <>
      <section className="card panel">
        <h2 className="hd section-title" style={{ fontSize: 18 }}>What your content drove on your site</h2>
        <div className="row-meta" style={{ margin: 0 }}>0 of 0 sessions attributed</div>
      </section>
      <section className="card panel">
        <div className="panel-head">
          <h2 className="hd section-title" style={{ fontSize: 18 }}>Google Drive library</h2>
          <button className="btn btn-primary" onClick={() => toast("Prototype: connect Google Drive")}>Connect Google Drive</button>
        </div>
        <dl className="kv"><dt>Selected folder</dt><dd>None selected</dd></dl>
        <div className="actions">
          <button className="btn btn-secondary" disabled>Change folder</button>
          <button className="btn btn-secondary" onClick={() => toast("Prototype: upload media")}><Icon name="upload" />Upload media</button>
        </div>
        <div className="dropzone">No files yet. Connect Google Drive or upload media.</div>
      </section>
    </>
  );
}

function ContentInner() {
  const { openAsk } = useShell();
  const sp = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const current = tabs.find((t) => t.id === sp.get("tab"))?.id ?? "queue";
  const go = (id: string) => router.replace(`${path}?tab=${id}`, { scroll: false });

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="hd page-title">Content</h1>
          <p className="page-sub">Drafts in your voice. Nothing publishes until you approve it.</p>
        </div>
        <div className="actions">
          <button className="btn btn-lg btn-secondary" onClick={() => openAsk("Help me write a post for Watervo")}><Icon name="chat" />Create with chat</button>
          <button className="btn btn-lg btn-primary" onClick={() => go("create")}><Icon name="pen" />Write content</button>
        </div>
      </div>

      <div className="ptabs" role="tablist" aria-label="Content sections">
        {tabs.map((t) => (
          <button key={t.id} role="tab" className="ptab" aria-selected={current === t.id} onClick={() => go(t.id)}>{t.label}</button>
        ))}
      </div>

      <div key={current} className="stack">
        {current === "queue" && <Queue goCreate={() => go("create")} />}
        {current === "calendar" && <CalendarView onCreate={() => go("create")} />}
        {current === "create" && <CreateForm />}
        {current === "generate" && <Generate />}
        {current === "content-strategy" && <ContentStrategy />}
        {current === "library" && <Library />}
      </div>
    </div>
  );
}

export default function ContentPage() {
  return (
    <Suspense fallback={null}>
      <ContentInner />
    </Suspense>
  );
}
