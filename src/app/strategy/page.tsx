"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Icps from "@/components/Icps";
import { Empty, Field, Score, TabPage } from "@/components/ui";
import { useShell } from "@/components/Shell";
import { rivals } from "@/lib/data";

const initialColors = ["#121212", "#000000", "#ffffff", "#1d1d1f", "#0d6efd", "#d8e2f0", "#121c2d", "#0f172a"];

function BrandVoice() {
  const { toast } = useShell();
  const [colors, setColors] = useState(initialColors);
  return (
    <>
      <section className="card panel">
        <div className="panel-head">
          <div>
            <div className="lbl">Brand voice profile</div>
            <h2 className="hd section-title">Direct and Informative</h2>
          </div>
          <button className="btn btn-secondary" onClick={() => toast("Refreshing brand analysis (prototype)")}><Icon name="refresh" />Refresh analysis</button>
        </div>
        <div>
          <div className="lbl" style={{ marginBottom: 8 }}>Voice and tone</div>
          <div className="taglist">{["Plainspoken", "Fact-focused", "No-nonsense", "Solution-oriented"].map((t) => <span key={t} className="chip chip-blue">{t}</span>)}</div>
        </div>
        <dl className="kv">
          <dt>Messaging</dt><dd>Mission statement, five taglines and value propositions are written from your site. Open them in the full brand book.</dd>
        </dl>
      </section>

      <section className="card panel">
        <h2 className="hd section-title" style={{ fontSize: 18 }}>Brand kit</h2>
        <div>
          <div className="lbl" style={{ marginBottom: 8 }}>Colors</div>
          <div className="swatches">
            {colors.map((c, i) => (
              <div className="swatch" key={i}>
                <i style={{ background: c }} />
                <input aria-label={`Color ${i + 1}`} value={c} onChange={(e) => setColors((cs) => cs.map((x, n) => (n === i ? e.target.value : x)))} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid2">
          <Field label="Logo" hint="No logo set yet.">
            <div className="actions"><button className="btn btn-secondary" onClick={() => toast("Prototype: upload logo")}><Icon name="upload" />Upload logo</button><button className="btn btn-quiet" onClick={() => toast("Prototype: choose from library")}>Choose from library</button></div>
          </Field>
          <Field label="Brand photos and clips">
            <div className="actions"><button className="btn btn-secondary" onClick={() => toast("Prototype: add photos")}>Add photos</button><button className="btn btn-secondary" onClick={() => toast("Prototype: add video clips")}>Add video clips</button></div>
          </Field>
        </div>
        <div className="form-foot"><span /><button className="btn btn-lg btn-primary" onClick={() => toast("Brand kit saved")}>Save brand kit</button></div>
      </section>
    </>
  );
}

function Competitors() {
  const { toast } = useShell();
  const [rows, setRows] = useState(rivals.map((r) => ({ name: r.name, site: r.site })));
  const [setup, setSetup] = useState(true);
  return (
    <>
      <section className="card panel">
        <div className="panel-head">
          <div>
            <h2 className="hd section-title">Watervo vs Spout Water, Kara Water, Watergen</h2>
            <div className="row-meta" style={{ margin: 0 }}>Not benchmarked yet · 3 rivals suggested by discovery · Discovered Oct 25, 2026</div>
          </div>
          <div className="actions">
            <button className="btn btn-secondary" onClick={() => toast("Refreshing competitors (prototype)")}><Icon name="refresh" />Refresh competitors</button>
            <button className="btn btn-quiet" onClick={() => setSetup((s) => !s)}>{setup ? "Hide setup" : "Show setup"}</button>
          </div>
        </div>
        {setup && (
          <div className="stack" style={{ gap: 14 }}>
            <div className="lbl">Benchmark setup</div>
            <div className="form2">
              <Field label="Company name" id="co-n"><input id="co-n" className="input" defaultValue="Watervo" /></Field>
              <Field label="Website" id="co-w"><input id="co-w" className="input" defaultValue="watervo.com" /></Field>
            </div>
            <div className="lbl">Competitors ({rows.length}/10)</div>
            {rows.map((r, i) => (
              <div key={i} className="form2" style={{ alignItems: "end", gridTemplateColumns: "1fr 1fr auto" }}>
                <Field label="Name"><input className="input" value={r.name} onChange={(e) => setRows((x) => x.map((y, n) => (n === i ? { ...y, name: e.target.value } : y)))} /></Field>
                <Field label="Website"><input className="input" value={r.site} onChange={(e) => setRows((x) => x.map((y, n) => (n === i ? { ...y, site: e.target.value } : y)))} /></Field>
                <button className="btn btn-danger" onClick={() => setRows((x) => x.filter((_, n) => n !== i))}>Remove</button>
              </div>
            ))}
            <div><button className="btn btn-secondary" disabled={rows.length >= 10} onClick={() => setRows((x) => [...x, { name: "", site: "" }])}><Icon name="plus" />Add competitor</button></div>
          </div>
        )}
      </section>

      <div className="scores">
        {["Paid media strength", "Content coverage", "Messaging completeness", "Mobile site quality"].map((s) => <Score key={s} label={s} value={null} />)}
      </div>

      <section>
        <div className="section-head"><h2 className="hd section-title">Rivals</h2></div>
        <div className="stack" style={{ gap: 12 }}>
          {rivals.map((r) => (
            <article key={r.name} className="card panel">
              <div className="panel-head">
                <div><h3 className="hd section-title" style={{ fontSize: 18 }}>{r.name}</h3><div className="row-meta" style={{ margin: 0 }}>{r.site} · {r.loc}</div></div>
                <span className="chip">Not scored yet</span>
              </div>
              <dl className="kv">
                <dt>Why a rival</dt><dd>{r.why}</dd>
                <dt>Head to head</dt><dd>Not in the saved benchmark. Re-run it to score this company.</dd>
                <dt>Profile</dt><dd>No traffic, backlink, audience or review figures are tracked.</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <Empty icon="doc" tone="var(--violet)" title="No written comparison yet" text="Spryxa writes how Watervo stacks up against each rival. It takes up to two minutes." dashed>
        <button className="btn btn-lg btn-ai" onClick={() => toast("Writing the comparison (prototype)")}><Icon name="spark" />Write the comparison</button>
      </Empty>
    </>
  );
}

function Market() {
  const { toast } = useShell();
  return (
    <>
      <div className="card panel" style={{ borderColor: "color-mix(in srgb, var(--danger) 45%, var(--border))" }}>
        <div className="panel-head">
          <div>
            <span className="chip" style={{ background: "color-mix(in srgb, var(--danger) 14%, transparent)", color: "var(--danger)" }}>Run didn't complete · Oct 29, 2026</span>
            <h2 className="hd section-title" style={{ marginTop: 8 }}>Not enough credits for market research</h2>
          </div>
        </div>
        <p style={{ margin: 0 }}>This run needs <b>321</b> credits and your workspace has <b>72</b>. Add credits, then run it again.</p>
        <div className="actions">
          <button className="btn btn-lg btn-primary" onClick={() => toast("Prototype: add credits")}>Add credits</button>
          <button className="btn btn-lg btn-secondary" disabled>Run research again</button>
        </div>
        <span className="row-meta" style={{ margin: 0 }}>Run research again unlocks once you have 321 credits.</span>
      </div>
      <div className="actions">
        <button className="btn btn-secondary" onClick={() => toast("No prior runs yet")}>View prior runs</button>
        <button className="btn btn-secondary" onClick={() => toast("Prototype: new research")}><Icon name="plus" />New research</button>
      </div>
    </>
  );
}

export default function Strategy() {
  return (
    <TabPage
      title="Strategy"
      sub="Who you sound like, who you sell to and who you compete with."
      tabs={[
        { id: "brand-voice", label: "Brand voice", node: <BrandVoice /> },
        { id: "ideal-customer", label: "Ideal customer", node: <Icps /> },
        { id: "competitors", label: "Competitors", node: <Competitors /> },
        { id: "market-research", label: "Market research", node: <Market /> },
      ]}
    />
  );
}
