// Analytics preference, kept in localStorage under "analytics" on this device only.
//   full       (default) pageviews, clicks, web vitals, scroll depth, error reports
//   pageviews  only $pageview and $pageleave, nothing else; set by ?optout or the footer button
//   off        nothing is loaded or sent at all; set by ?optout=all
// ?optin clears it. The query param is removed from the URL right after it is read.
const KEY = 'analytics';
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
const subs = [];
export const getMode = () => mode;
export const setMode = v => { mode = v; write(v); subs.forEach(f => f(v)); };
export const onMode = f => subs.push(f);
