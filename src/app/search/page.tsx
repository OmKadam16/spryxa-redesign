"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { Empty, TabPage } from "@/components/ui";
import { useShell } from "@/components/Shell";

const starter = [
  "best atmospheric water generator for a home",
  "does an air to water machine remove microplastics",
  "how much water does a home water generator make per day",
  "atmospheric water generator vs reverse osmosis",
  "is water from air safe to drink",
  "countertop water from air machine",
  "water generator for an RV or van",
  "do atmospheric water generators need a plumbing hookup",
  "how much electricity does an air to water machine use",
  "nanoplastics in bottled water alternatives",
  "Spout Water vs Kara Water vs Watergen",
  "where to buy an atmospheric water generator",
];

function NotConnected({ what }: { what: string }) {
  return (
    <Empty icon="plug" tone="var(--violet)" title="Connect Search Console to see this" text={`${what} come from Google Search Console. Connect it once and Spryxa keeps this page up to date.`}>
      <Link href="/settings?tab=connections" className="btn btn-lg btn-primary">Connect Search Console</Link>
    </Empty>
  );
}

function Rankings() {
  const { toast } = useShell();
  return (
    <>
      <div className="cal-bar">
        <p className="page-sub" style={{ margin: 0 }}>Track where this site ranks for the searches that matter.</p>
        <button className="btn btn-primary" onClick={() => toast("Prototype: new tracker")}><Icon name="plus" />New tracker</button>
      </div>
      <Empty icon="target" tone="var(--violet)" title="No trackers yet" text="Add a keyword and Spryxa checks its ranking every day.">
        <button className="btn btn-lg btn-primary" onClick={() => toast("Prototype: new tracker")}>Create a tracker</button>
      </Empty>
    </>
  );
}

function Prompts() {
  const { toast } = useShell();
  const [items, setItems] = useState<string[]>([]);
  return (
    <>
      <div className="cal-bar">
        <p className="page-sub" style={{ margin: 0 }}>Questions people ask search engines and AI assistants.</p>
        <button className="btn btn-primary" onClick={() => toast("Prototype: new prompt")}><Icon name="plus" />New prompt</button>
      </div>
      {items.length === 0 ? (
        <Empty icon="chat" tone="var(--violet)" title="No prompts yet" text="Start from 12 starter SEO prompts written for your business, then edit or remove any of them.">
          <button className="btn btn-lg btn-primary" onClick={() => { setItems(starter); toast("Added 12 starter prompts"); }}>Add the starter prompts</button>
        </Empty>
      ) : (
        <div className="card rows">
          {items.map((p) => (
            <div className="list-row" key={p}>
              <span className="row-title" style={{ flex: 1 }}>{p}</span>
              <span className="chip chip-blue">Starter</span>
              <button className="icon-btn" aria-label={`Remove “${p}”`} onClick={() => setItems((l) => l.filter((x) => x !== p))}><Icon name="trash" /></button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function AiVisibility() {
  return (
    <>
      <div className="card running" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <div className="row-title">Tracked prompts · 0 of 0</div>
          <div className="row-meta" style={{ margin: 0 }}>Tracking needs an active subscription plan.</div>
        </div>
        <button className="btn btn-primary" disabled>Track prompts</button>
      </div>
      <NotConnected what="AI answer rankings and share of voice" />
    </>
  );
}

export default function Search() {
  return (
    <TabPage
      title="Search"
      sub="Where you show up in search results and AI answers."
      tabs={[
        { id: "rankings", label: "Rankings", node: <Rankings /> },
        { id: "keywords", label: "Keywords", node: <NotConnected what="Keywords and search traffic" /> },
        { id: "prompts", label: "Prompts", node: <Prompts /> },
        { id: "ai-visibility", label: "AI visibility", node: <AiVisibility /> },
        { id: "backlinks", label: "Backlinks", node: <NotConnected what="Backlinks and referring sites" /> },
      ]}
    />
  );
}
