// Cookieless PostHog analytics. Without VITE_POSTHOG_KEY at build time this module does nothing
// and posthog-js is never fetched. With it, posthog-js loads after the first paint, in memory only.
const KEY = import.meta.env.VITE_POSTHOG_KEY;
let ph = null;
const queue = [];

function load() {
  import('posthog-js').then(({ default: posthog }) => {
    posthog.init(KEY, {
      api_host: 'https://eu.i.posthog.com',
      persistence: 'memory',           // no cookies, no localStorage
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
      capture_performance: false,
      capture_exceptions: false,
    });
    // tag every event, queued ones included, so sites sharing one project can be told apart
    posthog.register({ site: 'personal-website' });
    ph = posthog;
    queue.splice(0).forEach(([name, props]) => ph.capture(name, props));
  }).catch(() => {});
}

function track(name, props) {
  if (!KEY) return;
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

// One click event for everything: ui_click { section, target, href, route }.
// section comes from the nearest data-section, target from data-track on the element,
// and anything without data-track falls back to its host (links) or "unknown".
// Extra props: project (project rows), theme (the theme being switched to), image (zoom).
function onClick(e) {
  const el = e.target.closest('a[href], button');
  if (!el || el.closest('.zoom-layer')) return;
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
