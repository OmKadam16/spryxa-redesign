"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";

type Status = "planned" | "scheduled" | "published";
type Item = { id: string; offset: number; title: string; channel: string; status: Status };

const sampleItems: Item[] = [
  { id: "c1", offset: -2, title: "Home water filter checklist", channel: "Social", status: "published" },
  { id: "c2", offset: 1, title: "How atmospheric water generation works", channel: "Website", status: "scheduled" },
  { id: "c3", offset: 2, title: "Welcome note for new subscribers", channel: "Email", status: "planned" },
  { id: "c4", offset: 4, title: "Three questions before choosing a filter", channel: "Social", status: "scheduled" },
  { id: "c5", offset: 9, title: "Water quality FAQ for families", channel: "Website", status: "planned" },
  { id: "c6", offset: 12, title: "Monthly update to subscribers", channel: "Email", status: "scheduled" },
];

const DAY = 86400000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const startOfWeek = (d: Date) => addDays(startOfDay(d), -d.getDay());
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const sameDay = (a: Date, b: Date) => key(a) === key(b);
const mon = (d: Date, long = false) => d.toLocaleString("en-US", { month: long ? "long" : "short" });
const dow = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function CalendarView({ onCreate }: { onCreate: () => void }) {
  const [today, setToday] = useState<Date | null>(null);
  const [cursor, setCursor] = useState<Date | null>(null);
  const [view, setView] = useState<"week" | "month">("week");
  const [sample, setSample] = useState(false);

  useEffect(() => {
    const t = startOfDay(new Date());
    setToday(t);
    setCursor(t);
  }, []);

  const byDay = useMemo(() => {
    const m = new Map<string, Item[]>();
    if (!today || !sample) return m;
    sampleItems.forEach((i) => {
      const k = key(addDays(today, i.offset));
      m.set(k, [...(m.get(k) ?? []), i]);
    });
    return m;
  }, [today, sample]);

  if (!today || !cursor) return <div className="card empty" aria-busy="true" />;

  const weekStart = startOfWeek(cursor);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const monthFirst = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const gridStart = startOfWeek(monthFirst);
  const monthDays = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));

  const range = view === "week" ? weekDays : monthDays.filter((d) => d.getMonth() === cursor.getMonth());
  const all = range.flatMap((d) => byDay.get(key(d)) ?? []);
  const n = (s: Status) => all.filter((i) => i.status === s).length;

  const title =
    view === "week"
      ? `${mon(weekDays[0])} ${weekDays[0].getDate()} – ${mon(weekDays[6])} ${weekDays[6].getDate()}, ${weekDays[6].getFullYear()}`
      : `${mon(cursor, true)} ${cursor.getFullYear()}`;

  const step = (dir: 1 | -1) =>
    setCursor(view === "week" ? addDays(cursor, 7 * dir) : new Date(cursor.getFullYear(), cursor.getMonth() + dir, 1));

  const chip = (i: Item) => (
    <span key={i.id} className={`cal-item cal-${i.status}`} title={`${i.title} · ${i.channel} · ${i.status}`}>
      {i.title}
    </span>
  );

  return (
    <div className="stack">
      <div className="cal-bar">
        <div className="cal-nav">
          <button className="icon-btn cal-arrow" onClick={() => step(-1)} aria-label={`Previous ${view}`}><span style={{ transform: "rotate(180deg)", display: "grid" }}><Icon name="chevron" /></span></button>
          <div>
            <h2 className="hd section-title" style={{ fontSize: 20 }}>{title}</h2>
            <div className="row-meta">{n("planned")} planned · {n("scheduled")} scheduled · {n("published")} published</div>
          </div>
          <button className="icon-btn cal-arrow" onClick={() => step(1)} aria-label={`Next ${view}`}><Icon name="chevron" /></button>
        </div>
        <div className="cal-ctrl">
          <button className="btn btn-sm btn-secondary" onClick={() => setCursor(today)}>Today</button>
          <div className="seg" role="tablist" aria-label="Calendar view">
            {(["week", "month"] as const).map((v) => (
              <button key={v} role="tab" className="seg-btn" aria-selected={view === v} onClick={() => setView(v)} style={{ height: 32, textTransform: "capitalize" }}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="cal-scroll">
        {view === "week" ? (
          <div className="cal-week" role="grid" aria-label="Week view">
            {weekDays.map((d) => {
              const items = byDay.get(key(d)) ?? [];
              const isToday = sameDay(d, today);
              return (
                <div key={key(d)} className={`cal-day${isToday ? " is-today" : ""}`} role="gridcell">
                  <div className="cal-day-head">
                    <span className="lbl">{dow[d.getDay()]}</span>
                    <span className={`cal-num${isToday ? " today" : ""}`}>{d.getDate()}</span>
                  </div>
                  <div className="cal-items">{items.map(chip)}</div>
                  <button className="cal-add" onClick={onCreate} aria-label={`Add content on ${mon(d)} ${d.getDate()}`}><Icon name="plus" size={14} />Add</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cal-month" role="grid" aria-label="Month view">
            {dow.map((d) => <div key={d} className="cal-dow lbl">{d}</div>)}
            {monthDays.map((d) => {
              const items = byDay.get(key(d)) ?? [];
              const out = d.getMonth() !== cursor.getMonth();
              const isToday = sameDay(d, today);
              return (
                <div key={key(d)} className={`cal-cell${out ? " out" : ""}${isToday ? " is-today" : ""}`} role="gridcell">
                  <span className={`cal-num${isToday ? " today" : ""}`}>{d.getDate()}</span>
                  {items.slice(0, 2).map(chip)}
                  {items.length > 2 && <span className="row-meta">+{items.length - 2} more</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {all.length === 0 && (
        <div className="card empty" style={{ borderStyle: "dashed", boxShadow: "none" }}>
          <span className="tile" style={{ ["--t" as string]: "var(--orange)", width: 52, height: 52 }}><Icon name="calendar" size={24} /></span>
          <h3 className="hd section-title" style={{ marginTop: 4 }}>No scheduled content this {view}</h3>
          <p className="page-sub" style={{ margin: 0, textAlign: "center" }}>Approved content appears here once it has a scheduled date.</p>
          <div className="actions" style={{ justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={onCreate}><Icon name="pen" />Write content</button>
            {!sample && <button className="btn btn-quiet" onClick={() => setSample(true)}>Preview with sample content</button>}
          </div>
        </div>
      )}

      {view === "week" && (
        <section aria-label="Agenda" className="stack" style={{ gap: 12 }}>
          {weekDays.map((d) => {
            const items = byDay.get(key(d)) ?? [];
            return (
              <div key={key(d)} className="card agenda">
                <div className="agenda-head">
                  <span className="row-title">{d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                  {sameDay(d, today) && <span className="chip chip-blue">Today</span>}
                  {items.length === 0 && <span className="row-meta" style={{ marginLeft: "auto" }}>Nothing scheduled</span>}
                </div>
                {items.map((i) => (
                  <div key={i.id} className="agenda-row">
                    <span className={`dot dot-${i.status}`} aria-hidden="true" />
                    <span className="row-title" style={{ flex: 1 }}>{i.title}</span>
                    <span className="chip">{i.channel}</span>
                    <span className={`chip ${i.status === "published" ? "chip-ok" : i.status === "scheduled" ? "chip-blue" : "chip-warn"}`} style={{ textTransform: "capitalize" }}>{i.status}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
