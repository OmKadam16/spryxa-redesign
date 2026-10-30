import { icps } from "@/lib/data";

function Tags({ items, tone }: { items: string[]; tone?: string }) {
  return (
    <div className="taglist">
      {items.map((i) => <span key={i} className={`chip ${tone ?? ""}`}>{i}</span>)}
    </div>
  );
}

export default function Icps() {
  return (
    <div className="grid2">
      {icps.map((p) => (
        <article key={p.name} className="card panel">
          <div className="panel-head">
            <h3 className="hd section-title" style={{ fontSize: 18 }}>{p.name}</h3>
            <span className="chip chip-warn">{p.tag}</span>
          </div>
          <dl className="kv">
            <dt>Budget</dt><dd>{p.budget}</dd>
            <dt>Trigger</dt><dd>{p.trigger}</dd>
            <dt>{p.objections.length ? "Pain points" : "Challenges"}</dt><dd><Tags items={p.pains} /></dd>
            {p.objections.length > 0 && (<><dt>Objections</dt><dd><Tags items={p.objections} tone="chip-warn" /></dd></>)}
            <dt>Channels</dt><dd><Tags items={p.channels} tone="chip-blue" /></dd>
          </dl>
        </article>
      ))}
    </div>
  );
}
