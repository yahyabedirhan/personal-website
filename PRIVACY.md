# Privacy

yahyapak.dev uses light, cookieless analytics to understand which pages and projects people find useful and whether pages load fast, and error reports to fix bugs. The only thing stored on your device for this is one random visitor id, and opting out deletes it.

## What is collected

| Event | Contains | Why |
| --- | --- | --- |
| `$pageview` | the page address (including UTM tags in shared links), the referring site, and `entry` (whether this was the first page of the visit) | see which pages people visit and how they arrive |
| `$pageleave` | time spent on the page and how far down it was scrolled | see whether pages are actually read |
| `ui_click` | which link or button was clicked (section and name), its address, and whether it leads off the site; mail links never include the address | see which projects and links people find useful |
| Web vitals | page load and responsiveness timings (LCP, INP, CLS, FCP) for the page | check that pages load fast |
| `analytics_opted_out` | nothing beyond the common properties | count how many people opt out |
| Error reports (Sentry) | the error message, stack trace, page and browser | fix bugs |

Every event also carries `site` (always `personal-website`), `system_theme` (whether your device prefers dark or light) and `visitor_id`.

PostHog derives device type, operating system, browser, screen size, language, country and city from the request. The IP address is used for that and then discarded. To count unique visitors per day without cookies, PostHog hashes the IP and browser details with a salt that changes every day, so PostHog's own id only recognises a visitor within one day.

## Visitor id

The first visit makes a random id (a UUID) and saves it in local storage under `visitor`. Every event carries it as `visitor_id`, so the visits of one browser can be counted together across days. The id is random: it holds nothing about you, and it differs per browser and device. Opting out deletes it and stops sending it, and clearing site data removes it.

## What is never collected

Your name, email, raw IP address, screen recordings, or anything that follows you across devices or other sites.

## Opting out

- **Opt out** on the [About](https://yahyapak.dev/about) page, or open any page with `?optout`: only page views are sent, nothing else (no clicks, timings, scroll depth or error reports).
- `?optout=all`: nothing is loaded or sent at all.
- `?optin` or **Opt in** on the About page: undo.

The choice is saved in this browser's local storage, so each browser and device has to opt out separately, and clearing site data resets it.

## Processors

- [PostHog](https://posthog.com/privacy), EU cloud (analytics)
- [Sentry](https://sentry.io/privacy/), EU region (error reports)
