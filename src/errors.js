// Error reporting with Sentry, errors only. Without VITE_SENTRY_DSN at build time this module does
// nothing and @sentry/browser is never fetched. With it, the SDK loads after the page is idle;
// errors thrown before that are buffered and sent once it is ready.
import { getMode } from './privacy.js';

// only for visitors who have not opted out (analytics preference "full")
const DSN = getMode() === 'full' ? import.meta.env.VITE_SENTRY_DSN : undefined;

if (DSN) {
  const early = [];
  const onError = e => early.push(e.error || e.message);
  const onRejection = e => early.push(e.reason);
  addEventListener('error', onError);
  addEventListener('unhandledrejection', onRejection);

  const load = () => import('@sentry/browser').then(Sentry => {
    Sentry.init({
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
