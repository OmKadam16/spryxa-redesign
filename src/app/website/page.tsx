"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import Icps from "@/components/Icps";
import { Empty, Score, Seg, TabPage } from "@/components/ui";
import { useShell } from "@/components/Shell";

const learned = ["General analysis", "Ideal customer details", "Brand book", "Content strategy"];

function SiteAudit() {
  const { toast } = useShell();
  const [sub, setSub] = useState<"ICP details" | "Brand book">("ICP details");
  return (
    <>
      <div className="scores">
        <Score label="General" value={76} />
        <Score label="SEO and AI search" value={80} />
        <Score label="Social" value={85} />
      </div>
      <p className="row-meta" style={{ margin: 0 }}>Last analysis Oct 25, 2026, 11:43 AM</p>

      <section className="card panel" aria-labelledby="learned">
        <div className="panel-head">
          <div>
            <h2 id="learned" className="hd section-title" style={{ fontSize: 18 }}>What Spryxa has learned</h2>
            <div className="row-meta" style={{ margin: 0 }}>4 of 4 complete</div>
          </div>
          <div className="actions">
            <button className="btn btn-secondary" onClick={() => toast("Refreshing analyses (prototype)")}><Icon name="refresh" />Refresh</button>
            <button className="btn btn-secondary" disabled>Start remaining analyses</button>
          </div>
        </div>
        <div className="taglist">
          {learned.map((l) => <span key={l} className="chip chip-ok"><Icon name="check" size={14} />{l}</span>)}
        </div>
        <span className="row-meta" style={{ margin: 0 }}>Nothing left to start: every analysis is complete.</span>
      </section>

      <Seg items={["ICP details", "Brand book"] as const} value={sub} onChange={setSub} label="Audit details" />
      {sub === "ICP details" ? (
        <Icps />
      ) : (
        <section className="card panel">
          <div className="panel-head">
            <h3 className="hd section-title" style={{ fontSize: 18 }}>Brand voice: Direct and Informative</h3>
            <span className="chip chip-ok">Brand book 79</span>
          </div>
          <p style={{ margin: 0, color: "var(--muted)" }}>Plainspoken, fact-focused and solution-oriented. Edit the full brand kit in Strategy.</p>
          <div><Link href="/strategy?tab=brand-voice" className="btn btn-secondary">Open Brand voice</Link></div>
        </section>
      )}
    </>
  );
}

function SiteChanges() {
  const { openApprovals } = useShell();
  return (
    <Empty icon="globe" tone="var(--orange)" title="No site changes yet" text="Approved website fixes show up here with a preview of each change. One set of fixes is waiting for your approval.">
      <button className="btn btn-lg btn-primary" onClick={openApprovals}>Review waiting approvals</button>
    </Empty>
  );
}

function Conversion() {
  const { toast } = useShell();
  return (
    <>
      <Empty icon="funnel" tone="var(--primary)" title="Conversion findings aren't ready yet" text="The next site audit fills this in. You can run the conversion analyses again now.">
        <button className="btn btn-lg btn-primary" onClick={() => toast("Conversion analyses started (prototype)")}>Run conversion analyses again</button>
        <button className="btn btn-lg btn-secondary" onClick={() => toast("Re-running with a conversion focus (prototype)")}>Re-run with conversion focus</button>
      </Empty>
      <div className="actions">
        <Link href="/website" className="btn btn-quiet">Open full audit</Link>
        <button className="btn btn-quiet" onClick={() => toast("Refreshed")}><Icon name="refresh" />Refresh</button>
      </div>
      <div className="card running"><span className="row-meta" style={{ margin: 0 }}>No conversion-funnel integrations connected yet.</span><Link href="/settings?tab=connections" className="btn btn-sm btn-secondary" style={{ marginLeft: "auto" }}>Connect</Link></div>
    </>
  );
}

export default function Website() {
  return (
    <TabPage
      title="Website"
      sub="How watervo.com is doing and what Spryxa will fix."
      tabs={[
        { id: "site-audit", label: "Site audit", node: <SiteAudit /> },
        { id: "site-changes", label: "Site changes", node: <SiteChanges /> },
        { id: "conversion-findings", label: "Conversion findings", node: <Conversion /> },
      ]}
    />
  );
}
