// Cookieless PostHog analytics. Without VITE_POSTHOG_KEY at build time this module does nothing
// and posthog-js is never fetched. With it, posthog-js loads after the first paint, in memory only.
// The visitor's preference (see privacy.js) decides how much is sent: "off" loads nothing,
// "pageviews" lets only $pageview and $pageleave through, "full" sends everything below.
import { getMode, setMode } from './privacy.js';

const KEY = getMode() === 'off' ? undefined : import.meta.env.VITE_POSTHOG_KEY;
const PAGEVIEWS_ONLY = new Set(['$pageview', '$pageleave', 'analytics_opted_out']);
export const analyticsOn = () => !!KEY;
let ph = null;
const queue = [];

function load() {
  Promise.all([
    import('posthog-js'),
    import('posthog-js/dist/web-vitals'), // bundled web-vitals callbacks, so no script is fetched at runtime
  ]).then(([{ default: posthog }]) => {
    posthog.init(KEY, {
      api_host: 'https://eu.i.posthog.com',
      persistence: 'memory',           // no cookies, no localStorage
      // anonymous id hashed server side from IP + user agent with a daily salt, IP then dropped:
      // same-day unique visitors without storing anything on the device
      cookieless_mode: 'always',
      disable_session_recording: true,
      autocapture: false,
      capture_pageview: false,         // the router calls pageview() once per route
      capture_pageleave: true,
      // nothing beyond events: no flags or remote config calls, no extra scripts or features
      advanced_disable_flags: true,
      disable_external_dependency_loading: true,
      disable_surveys: true,
      disable_product_tours: true,
      disable_conversations: true,
      disable_web_experiments: true,
      rageclick: false,
      capture_dead_clicks: false,
      capture_heatmaps: false,
      capture_performance: { web_vitals: true, web_vitals_attribution: false, web_vitals_allowed_metrics: ['LCP', 'CLS', 'INP', 'FCP'], network_timing: false },
      capture_exceptions: false,
      // pageviews mode: drop everything but pageviews (and the one opt-out event), and the scroll and duration props on the pageviews
      before_send: e => {
        if (!e || getMode() === 'full') return e;
        if (!PAGEVIEWS_ONLY.has(e.event)) return null;
        for (const k in e.properties) if (k.startsWith('$prev_pageview_')) delete e.properties[k];
        return e;
      },
    });
    // tag every event, queued ones included, so sites sharing one project can be told apart
    posthog.register({
      site: 'personal-website',
      system_theme: matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
    });
    ph = posthog;
    queue.splice(0).forEach(([name, props]) => ph.capture(name, props));
  }).catch(() => {});
}

function track(name, props) {
  if (!KEY || (getMode() !== 'full' && !PAGEVIEWS_ONLY.has(name))) return;
  ph ? ph.capture(name, props) : queue.push([name, props]);
}

// $pageview carries the URL (UTM params included) and the referrer by default.
// URL is fixed at call time so a pageview queued before posthog-js loads keeps its own route.
// entry is true only for the route the visit landed on (typed, shared or linked from elsewhere).
let entry = true;
export const pageview = () => {
  track('$pageview', { $current_url: location.href, $pathname: location.pathname, entry });
  entry = false;
};

// Footer button. analytics_opted_out is the last non-pageview event this device sends.
export function optOut() {
  if (ph) ph.capture('analytics_opted_out', {}, { send_instantly: true });
  else queue.push(['analytics_opted_out', {}]);
  setMode('pageviews');
}
export const optIn = () => setMode('full');

// One click event for everything: ui_click { section, target, href, route }.
// section comes from the nearest data-section, target from data-track on the element,
// and anything without data-track falls back to its host (links) or "unknown".
// Extra props: project (project rows), theme (the theme being switched to), image (zoom).
function onClick(e) {
  const el = e.target.closest('a[href], button');
  if (!el || el.closest('.zoom-layer') || el.classList.contains('optout')) return; // optout sends its own event
  const section = el.closest('[data-section]')?.dataset.section || 'other';
  const props = { section, route: location.pathname };
  if (el.tagName === 'A') {
    const url = new URL(el.href, location.href);
    props.href = url.protocol === 'mailto:' ? 'mailto' : url.origin === location.origin ? url.pathname : url.origin + url.pathname;
    props.outbound = url.origin !== location.origin;
    props.target = el.dataset.track || (url.protocol === 'mailto:' ? 'email' : url.hostname.replace(/^www\./, ''));
  } else props.target = el.dataset.track || 'unknown';
  if (section === 'project') props.project = props.target;
  if (section === 'theme') props.theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  if (section === 'zoom') props.image = el.querySelector('img')?.getAttribute('src');
  track('ui_click', props);
}

if (KEY) {
  document.addEventListener('click', onClick, true);
  const start = () => ('requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 3000 }) : setTimeout(load, 1));
  document.readyState === 'complete' ? start() : addEventListener('load', start, { once: true });
}
