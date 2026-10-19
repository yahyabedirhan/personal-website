# Privacy

yahyapak.dev uses light, cookieless analytics to understand which pages and projects people find useful and whether pages load fast, and error reports to fix bugs. The only things stored on your device for this are one random visitor id and, for AI agents, an agent id for one tab. Opting out deletes both.

## What is collected

| Event | Contains | Why |
| --- | --- | --- |
| `$pageview` | the page address (including UTM tags in shared links), the referring site, and `entry` (whether this was the first page of the visit) | see which pages people visit and how they arrive |
| `$pageleave` | time spent on the page and how far down it was scrolled | see whether pages are actually read |
| `ui_click` | which link or button was clicked (section and name), its address, and whether it leads off the site; mail links never include the address | see which projects and links people find useful |
| Web vitals | page load and responsiveness timings (LCP, INP, CLS, FCP) for the page | check that pages load fast |
| `analytics_opted_out` | nothing beyond the common properties | count how many people opt out |
| Error reports (Sentry) | the error message, stack trace, page and browser | fix bugs |

Every event also carries `site` (always `personal-website`), `system_theme` (whether your device prefers dark or light) and who it comes from: `actor` (`human` or `agent`) with a `visitor_id` or an `agent_id`.

The browser sends its device type, operating system, browser, screen size, language and timezone. Country and city are not recorded: in cookieless mode PostHog drops the IP address before it could look them up. The IP address is never stored. To count unique visitors per day without cookies, PostHog hashes the IP and browser details with a salt that changes every day, so PostHog's own id only recognises a visitor within one day.

## Visitor id

The first visit makes a random id (a UUID) and saves it in local storage under `visitor`. Every event carries it as `visitor_id`, so the visits of one browser can be counted together across days. The id is random: it holds nothing about you, and it differs per browser and device. Opting out deletes it and stops sending it, and clearing site data removes it.

## People and agents

Every event says whether it comes from a person or an AI agent. An agent's events carry a random `agent_id` instead of the visitor id, kept for one browser tab only.

- A browser driven by automation, such as Playwright or Selenium, counts as an agent, with whether it was headless or visible.
- An agent can open the site with `?analytics_agent=<name>&analytics_purpose=<purpose>`. The name and purpose come only from fixed lists (such as `claude` and `testing`); anything else is ignored. No field takes text an agent writes, so an agent cannot send details about the person it works for, even by accident.

The full lists are in `src/privacy.js`.

## What is never collected

Your name, email, raw IP address, screen recordings, or anything that follows you across devices or other sites.

## Opting out

- **Opt out** on the [About](https://yahyapak.dev/about) page, or open any page with `?analytics_optout`: only page views are sent, nothing else (no clicks, timings, scroll depth or error reports).
- `?analytics_optout=all`: nothing is loaded or sent at all.
- `?analytics_optin` or **Opt in** on the About page: undo.

The choice is saved in this browser's local storage, so each browser and device has to opt out separately, and clearing site data resets it.

## Processors

- [PostHog](https://posthog.com/privacy), EU cloud (analytics)
- [Sentry](https://sentry.io/privacy/), EU region (error reports)
