"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const platforms = [
  { id: "linkedin", name: "LinkedIn", glyph: "in", label: "Text", limit: 3000, best: "1,300–2,500" },
  { id: "x", name: "X", glyph: "𝕏", label: "Post", limit: 280, best: "" },
  { id: "facebook", name: "Facebook", glyph: "f", label: "Post", limit: 63206, best: "" },
  { id: "instagram", name: "Instagram", glyph: "◎", label: "Caption", limit: 2200, best: "" },
  { id: "youtube", name: "YouTube", glyph: "▶", label: "Description", limit: 5000, best: "" },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");
const localMin = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function CreateForm() {
  const [pid, setPid] = useState<(typeof platforms)[number]["id"]>("linkedin");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [when, setWhen] = useState("");
  const [min, setMin] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => setMin(localMin()), []);

  const p = platforms.find((x) => x.id === pid)!;
  const tooLong = body.length > p.limit;
  const past = when !== "" && min !== "" && when < min;
  const reason = !body.trim() ? "Write the post text to save." : tooLong ? `Shorten the text to ${p.limit.toLocaleString()} characters or fewer.` : past ? "Pick a time that isn't in the past." : "";

  const save = () => {
    setSaved(true);
    setTitle(""); setBody(""); setWhen("");
  };

  return (
    <div className="card form-card">
      <div className="form-head">
        <h2 className="hd section-title">Create content yourself</h2>
        <p className="page-sub" style={{ margin: "6px 0 0", fontSize: 14 }}>
          Write a post from scratch. Spryxa saves exactly what you enter, with no AI generation or automatic rewriting.
        </p>
      </div>

      {saved && (
        <div className="notice" role="status">
          <Icon name="check" size={16} />Saved to the review queue.
          <button className="btn btn-sm btn-quiet" onClick={() => setSaved(false)}>Dismiss</button>
        </div>
      )}

      <fieldset className="field-group">
        <legend className="lbl">Platform</legend>
        <div className="seg">
          {platforms.map((x) => (
            <button key={x.id} type="button" className="seg-btn" aria-pressed={pid === x.id} aria-selected={pid === x.id} onClick={() => setPid(x.id)}>
              <span className="glyph" aria-hidden="true">{x.glyph}</span>{x.name}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="field-group">
        <label className="lbl" htmlFor="cf-title">Title</label>
        <input id="cf-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a compelling headline…" />
      </div>

      <div className="field-group">
        <div className="field-row">
          <span className="lbl">{p.name} · <b style={{ color: "var(--text)" }}>{p.label}</b></span>
          <span className="row-meta" style={{ margin: 0 }}>Up to {p.limit.toLocaleString()} characters</span>
        </div>
        <label className="lbl" htmlFor="cf-body" style={{ marginTop: 8 }}>Post text</label>
        <textarea id="cf-body" className="field" rows={10} value={body} onChange={(e) => setBody(e.target.value)} placeholder={`Write your ${p.name} post…`} aria-describedby="cf-count" />
        <div id="cf-count" className="row-meta" style={{ margin: 0, color: tooLong ? "var(--danger)" : undefined }}>
          {body.length.toLocaleString()} / {p.limit.toLocaleString()}{p.best && ` · reads best at ${p.best}`}
        </div>
      </div>

      <div className="field-group">
        <span className="lbl">Media</span>
        <div className="dropzone">Text only for now. Add images or video from the review queue after saving.</div>
      </div>

      <div className="field-group">
        <div className="field-row">
          <label className="lbl" htmlFor="cf-when">Publish schedule</label>
          <span className="row-meta" style={{ margin: 0 }}>Local time</span>
        </div>
        <input id="cf-when" type="datetime-local" className="input" value={when} min={min} onChange={(e) => setWhen(e.target.value)} />
        <div className="row-meta" style={{ margin: 0 }}>Optional. Saved in your local timezone. Past dates aren't allowed.</div>
      </div>

      <div className="form-foot">
        <span className="row-meta" style={{ margin: 0 }}>{reason}</span>
        <button className="btn btn-lg btn-primary" disabled={!!reason} onClick={save}>Save to review queue</button>
      </div>
    </div>
  );
}
