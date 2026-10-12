# yahyapak.dev

My personal website: who I am, what I build and where I worked. Live at [yahyapak.dev](https://yahyapak.dev).

A quiet single column over an animated topographic contour background. Hovering a project (or scrolling past it on a phone) changes the terrain to that project's own style.

## Stack

- [Vite](https://vitejs.dev) and plain JavaScript, no framework
- One WebGL fragment shader for the topographic background
- Clean URLs (`/`, `/projects/<id>`, `/kudos`) with client-side routing

## Layout

```text
index.html   page shell; sets the theme before first paint
src/         pages, content (data.js), background renderer, styles
public/      app icons, diagrams, favicon
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

`dist/` is plain static files. The build also writes `404.html` as a copy of `index.html`, so hosts without rewrite rules still serve deep links like `/projects/havooch`.

## Credits

- The design was inspired by [Emil Kowalski](https://emilkowal.ski), [Mert Duzgun](https://mertbuilds.com) and [Abdullah Enes Gules](https://enesgules.com).
- The Skills page diagrams are by me, from [yahyabedirhan/skills](https://github.com/yahyabedirhan/skills) at commit `f03c580`.
- The topographic background now lives on as its own library: [yahyabedirhan/topography](https://github.com/yahyabedirhan/topography).
