# Agent instructions

yahyapak.dev, a personal website built with Astro as static pages and deployed to Cloudflare Workers.
`README.md` describes the layout, the build and the deploy.

## Rules

- Keep `src/data.js` as the one source of the projects, links, previous work, press and kudos. The pages read them from there.
- Run `npm run build` before you commit. It also checks that each page's HTML holds its content.
- `src/privacy.js`, `src/analytics.js` and `src/errors.js` are copied in `yahyabedirhan/shipyard` and `yahyabedirhan/topographic`. Make a change to them in all three.

## Commit style

Use lowercase multi-line commit messages:

```text
commit message

- explanation 1
- explanation 2
- explanation 3
```
