// Analytics preference, kept in localStorage under "analytics" on this device only.
//   full       (default) pageviews, clicks, web vitals, scroll depth, error reports
//   pageviews  only $pageview and $pageleave, nothing else; set by ?optout or the footer button
//   off        nothing is loaded or sent at all; set by ?optout=all
// ?optin clears it. The query param is removed from the URL right after it is read.
// Any mode but full also deletes the random visitor id (see visitorId below).
const KEY = 'analytics';
const VISITOR = 'visitor';
const forgetVisitor = () => { try { localStorage.removeItem(VISITOR); } catch {} };
const read = () => { try { return localStorage.getItem(KEY) || 'full'; } catch { return 'full'; } };
const write = v => { try { v === 'full' ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, v); } catch {} };

const q = new URLSearchParams(location.search);
if (q.has('optout') || q.has('optin')) {
  write(q.has('optin') ? 'full' : q.get('optout') === 'all' ? 'off' : 'pageviews');
  q.delete('optout'); q.delete('optin');
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
