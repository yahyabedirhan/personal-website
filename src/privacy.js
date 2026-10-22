// Copied module: yahyabedirhan/shipyard (site/src) and yahyabedirhan/topographic (apps/playground/src) keep the same
// behaviour in their own files. Make a change in all three; shipyard's site/docs/low-level-design.md > 'Copied modules' lists them.
// Analytics preference, kept in localStorage under "analytics" on this device only.
//   full       (default) pageviews, clicks, web vitals, scroll depth, error reports
//   pageviews  only $pageview and $pageleave, nothing else; set by ?analytics_optout or the footer button
//   off        nothing is loaded or sent at all; set by ?analytics_optout=all
// ?analytics_optin clears it. The query param is removed from the URL right after it is read.
// Any mode but full also deletes the random visitor id and the tab's agent identity (see below).
const KEY = 'analytics';
const VISITOR = 'visitor';
const AGENT = 'agent';
const forgetVisitor = () => {
  try { localStorage.removeItem(VISITOR); } catch {}
  try { sessionStorage.removeItem(AGENT); } catch {}
};
const read = () => { try { return localStorage.getItem(KEY) || 'full'; } catch { return 'full'; } };
const write = v => { try { v === 'full' ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, v); } catch {} };

const q = new URLSearchParams(location.search);
if (q.has('analytics_optout') || q.has('analytics_optin')) {
  write(q.has('analytics_optin') ? 'full' : q.get('analytics_optout') === 'all' ? 'off' : 'pageviews');
  q.delete('analytics_optout'); q.delete('analytics_optin');
}

// Who the visit comes from: a person (actor: human) or an AI agent (actor: agent).
// An agent can say what it is with ?analytics_agent=<name>&analytics_purpose=<purpose> on the first load.
// Both values come only from these lists; anything else is ignored, so no agent can send text of its own.
// The identity lasts for this tab only (sessionStorage), so a person's later visits stay human.
export const AGENT_NAMES = ['claude', 'chatgpt', 'gemini', 'jules', 'copilot', 'cursor', 'windsurf', 'opencode', 'pi', 'amp', 'droid',
  'cline', 'roo', 'kilo', 'aider', 'goose', 'kiro', 'devin', 'manus', 'grok', 'perplexity', 'other'];
export const PURPOSES = ['testing', 'demo', 'creating', 'exploring', 'integrating', 'research', 'reverse-engineering', 'other'];
const readAgent = () => { try { return JSON.parse(sessionStorage.getItem(AGENT)) || null; } catch { return null; } };
if (q.has('analytics_agent') || q.has('analytics_purpose')) {
  const name = q.get('analytics_agent'), purpose = q.get('analytics_purpose');
  if (AGENT_NAMES.includes(name) && PURPOSES.includes(purpose) && read() === 'full') {
    try { sessionStorage.setItem(AGENT, JSON.stringify({ id: readAgent()?.id || crypto.randomUUID(), name, purpose })); } catch {}
  }
  q.delete('analytics_agent'); q.delete('analytics_purpose');
}
if (q.toString() !== new URLSearchParams(location.search).toString()) {
  const s = q.toString();
  history.replaceState(history.state, '', location.pathname + (s ? `?${s}` : '') + location.hash);
}

let mode = read();
if (mode !== 'full') forgetVisitor();
const subs = [];
export const getMode = () => mode;
export const setMode = v => { mode = v; write(v); if (v !== 'full') forgetVisitor(); subs.forEach(f => f(v)); };

// A random id for this browser, kept in localStorage under "visitor" and sent as visitor_id,
// so one browser's visits can be counted together across days. Blocked storage gives a per-page id.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export function visitorId() {
  try { const saved = localStorage.getItem(VISITOR); if (saved && UUID.test(saved)) return saved; } catch {}
  const id = crypto.randomUUID();
  try { localStorage.setItem(VISITOR, id); } catch {}
  return id;
}
export const onMode = f => subs.push(f);

// The actor properties for this tab's events: a person's visitor id, or an agent's id, name and purpose.
// A browser driven over WebDriver (Playwright, Selenium, Puppeteer) is an agent too, with automation headless or visible.
export function actorProps() {
  let agent = readAgent();
  const automation = navigator.webdriver ? (/headless/i.test(navigator.userAgent) ? 'headless' : 'visible') : undefined;
  if (!agent && !automation) return { actor: 'human', visitor_id: visitorId() };
  if (!agent?.id) {
    agent = { id: crypto.randomUUID() };
    try { sessionStorage.setItem(AGENT, JSON.stringify(agent)); } catch {}
  }
  const props = { actor: 'agent', agent_id: agent.id };
  if (AGENT_NAMES.includes(agent.name)) props.agent_name = agent.name;
  if (PURPOSES.includes(agent.purpose)) props.purpose = agent.purpose;
  if (automation) props.automation = automation;
  return props;
}
export const ACTOR_KEYS = ['actor', 'visitor_id', 'agent_id', 'agent_name', 'purpose', 'automation'];
