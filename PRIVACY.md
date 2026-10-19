# Privacy

yahyapak.dev uses light, cookieless analytics to understand which pages and projects people find useful and whether pages load fast, and error reports to fix bugs. The only things stored on your device for this are one random visitor id and, for AI agents, an agent id for one tab. Opting out deletes both.

## What is collected

| Event | Contains | Why |
| --- | --- | --- |
| `$pageview` | the page address, including UTM tags in shared links, the referring site, and `entry`, which says whether this was the first page of the visit | see which pages people visit and how they arrive |
| `$pageleave` | time spent on the page and how far down it was scrolled | see whether pages are actually read |
| `ui_click` | which link or button was clicked, by section and name, its address, and whether it leads off the site; mail links never include the address | see which projects and links people find useful |
| Web vitals | page load and responsiveness timings for the page: LCP, INP, CLS and FCP | check that pages load fast |
| `analytics_opted_out` | nothing beyond the common properties | count how many people opt out |
| Error reports, sent to Sentry | the error message, stack trace, page and browser | fix bugs |

Every event also carries `site`, which is always `personal-website`, and `system_theme`, which says whether your device prefers dark or light. It also says whether it comes from a person or an AI agent: `actor` is `human` or `agent`, with a `visitor_id` or an `agent_id`.

Your browser also shares its type, screen size, language and timezone. Your IP address is never stored, and your country and city are not recorded.

## Visitor id

The first visit saves a random id in your browser under `visitor`, so return visits count once. It holds nothing about you. Opting out deletes it.

## People and agents

AI agents are counted apart from people. An agent gets its own random id for one browser tab. Browsers run by automation, such as Playwright, count as agents. An agent can say which agent it is and why it is here with `?analytics_agent=<name>&analytics_purpose=<purpose>`. This is optional, and only names and purposes from the short lists in `src/privacy.js` are recorded.

## What is never collected

- The site never sets cookies and never fingerprints your browser.
- It never stores your IP address, and never collects your name or email.
- It never records your screen.
- It never collects anything that follows you across devices or other sites.

## Opting out

- **Opt out** on the [About](https://yahyapak.dev/about) page, or open any page with `?analytics_optout`: only page views are sent, nothing else (no clicks, timings, scroll depth or error reports).
- `?analytics_optout=all`: nothing is loaded or sent at all.
- `?analytics_optin` or **Opt in** on the About page: undo.

The choice is saved in this browser's local storage, so each browser and device has to opt out separately, and clearing site data resets it.

## Processors

- [PostHog](https://posthog.com/privacy), EU cloud (analytics)
- [Sentry](https://sentry.io/privacy/), EU region (error reports)
