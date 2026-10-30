"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { Empty, Seg, TabPage } from "@/components/ui";

function Connect({ icon, title, text, missing, cta }: { icon: string; title: string; text: string; missing: string[]; cta: string }) {
  return (
    <div className="card empty">
      <span className="tile" style={{ ["--t" as string]: "var(--primary)", width: 56, height: 56 }}><Icon name={icon} size={26} /></span>
      <h2 className="hd section-title" style={{ marginTop: 8 }}>{title}</h2>
      <p className="page-sub" style={{ maxWidth: 480, textAlign: "center", margin: 0 }}>{text}</p>
      <div className="taglist" style={{ justifyContent: "center" }}>
        {missing.map((m) => <span key={m} className="chip chip-warn">Needs {m}</span>)}
      </div>
      <Link href="/settings?tab=connections" className="btn btn-lg btn-primary">{cta}</Link>
    </div>
  );
}

function Social() {
  const [range, setRange] = useState<"7d" | "14d" | "30d" | "90d">("30d");
  return (
    <>
      <Connect icon="chat" title="Connect your social accounts" text="See audience growth and which posts worked, across every channel in one place." missing={["LinkedIn", "X", "Meta", "TikTok", "YouTube"]} cta="Connect social accounts" />
      <section className="card panel">
        <div className="panel-head">
          <h2 className="hd section-title" style={{ fontSize: 18 }}>Audience growth</h2>
          <Seg items={["7d", "14d", "30d", "90d"] as const} value={range} onChange={setRange} label="Date range" />
        </div>
        <div className="scores">
          <div><div className="lbl">Total followers</div><div className="hd" style={{ fontSize: 32 }}>—</div></div>
          <div><div className="lbl">Net change ({range.toUpperCase()})</div><div className="hd" style={{ fontSize: 32 }}>—</div></div>
        </div>
        <span className="row-meta" style={{ margin: 0 }}>Numbers appear after the first account is connected.</span>
      </section>
    </>
  );
}

export default function Insights() {
  return (
    <TabPage
      title="Insights"
      sub="What moved your traffic, audience and leads."
      tabs={[
        { id: "social", label: "Social", node: <Social /> },
        { id: "website-analytics", label: "Website analytics", node: <Connect icon="chart" title="Connect Google Analytics" text="See visits, sources and conversions for watervo.com." missing={["Google Analytics"]} cta="Connect Google Analytics" /> },
        { id: "ads", label: "Ads", node: <Connect icon="coin" title="Connect your ad accounts" text="See spend, results and where to move budget." missing={["Meta Ads"]} cta="Connect ad accounts" /> },
        { id: "crm", label: "CRM", node: <Connect icon="funnel" title="Connect your CRM" text="See which leads are moving and which have gone quiet." missing={["Constant Contact"]} cta="Connect CRM" /> },
      ]}
    />
  );
}
