"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import ApprovalsDrawer from "./ApprovalsDrawer";
import ChatPanel from "./AskDrawer";
import Palette from "./Palette";
import { approvals, nav, competitors } from "@/lib/data";

type Ctx = {
  openApprovals: () => void;
  openAsk: (prefill?: string) => void;
  toast: (message: string) => void;
  pending: number;
};
const ShellCtx = createContext<Ctx>({ openApprovals: () => {}, openAsk: () => {}, toast: () => {}, pending: 0 });
export const useShell = () => useContext(ShellCtx);

type MenuId = "switch" | "bell" | "user" | null;

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState<MenuId>(null);
  const [ctx, setCtx] = useState(false);
  const [chat, setChat] = useState(true);
  const [palette, setPalette] = useState(false);
  const [focusSignal, setFocusSignal] = useState(0);
  const [prefill, setPrefill] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [decided, setDecided] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = approvals.length - decided.length;

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    setChat(window.innerWidth >= 1200);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("spx-theme", next); } catch {}
  };

  const toast = useCallback((m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), 3600);
  }, []);

  const openApprovals = useCallback(() => setDrawer(true), []);
  const openAsk = useCallback((p?: string) => {
    setChat(true);
    setPrefill(p ?? "");
    setFocusSignal((n) => n + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((p) => !p); }
      if (e.key === "Escape") { setDrawer(false); setMenu(null); setCtx(false); setPalette(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { setMenu(null); }, [path]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const toggleMenu = (m: MenuId) => setMenu((c) => (c === m ? null : m));

  return (
    <ShellCtx.Provider value={{ openApprovals, openAsk, toast, pending }}>
      <a href="#main" className="skip">Skip to content</a>
      <header className="topbar">
        <Link href="/" className="brand" aria-label="Spryxa home">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" rx="8" fill="var(--primary)" />
            <path d="M9 18c0 2 2 3 5 3s5-1 5-3c0-4-10-2-10-7 0-2 2-4 5-4s5 2 5 4" fill="none" stroke="var(--on-primary)" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span className="hd">Spryxa</span>
        </Link>

        <div style={{ position: "relative" }}>
          <button className="switcher" aria-haspopup="menu" aria-expanded={menu === "switch"} onClick={() => toggleMenu("switch")} aria-label="Switch client or project">
            <span className="mark">W</span>
            <span>
              <span className="name">Watervo</span>
              <span className="url">watervo.com</span>
            </span>
            <Icon name="chevdown" size={16} />
          </button>
          {menu === "switch" && (
            <div className="menu" style={{ left: 0, right: "auto", minWidth: 280 }} role="menu">
              <div className="lbl menu-label">Client</div>
              <button className="menu-item" role="menuitem" onClick={() => { setMenu(null); toast("Prototype: manage clients"); }}>
                <Icon name="users" /><span><b>Watervo Account</b><br /><span className="row-meta" style={{ margin: 0 }}>Account · Owner · Manage clients</span></span>
              </button>
              <div className="menu-sep" />
              <div className="lbl menu-label">Project</div>
              <button className="menu-item" role="menuitemradio" aria-checked="true" onClick={() => setMenu(null)}>
                <Icon name="globe" /><span><b>watervo.com</b><br /><span className="row-meta" style={{ margin: 0 }}>Admin · Current</span></span>
                <span style={{ marginLeft: "auto", color: "var(--ok-text)" }}><Icon name="check" /></span>
              </button>
              {["Create project", "Manage projects", "Onboard a client"].map((l) => (
                <button key={l} className="menu-item" role="menuitem" onClick={() => { setMenu(null); toast(`Prototype: ${l.toLowerCase()}`); }}><Icon name="plus" />{l}</button>
              ))}
            </div>
          )}
        </div>

        <button className="search-btn" aria-label="Search or jump to a page" onClick={() => setPalette(true)}>
          <Icon name="search" />
          <span>Search Watervo…</span>
          <span className="kbd">⌘K</span>
        </button>

        <div style={{ flex: 1 }} />

        <span className="chip hide-sm" title="Your role in this workspace">Client admin</span>
        <button className="btn btn-ai" aria-pressed={chat} onClick={() => (chat ? setChat(false) : openAsk())}>
          <Icon name="spark" />{chat ? "Hide chat" : "Chat"}
        </button>
        <button className="btn btn-secondary hide-sm" onClick={() => setCtx(true)}><Icon name="panel" />Context</button>
        <button className="btn btn-secondary" onClick={openApprovals}>
          Approvals
          {pending > 0 && <span className="count-badge">{pending}</span>}
        </button>

        <div style={{ position: "relative" }}>
          <button className="icon-btn" aria-label="Notifications" aria-haspopup="menu" aria-expanded={menu === "bell"} onClick={() => toggleMenu("bell")}><Icon name="bell" /></button>
          {menu === "bell" && (
            <div className="menu" style={{ minWidth: 260 }} role="menu">
              <div className="lbl menu-label">Notifications</div>
              <div className="empty-line" style={{ padding: "8px 10px 14px" }}>No notifications yet.</div>
            </div>
          )}
        </div>
        <button className="icon-btn" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`} onClick={toggleTheme}>
          <Icon name={theme === "light" ? "moon" : "sun"} />
        </button>

        <div style={{ position: "relative" }}>
          <button className="avatar" aria-haspopup="menu" aria-expanded={menu === "user"} aria-label="Account menu" onClick={() => toggleMenu("user")}>OK</button>
          {menu === "user" && (
            <div className="menu" role="menu">
              <div style={{ padding: "8px 10px 10px" }}>
                <div className="row-title">Om Kadam</div>
                <div className="row-meta" style={{ margin: 0 }}>om4kadam@gmail.com</div>
              </div>
              <div className="menu-sep" />
              <Link href="/settings" className="menu-item" role="menuitem"><Icon name="user" />Personal settings</Link>
              <Link href="/settings?tab=connections" className="menu-item" role="menuitem"><Icon name="plug" />Connections</Link>
              <Link href="/cockpit" className="menu-item" role="menuitem"><Icon name="panel" />Full cockpit</Link>
              <button className="menu-item" role="menuitem" onClick={() => { setMenu(null); toast("Prototype: sign out is disabled"); }}><Icon name="logout" />Sign out</button>
            </div>
          )}
        </div>
      </header>
      {menu && <div style={{ position: "fixed", inset: 0, zIndex: 15 }} onClick={() => setMenu(null)} aria-hidden="true" />}

      <div className="layout">
        <nav className="rail" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="nav" aria-current={active(n.href) ? "page" : undefined}>
              <Icon name={n.icon} />{n.label}
            </Link>
          ))}
          <div className="rail-spacer" />
          <Link href="/cockpit" className="nav" aria-current={active("/cockpit") ? "page" : undefined}><Icon name="panel" />Full cockpit</Link>
          <Link href="/settings" className="nav" aria-current={active("/settings") ? "page" : undefined}><Icon name="settings" />Settings</Link>
        </nav>
        <main className="main" id="main">{children}</main>
        {chat && (
          <aside className="chat-panel" aria-label="Chat with Spryxa">
            <ChatPanel onClose={() => setChat(false)} focusSignal={focusSignal} prefill={prefill} />
          </aside>
        )}
      </div>

      {palette && <Palette onClose={() => setPalette(false)} openApprovals={openApprovals} />}

      {ctx && (
        <>
          <div className="scrim" onClick={() => setCtx(false)} aria-hidden="true" />
          <aside className="drawer" style={{ width: 420 }} role="dialog" aria-modal="true" aria-label="Context">
            <div className="drawer-head" style={{ paddingBottom: 12 }}>
              <div className="drawer-title-row">
                <h2 className="hd section-title" style={{ fontSize: 22 }}>Context</h2>
                <button className="icon-btn" onClick={() => setCtx(false)} aria-label="Close context"><Icon name="x" /></button>
              </div>
              <p className="page-sub" style={{ marginTop: 4 }}>Watervo · watervo.com</p>
            </div>
            <div className="drawer-body" style={{ padding: "8px 24px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
              <section>
                <div className="lbl">Documents · 0</div>
                <p className="row-meta" style={{ marginTop: 8 }}>Documents appear here once the business audit has written them.</p>
              </section>
              <section>
                <div className="section-head" style={{ marginBottom: 8 }}>
                  <span className="lbl">Competitors · {competitors.length}</span>
                  <Link href="/strategy?tab=competitors" className="btn btn-sm btn-quiet" onClick={() => setCtx(false)}>Open</Link>
                </div>
                {competitors.map((c) => (
                  <div className="row" key={c} style={{ padding: "10px 0" }}>
                    <span className="tile" style={{ ["--t" as string]: "var(--muted)", width: 32, height: 32 }}>{c[0].toUpperCase()}</span>
                    <span className="row-title">{c}</span>
                  </div>
                ))}
              </section>
            </div>
          </aside>
        </>
      )}

      {drawer && <ApprovalsDrawer onClose={() => setDrawer(false)} decided={decided} onDecide={(id) => setDecided((d) => [...d, id])} />}

      {msg && <div className="toast" role="status" aria-live="polite">{msg}</div>}
    </ShellCtx.Provider>
  );
}
