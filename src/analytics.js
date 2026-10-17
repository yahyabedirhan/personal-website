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
    ph = posthog;
    queue.splice(0).forEach(([name, props]) => ph.capture(name, props));
  }).catch(() => {});
}

function track(name, props) {
  if (!KEY) return;
  ph ? ph.capture(name, props) : queue.push([name, props]);
}

// $pageview carries the URL (UTM params included) and the referrer by default
// URL is fixed at call time so a pageview queued before posthog-js loads keeps its own route
export const pageview = () => track('$pageview', { $current_url: location.href, $pathname: location.pathname });

// Two click events only: project_opened for links to a project page, outbound_click for links off the site
const TARGETS = { 'github.com': 'github', 'x.com': 'x', 'linkedin.com': 'linkedin', 'forbes.com': 'forbes', 'polymet.ai': 'polymet', 'zeplin.io': 'zeplin' };
function onClick(e) {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (url.protocol === 'mailto:') return track('outbound_click', { target: 'mail' });
  if (url.origin === location.origin) {
    const m = url.pathname.match(/^\/projects\/([\w-]+)$/);
    if (m) track('project_opened', { project: m[1] });
    return;
  }
  const host = url.hostname.replace(/^www\./, '');
  track('outbound_click', { target: TARGETS[host] || host });
}

if (KEY) {
  document.addEventListener('click', onClick, true);
  const start = () => ('requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 3000 }) : setTimeout(load, 1));
  document.readyState === 'complete' ? start() : addEventListener('load', start, { once: true });
}
