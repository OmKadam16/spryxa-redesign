"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Icon from "./Icon";

/* ───────── Tabbed page (real tabs, synced to ?tab=) ───────── */
export type TabDef = { id: string; label: string; node: ReactNode };

function Inner({ title, sub, actions, tabs }: { title: string; sub?: string; actions?: ReactNode; tabs: TabDef[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const current = tabs.find((t) => t.id === sp.get("tab")) ?? tabs[0];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="hd page-title">{title}</h1>
          {sub && <p className="page-sub">{sub}</p>}
        </div>
        {actions && <div className="actions">{actions}</div>}
      </div>
      <div className="ptabs" role="tablist" aria-label={`${title} sections`}>
        {tabs.map((t) => (
          <button key={t.id} role="tab" className="ptab" aria-selected={current.id === t.id} onClick={() => router.replace(`${path}?tab=${t.id}`, { scroll: false })}>
            {t.label}
          </button>
        ))}
      </div>
      <div key={current.id} className="stack">{current.node}</div>
    </div>
  );
}

export function TabPage(props: { title: string; sub?: string; actions?: ReactNode; tabs: TabDef[] }) {
  return (
    <Suspense fallback={null}>
      <Inner {...props} />
    </Suspense>
  );
}

/* ───────── Small building blocks ───────── */
export function Empty({ icon, tone = "var(--primary)", title, text, children, dashed }: { icon: string; tone?: string; title: string; text?: string; children?: ReactNode; dashed?: boolean }) {
  return (
    <div className="card empty" style={dashed ? { borderStyle: "dashed", boxShadow: "none" } : undefined}>
      <span className="tile" style={{ ["--t" as string]: tone, width: 56, height: 56 }}><Icon name={icon} size={26} /></span>
      <h2 className="hd section-title" style={{ marginTop: 8, textAlign: "center" }}>{title}</h2>
      {text && <p className="page-sub" style={{ maxWidth: 480, textAlign: "center", margin: 0 }}>{text}</p>}
      {children && <div className="actions" style={{ justifyContent: "center", marginTop: 4 }}>{children}</div>}
    </div>
  );
}

export function Field({ label, hint, children, id }: { label: string; hint?: string; children: ReactNode; id?: string }) {
  return (
    <div className="field-group">
      <label className="lbl" htmlFor={id}>{label}</label>
      {children}
      {hint && <div className="row-meta" style={{ margin: 0 }}>{hint}</div>}
    </div>
  );
}

export function Toggle({ on, onChange, label, desc }: { on: boolean; onChange: (v: boolean) => void; label: string; desc?: string }) {
  return (
    <label className="toggle-row">
      <span>
        <span className="row-title" style={{ display: "block" }}>{label}</span>
        {desc && <span className="row-meta" style={{ display: "block", margin: 0 }}>{desc}</span>}
      </span>
      <button type="button" role="switch" aria-checked={on} aria-label={label} className={`switch${on ? " on" : ""}`} onClick={() => onChange(!on)}><i /></button>
    </label>
  );
}

export function Score({ label, value, caption }: { label: string; value: number | null; caption?: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const pct = value ?? 0;
  const color = value === null ? "var(--border-strong)" : value >= 80 ? "var(--ok)" : value >= 60 ? "var(--warn-solid)" : "var(--danger)";
  return (
    <div className="card score">
      <svg width="88" height="88" viewBox="0 0 88 88" role="img" aria-label={`${label}: ${value ?? "not scored yet"}`}>
        <circle cx="44" cy="44" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="9" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} transform="rotate(-90 44 44)" />
        <text x="44" y="50" textAnchor="middle" fontSize="22" fontWeight="600" fill="var(--text)" fontFamily="inherit">{value ?? "—"}</text>
      </svg>
      <div>
        <div className="row-title">{label}</div>
        <div className="row-meta" style={{ margin: 0 }}>{caption ?? (value === null ? "Not scored yet" : "out of 100")}</div>
      </div>
    </div>
  );
}

export function Collapse({ title, badge, children, open }: { title: string; badge?: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="card fold" open={open}>
      <summary><span>{title}</span>{badge && <span className="chip">{badge}</span>}</summary>
      {children}
    </details>
  );
}

export function Seg<T extends string>({ items, value, onChange, label }: { items: readonly T[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div className="seg" role="tablist" aria-label={label}>
      {items.map((i) => (
        <button key={i} role="tab" className="seg-btn" aria-selected={value === i} onClick={() => onChange(i)}>{i}</button>
      ))}
    </div>
  );
}

export function Sheet({ title, onClose, children, footer, width = 520 }: { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode; width?: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <aside className="drawer" style={{ width }} role="dialog" aria-modal="true" aria-label={title}>
        <div className="drawer-head" style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
          <div className="drawer-title-row">
            <h2 className="hd section-title" style={{ fontSize: 22 }}>{title}</h2>
            <button ref={ref} className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
          </div>
        </div>
        <div className="drawer-body" style={{ padding: 24 }}>{children}</div>
        {footer && <div className="drawer-foot">{footer}</div>}
      </aside>
    </>
  );
}

export function Menu({ items, label, icon = "dots" }: { items: { label: string; onClick: () => void }[]; label: string; icon?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button className="icon-btn" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} style={{ border: "1px solid var(--border-strong)" }}><Icon name={icon} /></button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 39 }} onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="menu" role="menu">
            {items.map((i) => (
              <button key={i.label} role="menuitem" className="menu-item" onClick={() => { setOpen(false); i.onClick(); }}>{i.label}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
