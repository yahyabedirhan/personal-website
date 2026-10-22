export const me = {
  name: 'Yahya Bedirhan Pak',
  title: 'Software Engineer',
};

// state: background slot (1 Havooch orange, 2 Shipyard green, 3 Skills violet, 4 topographic neutral; 0 is idle and 5 is Kudos)
// about: the page description; null shows a placeholder for Yahya to fill
export const projects = [
  { id: 'shipyard', name: 'shipyard', state: 2, repo: 'https://github.com/yahyabedirhan/shipyard', icon: '/shipyard/shipyard.png', iconFull: true,
    iconAlt: "shipyard's logo: a white sailboat with folded sails on two waves, on a dark graphite tile",
    line: 'Menu bar app for keeping up with your projects',
    viewsFirst: true, // screenshots, then the diagrams
    // assets from yahyabedirhan/shipyard main at 619c8fc: logo and screenshots, which show made-up demo content;
    // hero.webp composed from the landing's two screenshots; the diagrams exported from the docs site at 2x
    about: 'A macOS menu bar app for keeping up with your projects while your agents work. Your pull requests, issues, workflow runs, pings from your agents and notes, grouped by project, in one list in the menu bar.',
    details: 'It notifies you when something happens, and your agents can ping you when they need you. They also edit its settings for you with the shipyard skill. Install it from the [site](https://shipyard.yahyapak.dev).',
    links: [
      { label: 'Site', href: 'https://shipyard.yahyapak.dev', icon: 'site', main: true },
      { label: 'Docs', href: 'https://shipyard.yahyapak.dev/docs', icon: 'docs', main: true },
      { label: 'GitHub', href: 'https://github.com/yahyabedirhan/shipyard', icon: 'github' },
      { label: 'Releases', href: 'https://github.com/yahyabedirhan/shipyard/releases', icon: 'download' },
    ],
    hero: { src: '/shipyard/hero.webp', width: 2400, height: 1500,
      alt: 'The shipyard panel twice, side by side: in dark mode in the tabs layout on the shipyard tab, and in the light Paper theme in the list layout, both showing pull requests, pings from agents, issues, runs and notes' },
    diagrams: [
      { title: 'How shipyard works', src: '/shipyard/how-it-works.png', width: 1280, height: 896, raw: true,
        alt: "How shipyard works: GitHub, your agents' pings from this Mac and from other machines, and your Notion notes feed one refresh in the app, which turns them into the menu bar's number, the panel's projects and macOS notifications.",
        caption: 'Four sources feed one refresh, which turns into one number in the menu bar, your projects in the panel and notifications.' },
      { title: 'The configuration loop', src: '/shipyard/config-loop.png', width: 1280, height: 600, raw: true,
        alt: 'The configuration loop: you ask your agent for a change, it edits config.toml with the shipyard skill, the app rereads the file on save and writes its verdict to config-status.json, and the agent reads the verdict and fixes any problem it lists.',
        caption: 'You ask in your own words, your agent edits the file, and the app tells it whether the change worked.' },
      { title: 'Pings across machines', src: '/shipyard/pings.png', width: 1280, height: 1064, raw: true,
        alt: 'Pings across machines: an agent on this Mac sends a ping into the ping store, and an agent on another machine sends one into the herdr-shipyard plugin, which the Mac polls through Herdr every 30 seconds. The app lists each ping, notifies, and runs its action when you click it.',
        caption: 'Agents on this Mac and on your other machines ping you, and each ping lists in the panel with a notification.' },
    ],
    views: {
      title: 'In the app',
      groups: [
        { head: 'Layouts', text: 'Every project in one list, or one project at a time in tabs.', shots: [
          { src: '/shipyard/panel-list-dark.png', width: 800, height: 1268, alt: 'The list layout in dark mode: the shipyard, havooch and topographic projects, each grouped by repository, with their runs, pull requests, pings and notes' },
          { src: '/shipyard/panel-tabs-dark.png', width: 800, height: 954, alt: 'The tabs layout on the havooch tab: one pull request, one issue, a running and a finished workflow run, and one note' }] },
        { head: 'Review queue', text: 'A ready-made preset that lists only the pull requests waiting on your review, in any repository.', shots: [
          { src: '/shipyard/preset-review-queue-dark.png', width: 800, height: 380, alt: 'The review-queue preset: two pull requests waiting on your review, one in yahyabedirhan/shipyard and one in yahyabedirhan/topographic' }] },
      ],
    } },
  { id: 'havooch', name: 'havooch', state: 1, repo: 'https://github.com/yahyabedirhan/havooch',
    // assets from yahyabedirhan/havooch at 0e606c3; havooch-mark.svg is there for small inline uses
    icon: '/havooch/havooch-app-icon-256.png', icon2x: '/havooch/havooch-app-icon-512.png',
    iconAlt: "Havooch's app icon: the head of Havuç, an orange and white cat folded from paper, on a dark graphite rounded tile",
    line: 'Video player for giving feedback to your agents',
    about: "Havooch is a video player for your Mac that lets you give feedback to a coding agent the way you'd give it to a person. You pause the video, point at the spot, and say what you want changed. Your agent gets each comment with the moment and the frame it's about, does the work, and answers you right beside the video.",
    hero: { src: '/havooch/thread-answered-and-queued-graphite.png', width: 2720, height: 1460,
      alt: 'Havooch with a project open: the agent answered thread #2, and a follow-up waits in the queue' },
    diagrams: [
      { title: 'Review loop', src: '/havooch/havooch-review-loop.png', width: 2000, height: 1120, raw: true,
        alt: 'The review loop: watch, pause and point, send, your agent works, it answers, and a new version joins your project',
        caption: 'Each round leaves a new version in your project, so you can see what changed.' },
      { title: 'Comment anatomy', src: '/havooch/havooch-comment-anatomy.png', width: 2000, height: 1240, raw: true,
        alt: 'One comment taken apart: your words, the moment, the region you drew, the frame and the transcript around it',
        caption: 'Your agent gets what you saw, not only what you typed.' },
      { title: 'Feedback session', src: '/havooch/havooch-feedback-session.png', width: 2000, height: 1040, raw: true,
        alt: 'One feedback session: confidence dips when you spot a problem, rises when you point at it, and peaks when you read the answer',
        caption: 'One session, from the first doubt to the answer on your thread.' },
      { title: 'Havooch architecture', src: '/havooch/havooch-architecture.png', width: 2000, height: 1024, raw: true,
        alt: 'How the Havooch app, the `havooch` command, your agent, the skill, your repository and your data connect',
        caption: 'Your agent reaches the app only through the havooch command, and the skill teaches it how.' },
    ],
    views: {
      title: 'In the app',
      groups: [{ wide: true, shots: [
        { src: '/havooch/version-switcher-graphite.png', width: 2720, height: 1460, alt: 'A project on v3: the version switcher in the header, and the thread list grouped by version' },
        { src: '/havooch/side-by-side-graphite.png', width: 2720, height: 1460, alt: 'Compare: v1 and v3 side by side on one playhead' },
        { src: '/havooch/connect-view-graphite.png', width: 2720, height: 1460, alt: 'The Connect view: the command is linked, the skill is installed, and Codex is picked' }] }],
    } },
  { id: 'skills', name: 'skills', state: 3, repo: 'https://github.com/yahyabedirhan/skills', icon: '/icons/skills.webp',
    line: 'Agent skills I use across projects',
    about: "Agent skills I use across projects: my own, and forks of other people's that I've changed. They come in five families, and the main one, the effort workflow, takes a feature from an idea to a merged pull request: a thinking session decides what to build, and a fresh orchestrator builds it. They work with Claude Code, Codex and any agent the skills CLI supports.",
    // diagrams by Yahya, from yahyabedirhan/skills at f03c580 (assets/images/diagrams/*-diagram.png)
    diagrams: [
      { src: '/diagrams/skill-families.webp', width: 2560, height: 1440, caption: 'Skill families: five families, from the foundation up.',
        alt: 'Five skill families stacked from the foundation up: agent setup, communication style and design frameworks at the base, with the effort workflow and daily workflows on top, each listing its skills' },
      { src: '/diagrams/effort-workflow.webp', width: 2560, height: 1440, caption: 'Effort workflow: how one feature goes from an idea to a merged pull request.',
        alt: 'Swimlanes for you, the thinking session, the orchestrator and sub-agents across five phases: start, thinking, handover, build and settle, from init-effort to settle-effort after you approve the pull request' },
      { src: '/diagrams/build-loop.webp', width: 2560, height: 1200, caption: 'Build loop: how an orchestrator turns tickets into one pull request.',
        alt: 'A flowchart: read the effort, show the plan, delegate unblocked tickets in parallel, integrate the batch and repeat while tickets are left, then review the whole branch, open the pull request and report' },
    ] },
  { id: 'topographic', name: 'topographic', state: 4, repo: 'https://github.com/yahyabedirhan/topographic',
    viewsFirst: true, // screenshots, then the diagrams
    // assets from yahyabedirhan/topographic main at d0a5ea3: logo, screenshots and diagrams
    icon: '/topographic/topographic.png', iconAlt: "The topographic logo: three contour rings on paper folded along one diagonal crease, on a graphite tile",
    line: 'Topographic terrain, rendered live with WebGL',
    about: 'Topographic terrain rendered with WebGL. Generate a land or turn a real place into a topographic terrain.',
    // shown under the hero, above the examples
    details: 'Use it in plain HTML, in JavaScript or in React. In the [playground](https://topographic.yahyapak.dev/), pick a real place or shape a land, then copy the code, a PNG image or a video.',
    // icon: a key of icons in icons.js; main: shown brighter, as the first places to go
    links: [
      { label: 'Playground', href: 'https://topographic.yahyapak.dev/', icon: 'playground', main: true },
      { label: 'Docs', href: 'https://topographic.yahyapak.dev/docs', icon: 'docs', main: true },
      { label: 'topographic', href: 'https://www.npmjs.com/package/topographic', icon: 'npm', track: 'npm-topographic' },
      { label: 'topographic-react', href: 'https://www.npmjs.com/package/topographic-react', icon: 'npm', track: 'npm-topographic-react' },
      { label: 'GitHub', href: 'https://github.com/yahyabedirhan/topographic', icon: 'github' },
    ],
    hero: { src: '/topographic/hero.webp', width: 2400, height: 1350,
      alt: 'Fine granite in 3D: a summit ringed by pale contour lines, gullies fanning out to a dark horizon' },
    diagrams: [
      { title: 'Library architecture', src: '/topographic/library-architecture.png', width: 1920, height: 1362, raw: true,
        alt: 'How topographic fits together: the web component, the React component and the playground call one public API, which also takes an optional heightfield. Settings resolve from the params table, styles and presets, and one WebGL renderer draws them as a 2D contour shader or a 3D terrain pass, whose frames record() encodes as video.',
        caption: 'The web component, the React component and the [playground](https://topographic.yahyapak.dev/) all use the same code. One renderer draws both 2D and 3D.' },
      { title: 'One terrain, two views', src: '/topographic/terrain-two-views.png', width: 1920, height: 1250, raw: true,
        alt: 'One terrain, two views: settings, or an optional heightfield, feed one shared contour field. In 2D a fragment shader paints its lines on every pixel. In 3D a mesh is lifted by the same field, painted with the same lines and seen through a moving camera.',
        caption: '2D and 3D use the same land and the same lines. 3D only adds height and a camera.' },
      { title: 'From a place to a terrain', src: '/topographic/real-place-pipeline.png', width: 1920, height: 1218, raw: true,
        alt: 'How a real place becomes a terrain in the playground: the Map popover gives a bounding box, a worker fetches Terrarium elevation tiles, stitches and resamples them to a 256 by 256 grid, scales the relief and smooths it, and the region hook hands the heightfield to the renderer with setHeightfield().',
        caption: 'The [playground](https://topographic.yahyapak.dev/) downloads height data for the area, smooths it and turns it into a grid of heights. setHeightfield() then draws it.' },
    ],
    views: {
      title: 'Examples',
      groups: [
        { head: 'Real places', text: 'Turn a real place into a terrain, from real elevation data. In the [playground](https://topographic.yahyapak.dev/), pick a famous place or frame any area on the map.', shots: [
          { src: '/topographic/place-istanbul.webp', width: 640, height: 400, alt: 'Istanbul, with the Bosphorus between the two shores' },
          { src: '/topographic/place-geirangerfjord.webp', width: 640, height: 400, alt: 'Geirangerfjord between steep walls' },
          { src: '/topographic/place-grand-canyon.webp', width: 640, height: 400, alt: 'The Grand Canyon from rim to rim' },
          { src: '/topographic/place-fuji.webp', width: 640, height: 400, alt: 'Mount Fuji, the cone and its lakes' },
          { src: '/topographic/place-everest.webp', width: 640, height: 400, alt: 'Everest above the Khumbu valley' },
          { src: '/topographic/place-matterhorn.webp', width: 640, height: 400, alt: 'The Matterhorn above Zermatt' }] },
        { head: 'Looks', text: 'Or generate a land of your own. You change its shape, the lines, the colours and the motion, and the same settings always draw the same land.', shots: [
          { src: '/topographic/look-survey-ridge-2d.webp', width: 640, height: 400, alt: 'Survey ridge: pale lines around a long ridge on dark paper' },
          { src: '/topographic/look-sea-dunes-2d.webp', width: 640, height: 400, alt: 'Sea dunes: blue-green dune lines on deep teal' },
          { src: '/topographic/look-stepped-petals-2d.webp', width: 640, height: 400, alt: 'Stepped petals: plum lines on pale pink paper' }] },
        { head: '3D', text: 'Every terrain can also be shown in 3D, and you can view it from any angle.', shots: [
          { src: '/topographic/look-night-flower-3d.webp', width: 640, height: 400, alt: 'Night flower in 3D: blue rings rising to a soft dome' },
          { src: '/topographic/look-terraces-3d.webp', width: 640, height: 400, alt: 'Terraces in 3D: amber lines stepping up a hill' },
          { src: '/topographic/look-rocky-spine-3d.webp', width: 640, height: 400, alt: 'Rocky spine in 3D: brown lines over a rough ridge on light paper' }] },
        { head: 'Try it: [Playground](https://topographic.yahyapak.dev/)', text: 'In the [playground](https://topographic.yahyapak.dev/), choose a real place under Map or a look at the bottom, change the settings under Tune, and copy the code, a PNG image or a video under Export.', wide: true, shots: [
          { src: '/topographic/playground-dark.webp', width: 1440, height: 900, alt: 'The playground in dark mode: Istanbul in 3D behind the page, the dock of looks along the bottom, the controls at the top right and a minimap of the place in the corner' },
          { src: '/topographic/map-popover-dark.webp', width: 1440, height: 900, alt: 'The Map popover over Istanbul: a dark map with a white frame around the city, the place menu above, and Clear and Applied below' }] },
      ],
    } },
];

// the background's scenes from the topographic library, one per background state:
// 0 idle, 1 Havooch, 2 Shipyard, 3 Skills, 4 topographic (neutral), 5 Kudos.
// A scene without ink uses the theme's own line colour.
export const bgScenes = [
  { shape: 'drifting-lobes' },
  { shape: 'long-ridge', ink: 'rgb(98% 50% 13%)' },
  { shape: 'five-petals', ink: 'rgb(16% 66% 40%)' },
  { shape: 'seed-pod', ink: 'rgb(47% 38% 98%)' },
  { shape: 'gentle-summit' },
  { shape: 'dunes' },
];

export const previously = [
  { name: 'Polymet', role: 'Founding Engineer', href: 'https://polymet.ai' },
  { name: 'Zeplin', role: 'Software Engineer', href: 'https://zeplin.io' },
];

// label: the row text, a short form of the article title; title: the article's own title
export const press = [
  { outlet: 'Forbes', label: 'Management Practices AI Demands From Tech Leaders', title: 'The New Management Practices AI Demands From Tech Leaders', href: 'https://www.forbes.com/councils/forbestechcouncil/2026/04/27/the-new-management-practices-ai-demands-from-tech-leaders/' },
  { outlet: 'Forbes', label: 'How Brands Can Build Engaging, Supportive Communities', title: 'B2B Tech: How Brands Can Build Engaging, Supportive Communities', href: 'https://www.forbes.com/councils/forbestechcouncil/2026/04/15/b2b-tech-how-brands-can-build-engaging-supportive-communities/' },
];

export const links = [
  { id: 'x', label: 'X', href: 'https://x.com/yahyabedirhan' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/yahyabedirhan' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/yahyabedirhanpak' },
  { id: 'email', label: 'Email', href: 'mailto:y.bedirhanpak@gmail.com' },
];

export const kudos = {
  intro: 'The design of this site was inspired by their work. Thank you.',
  people: [
    { name: 'Emil Kowalski', site: 'https://emilkowal.ski', x: 'https://x.com/emilkowalski' },
    { name: 'Mert Duzgun', site: 'https://mertbuilds.com', x: 'https://x.com/mertduzgun' },
    { name: 'Abdullah Enes Gules', site: 'https://enesgules.com', x: 'https://x.com/abdushbag' },
  ],
};
