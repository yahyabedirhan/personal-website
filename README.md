<p align="center"><img src="assets/images/logo/yahyapak-logo-512.png" width="128" alt="yahyapak.dev's logo: three white piano keys folded from paper, the middle one pressed, on a dark graphite tile"></p>

<h1 align="center">yahyapak.dev</h1>

## What is yahyapak.dev

It's my personal website. I'm Yahya Bedirhan Pak, a software engineer, and this is where I keep who I am, what I build and where I've worked. It lives at [yahyapak.dev](https://yahyapak.dev).

Most of what I build these days helps me work with coding agents: [shipyard](https://github.com/yahyabedirhan/shipyard), a menu bar app for my agents' pull requests; [Havooch](https://github.com/yahyabedirhan/havooch), a video player for giving them feedback; my [skills](https://github.com/yahyabedirhan/skills); and Swift Lab, where I prototype Mac UI. And [topography](https://github.com/yahyabedirhan/topography), the contour background you see behind the site.

The site is a quiet single column over that animated topographic background. Hovering a project (or scrolling past it on a phone) changes the terrain to that project's own style.

## Stack

- [Vite](https://vitejs.dev) and plain JavaScript, no framework
- One WebGL fragment shader for the topographic background
- Clean URLs (`/`, `/projects/<id>`, `/kudos`) with client-side routing

## Layout

```text
index.html      page shell; sets the theme before first paint
src/            pages, content (data.js), background renderer, styles
public/         site logo, app icons, diagrams, favicon
assets/         images for this README
wrangler.jsonc  Cloudflare Workers deploy settings
```

Design prototypes live on the `prototype/ui-variants` branch and never ship.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # static output in dist/
npm run preview   # serve the build
```

To open the dev server from another device, pass `--host`; Vite may also need that hostname in `server.allowedHosts`.

## Deploy

The site runs on Cloudflare Workers as static assets. On every push to `main`, Workers Builds runs `npm run build` and then `npx wrangler deploy`, which serves `dist/` at [yahyapak.dev](https://yahyapak.dev). `wrangler.jsonc` holds the settings: `not_found_handling: "single-page-application"` serves `index.html` for every unknown path, so deep links like `/projects/havooch` work.

## Credits

- The design was inspired by [Emil Kowalski](https://emilkowal.ski), [Mert Duzgun](https://mertbuilds.com) and [Abdullah Enes Gules](https://enesgules.com).
- The Skills page diagrams are by me, from [yahyabedirhan/skills](https://github.com/yahyabedirhan/skills) at commit `f03c580`.
- The topographic background now lives on as its own library: [yahyabedirhan/topography](https://github.com/yahyabedirhan/topography).
