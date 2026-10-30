const paths: Record<string, string> = {
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  doc: "M7 3h8l4 4v14H7zM15 3v4h4M10 13h6M10 17h6",
  megaphone: "M3 11v3l12 5V6zM15 9a3 3 0 010 6M6 14v5",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  chart: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  settings: "M12 9a3 3 0 100 6 3 3 0 000-6zM19 12l2-1-2-4-2 1-2-1-1-2h-4l-1 2-2 1-2-1-2 4 2 1v2l-2 1 2 4 2-1 2 1 1 2h4l1-2 2-1 2 1 2-4-2-1z",
  bell: "M6 16V11a6 6 0 1112 0v5l2 2H4zM10 20a2 2 0 004 0",
  check: "M5 12l5 5L20 7",
  x: "M6 6l12 12M18 6L6 18",
  chevron: "M9 6l6 6-6 6",
  chevdown: "M6 9l6 6 6-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  spark: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM19 3v4M17 5h4",
  chat: "M4 5h16v11H9l-5 4z",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  coin: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v10M9.5 9.5h4a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3h4",
  funnel: "M3 5h18l-7 8v6l-4-2v-4z",
  plug: "M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4",
  sun: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5",
  moon: "M20 14A8 8 0 0110 4a8 8 0 1010 10z",
  user: "M12 4a4 4 0 100 8 4 4 0 000-8zM4 21a8 8 0 0116 0",
  logout: "M10 4H4v16h6M15 8l4 4-4 4M19 12H9",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 018 0v3",
  upload: "M12 16V4M7 9l5-5 5 5M4 20h16",
  refresh: "M20 11a8 8 0 00-14-4M4 4v4h4M4 13a8 8 0 0014 4M20 20v-4h-4",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6zM3 20a6 6 0 0112 0M17 11a3 3 0 100-6M21 20a6 6 0 00-4-5.6",
  key: "M8 14a4 4 0 110-8 4 4 0 010 8zM11 11l9 9M16 16l2-2M18 18l2-2",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  target: "M12 4a8 8 0 100 16 8 8 0 000-16zM12 8a4 4 0 100 8 4 4 0 000-8z",
  info: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 11v6M12 7.5h.01",
  link: "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1",
  trash: "M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
  clip:"M21 11l-8.5 8.5a5 5 0 01-7-7L14 4a3.5 3.5 0 015 5l-8.5 8.5a2 2 0 01-3-3L15 7",
  pen:"M4 20l4-1 11-11-3-3L5 16zM14 6l3 3",
  inbox: "M3 13l3-8h12l3 8v6H3zM3 13h5l1 3h6l1-3h5",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  send: "M4 12l16-8-6 16-2-6z",
  plus: "M12 5v14M5 12h14",
  panel:"M4 5h16v14H4zM9 5v14",
};

export default function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg className="ico" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name] ?? paths.spark} />
    </svg>
  );
}
