export type Approval = {
  id: string;
  title: string;
  kind: string;
  high?: boolean;
  why: string;
  happens: string;
};

export const approvals: Approval[] = [
  {
    id: "a1",
    title: "Approve WaterVO Cycle 1 Campaign Strategy, Message Hierarchy & 36-Day Activation Plan",
    kind: "Campaign",
    high: true,
    why: "Every channel plan for the next 36 days is built from this strategy. Approving it locks the message hierarchy.",
    happens: "Spryxa drafts the first two weeks of content and outreach for your review. Nothing publishes without a second approval.",
  },
  {
    id: "a2",
    title: "Approve Phase 1 Storefront Trust, Navigation & Speed Remediation on watervo.com",
    kind: "Website",
    why: "The audit found slow pages and unclear navigation that are costing visits before they become leads.",
    happens: "Spryxa prepares the changes as a draft. You preview them before anything goes live.",
  },
  {
    id: "a3",
    title: "Confirm 'Health-Conscious Homeowners and Families' ICP Hypothesis Before Committing Spend",
    kind: "Strategy",
    why: "Paid media and outreach targeting depend on who we believe the ideal customer is.",
    happens: "Targeting for ads and outreach is set to this audience. You can change it later.",
  },
  {
    id: "a4",
    title: "Initialize Active Project Mission to Unblock 2-Week Mission Plan Persistence",
    kind: "Planning",
    why: "The two-week plan can't be saved until a mission is set for this project.",
    happens: "A mission is created and the plan starts saving automatically.",
  },
  {
    id: "a5",
    title: "Connect Google Analytics, Search Console, Shopify and email telemetry",
    kind: "Setup",
    why: "Spryxa can't measure what moved traffic and leads until these sources are connected.",
    happens: "You're taken to Connections. Nothing is read until you approve each one.",
  },
  {
    id: "a6",
    title: "Confirm your strategy",
    kind: "Initiative",
    why: "Spryxa needs a final yes on the strategy summary before it builds the next plan.",
    happens: "The initiative moves to planning.",
  },
];

export type Crew = {
  key: string;
  name: string;
  plain: string;
  desc: string;
  state: "paused" | "needs";
  status: string;
  color: string;
  icon: string;
  link: { label: string; href: string };
};

export const crews: Crew[] = [
  { key: "measurement", name: "Measurement", plain: "Results tracking", desc: "Shows what moved traffic, rankings and leads.", state: "paused", status: "Paused", color: "var(--primary)", icon: "chart", link: { label: "Open Insights", href: "/insights" } },
  { key: "website", name: "Website", plain: "Website fixes", desc: "Keeps your site fast, findable and converting.", state: "paused", status: "Paused", color: "var(--orange)", icon: "globe", link: { label: "Open Website", href: "/website" } },
  { key: "brand", name: "Brand", plain: "Brand voice", desc: "Keeps every page and post sounding like you.", state: "paused", status: "Paused", color: "var(--pink)", icon: "spark", link: { label: "Open Brand voice", href: "/strategy?tab=brand-voice" } },
  { key: "search", name: "Search", plain: "Search visibility", desc: "Finds the searches and AI answers you can win.", state: "needs", status: "Needs Search Console", color: "var(--violet)", icon: "search", link: { label: "Connect Search Console", href: "/settings?tab=connections" } },
  { key: "content", name: "Content", plain: "Posts and articles", desc: "Drafts posts and articles in your voice for you to approve.", state: "paused", status: "Paused", color: "var(--ok)", icon: "doc", link: { label: "Open Content", href: "/content" } },
  { key: "social", name: "Social", plain: "Social posts", desc: "Drafts social posts and community replies for you to approve.", state: "paused", status: "Paused", color: "var(--pink)", icon: "chat", link: { label: "Open Social insights", href: "/insights?tab=social" } },
  { key: "outreach", name: "Outreach", plain: "Outreach", desc: "Finds prospects and drafts warm introductions.", state: "needs", status: "Needs CRM", color: "var(--orange)", icon: "mail", link: { label: "Open Outreach", href: "/campaigns?tab=outreach" } },
  { key: "paid", name: "Paid media", plain: "Paid ads", desc: "Shows where ad spend works and where to move it.", state: "needs", status: "Needs ad accounts", color: "var(--warn-solid)", icon: "coin", link: { label: "Open Ad campaigns", href: "/campaigns?tab=ad-campaigns" } },
  { key: "pipeline", name: "Pipeline", plain: "Lead follow-up", desc: "Flags leads that have gone quiet.", state: "paused", status: "Paused", color: "var(--primary)", icon: "funnel", link: { label: "Open CRM insights", href: "/insights?tab=crm" } },
  { key: "planning", name: "Planning", plain: "Planning", desc: "Turns a goal into the plan the other teams work from.", state: "paused", status: "Paused", color: "var(--violet)", icon: "map", link: { label: "Open Strategy", href: "/strategy" } },
];

export const competitors = ["watergen.com", "karawater.com", "spoutwater.com"];

export const rivals = [
  { name: "Spout Water", site: "spoutwater.com", loc: "Los Angeles, CA", why: "Original seller of the Spout Monolith countertop atmospheric water generator (up to 2.5 gal/day). WaterVO also distributes it. Targets the same health-conscious homeowner and RV/van-life audience." },
  { name: "Kara Water", site: "karawater.com", loc: "New York, NY", why: "Makes the Kara Pure and Kara Pure 2 floor-standing and countertop air-to-water dispensers (up to 10 L / 2.6 gal/day). Overlaps WaterVO's messaging on avoiding microplastics." },
  { name: "Watergen", site: "watergen.com", loc: "Petah Tikva, Israel", why: "Makes the GENNY and GENNY+ home and office generators (hot and cold mineralized water). Competes with WaterVO's Floor Model and commercial offerings." },
];

export const icps = [
  {
    name: "Health-Conscious Homeowners and Families",
    tag: "Hypothesis",
    budget: "$1,495–$2,499",
    trigger: "Learning about nanoplastics in bottled water",
    pains: ["Nanoplastics in bottled water", "Heavy jugs and deliveries", "Plumbing hookups for reverse osmosis"],
    objections: ["Not certified to remove contaminants", "Output drops in dry or cool rooms", "6–8 week pre-order wait"],
    channels: ["Direct-to-consumer site", "Newport Beach showroom", "Email"],
  },
  {
    name: "Off-Grid Travelers and RV Owners",
    tag: "Hypothesis",
    budget: "$899 · $99 refundable reservation",
    trigger: "RV or travel where tap water isn't available",
    pains: ["Delivery not until Summer 2027", "About 1.5 L/day output"],
    objections: [],
    channels: ["Waitlist and reservation on the site"],
  },
];

export const firstDecision = [
  { state: "done", label: "Read watervo.com" },
  { state: "now", label: "Prepare one draft" },
  { state: "next", label: "You decide" },
] as const;

export const recommended = {
  title: "Launch a structured blog/educational hub expanding on atmospheric water generation and the external public health sources already linked on the site",
  source: "Intelligence › Content gaps",
  priority: "High priority",
};

export const connectors = [
  { name: "Google Analytics", short: "Google Analytics" },
  { name: "Search Console", short: "Search Console" },
  { name: "Ad accounts", short: "Ad accounts" },
  { name: "CRM", short: "CRM" },
];

export const nav = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Content", href: "/content", icon: "doc" },
  { label: "Campaigns", href: "/campaigns", icon: "megaphone" },
  { label: "Search", href: "/search", icon: "search" },
  { label: "Website", href: "/website", icon: "globe" },
  { label: "Insights", href: "/insights", icon: "chart" },
  { label: "Strategy", href: "/strategy", icon: "map" },
];

export type SearchItem = { group: string; label: string; href: string; action?: "approvals" };
const g = (group: string, base: string, items: [string, string][]): SearchItem[] =>
  items.map(([label, id]) => ({ group, label, href: `${base}?tab=${id}` }));

export const searchIndex: SearchItem[] = [
  { group: "Home", label: "Home", href: "/" },
  { group: "Home", label: "Approvals", href: "/", action: "approvals" },
  ...g("Content", "/content", [["Queue", "queue"], ["Calendar", "calendar"], ["Create", "create"], ["Generate", "generate"], ["Content strategy", "content-strategy"], ["Library", "library"]]),
  ...g("Campaigns", "/campaigns", [["Campaign calendar", "campaign-calendar"], ["Ad campaigns", "ad-campaigns"], ["Outreach", "outreach"], ["Workflows", "workflows"]]),
  ...g("Search", "/search", [["Rankings", "rankings"], ["Keywords", "keywords"], ["Prompts", "prompts"], ["AI visibility", "ai-visibility"], ["Backlinks", "backlinks"]]),
  ...g("Website", "/website", [["Site audit", "site-audit"], ["Site changes", "site-changes"], ["Conversion findings", "conversion-findings"]]),
  ...g("Insights", "/insights", [["Social", "social"], ["Website analytics", "website-analytics"], ["Ads", "ads"], ["CRM", "crm"]]),
  ...g("Strategy", "/strategy", [["Brand voice", "brand-voice"], ["Ideal customer", "ideal-customer"], ["Competitors", "competitors"], ["Market research", "market-research"]]),
  ...g("Settings", "/settings", [["Workspace", "workspace"], ["People", "people"], ["Teams", "teams"], ["Connections", "connections"], ["Autopilot", "autopilot"]]),
  { group: "More", label: "Full cockpit", href: "/cockpit" },
];
