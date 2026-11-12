// Error reporting with Sentry, errors only. Without VITE_SENTRY_DSN at build time this module does
// nothing and @sentry/browser is never fetched. With it, the SDK loads after the page is idle;
// errors thrown before that are buffered and sent once it is ready.
import { getMode } from './privacy.js';

// only for visitors who have not opted out (analytics preference "full")
const DSN = getMode() === 'full' ? import.meta.env.VITE_SENTRY_DSN : undefined;

// A view transition the browser skips or aborts, because the tab was hidden or the viewport changed
// during a page change, rejects its promises with InvalidStateError (AbortError in some browsers).
// The page change still completes, so these are not reported.
const TRANSITION_ABORTED = /(InvalidStateError|AbortError).*transition/i;
const isTransitionAborted = err => TRANSITION_ABORTED.test(err && typeof err === 'object' ? `${err.name}: ${err.message}` : String(err));

if (DSN) {
  const early = [];
  const keep = err => { if (!isTransitionAborted(err)) early.push(err); };
  const onError = e => keep(e.error || e.message);
  const onRejection = e => keep(e.reason);
  addEventListener('error', onError);
  addEventListener('unhandledrejection', onRejection);

  const load = () => import('@sentry/browser').then(Sentry => {
    Sentry.init({
      ignoreErrors: [TRANSITION_ABORTED],
      // only errors thrown in the site's own bundled scripts; scripts a browser, an in-app browser, a
      // translation tool or an extension injects into the page run from other URLs and are not reported
      allowUrls: [`${location.origin}/_astro/`],
      dsn: DSN,
      // the defaults minus BrowserSession (session tracking); tracing and replay are never added
      integrations: Sentry.getDefaultIntegrations({}).filter(i => i.name !== 'BrowserSession'),
      tracesSampleRate: 0,
      sendDefaultPii: false,
    });
    removeEventListener('error', onError);
    removeEventListener('unhandledrejection', onRejection);
    early.splice(0).forEach(err => Sentry.captureException(err));
  }).catch(() => {});

  const start = () => ('requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 3000 }) : setTimeout(load, 1));
  document.readyState === 'complete' ? start() : addEventListener('load', start, { once: true });
}
