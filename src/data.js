export const me = {
  name: 'Yahya Bedirhan Pak',
  title: 'Software Engineer',
};

// state: background slot (1 Havooch orange, 2 Shipyard green, 3 Skills violet, 4 topographic neutral)
// about: the page description; null shows a placeholder for Yahya to fill
export const projects = [
  { id: 'shipyard', name: 'Shipyard', state: 2, repo: 'https://github.com/yahyabedirhan/shipyard', icon: '/shipyard/shipyard.png',
    iconAlt: "shipyard's logo: a white sailboat with folded sails on two waves, on a dark graphite tile",
    line: "Menu bar app for your agents' pull requests",
    about: 'Shipyard is a macOS menu bar app for seeing and reviewing the pull requests your coding agents open for you. It lists pull requests, issues and workflow runs across your GitHub repositories and shows one count of what needs you: new, changed, waiting on your review or failing checks. Your agents can ping you with the `shipyard ping` command, and one TOML file, which you or your agents edit, sets what it shows.',
    // assets from yahyabedirhan/shipyard at 1fe2b4a
    diagrams: [
      { src: '/shipyard/architecture.png', width: 2000, height: 1080, raw: true,
        alt: 'Shipyard architecture: GitHub, agents on the Mac and on servers, and Notion notes feed the Shipyard menu bar app, whose refresh turns them into a menu bar panel and notifications.',
        caption: 'How shipyard works: four sources feed one refresh, which turns into a count in the menu bar and notifications.' },
    ],
    views: {
      title: 'Layouts',
      groups: [
        { head: 'List layout', text: 'All projects in one column; each project can be expanded or collapsed.', shots: [
          { name: 'list', width: 800, height: 1008, alt: "shipyard's list layout: the Shipyard and Skills projects open with their pull requests, issues and runs, and Swift Lab and Havooch folded" }] },
        { head: 'Tabs layout', text: 'One tab per project, plus an All tab.', shots: [
          { name: 'tabs-project', width: 800, height: 1190, alt: "shipyard's tabs layout on the Shipyard tab: pull requests, issues and workflow runs in groups" },
          { name: 'tabs-all', width: 800, height: 1408, alt: "shipyard's tabs layout on the All tab: every project's pull requests in one list, open ones first" }] },
      ],
    } },
  { id: 'havooch', name: 'Havooch', state: 1, repo: 'https://github.com/yahyabedirhan/havooch',
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
  { id: 'skills', name: 'Skills', state: 3, repo: 'https://github.com/yahyabedirhan/skills', icon: '/icons/skills.webp',
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
  { id: 'topography', name: 'topographic', state: 4, repo: 'https://github.com/yahyabedirhan/topographic',
    viewsFirst: true, // screenshots, then the diagrams
    // assets from yahyabedirhan/topographic: logo at 997bc7a, styles.png at a856f06;
    // the other screenshots at a1ea2d8 and the diagrams at a8d3579, on its readme-refresh branch
    icon: '/topography/topography.png', iconAlt: "The topographic logo: three contour rings on paper folded along one diagonal crease, on a graphite tile",
    line: 'Animated topographic backgrounds for the web',
    about: "topographic is a JavaScript library that draws topographic backgrounds: animated contour lines, like those on a topographic map, behind a web page. It draws them as a flat 2D map, or as a 3D terrain that a camera moves around, and `record()` saves the 3D view as an MP4 or WebM video. `setHeightfield()` takes your own elevation grid, so it can draw a real place. You set the lines, the terrain, the motion and the colours, and it drops in as a `<topographic-bg>` web component, a React component or one JavaScript call. In the playground, people, and agents through WebMCP and llms.txt, set up a background and copy the code. The 3D view, `record()` and `setHeightfield()` ship in the npm packages from 0.2.0. The place picker for real places is still a dev-only prototype, not in the public playground.",
    links: [
      { label: 'Playground', href: 'https://yahyabedirhan.github.io/topographic/' },
      { label: 'npm: topographic', href: 'https://www.npmjs.com/package/topographic' },
      { label: 'npm: topographic-react', href: 'https://www.npmjs.com/package/topographic-react' },
    ],
    hero: { src: '/topography/playground-dark.png', width: 1440, height: 900,
      alt: 'The topographic playground in dark mode: contour lines drift behind the page, and the settings panel sits on the right' },
    diagrams: [
      { title: 'Library architecture', src: '/topography/library-architecture.png', width: 1920, height: 1360, raw: true,
        alt: 'How topographic fits together: the web component, the React component and the playground call one public API, which also takes an optional heightfield. Settings resolve from the params table, styles and presets, and one WebGL renderer draws them as a 2D contour shader or a 3D terrain pass, whose frames record() encodes as video.',
        caption: 'Every wrapper calls one API, and one renderer draws 2D or 3D from the same resolved settings. record() turns the 3D view into an MP4 or WebM clip.' },
      { title: 'One terrain, two views', src: '/topography/terrain-two-views.png', width: 1920, height: 1248, raw: true,
        alt: 'One terrain, two views: settings, or an optional heightfield, feed one shared contour field. In 2D a fragment shader paints its lines on every pixel. In 3D a mesh is lifted by the same field, painted with the same lines and seen through a moving camera.',
        caption: 'The 2D map and the 3D terrain run the same GLSL contour field and line painter. In 3D the field also lifts a mesh, and a camera moves around it.' },
      { title: 'From a place to a terrain', src: '/topography/real-place-pipeline.png', width: 1920, height: 1216, raw: true,
        alt: 'How a real place becomes a terrain in the prototype: the map frame gives a bounding box, a worker fetches Terrarium elevation tiles, stitches and resamples them to a 256 by 256 grid, scales the relief and smooths it, and the region hook hands the heightfield to the renderer with setHeightfield().',
        caption: 'In the dev-only prototype, a worker turns the framed map area into a smoothed 0..1 elevation grid. setHeightfield() then draws it as the 2D map or the 3D terrain.' },
    ],
    views: {
      title: 'In the browser',
      groups: [
        { head: '2D and 3D', text: 'The same Long ridge style and seed, as a flat map and as a 3D terrain.', shots: [
          { src: '/topography/long-ridge-2d-dark.png', width: 1440, height: 900, alt: 'The Long ridge style in 2D, dark mode: flat contour lines curve around one long ridge' },
          { src: '/topography/long-ridge-3d-dark.png', width: 1440, height: 900, alt: 'The same Long ridge style and seed in 3D: the contour lines wrap a raised ridge on a layered block' }] },
        { head: 'Video export', text: 'record() saves the 3D view as a video. This loop was made with it.', wide: true, shots: [
          { src: '/topography/long-ridge-3d-orbit.webp', width: 720, height: 406, alt: 'The camera orbits the Long ridge block in 3D, dark mode' }] },
        { head: 'Real places', text: 'In the dev-only prototype, you frame a place on a map, and its real elevation becomes the terrain. The public playground does not have the place picker yet.', shots: [
          { src: '/topography/place-picker-dark.png', width: 1440, height: 900, alt: 'The place picker: a dark map of Istanbul with a white frame around the region to draw, city shortcuts above, and relief and smoothing options below' },
          { name: 'istanbul-3d', width: 1440, height: 900, alt: 'Istanbul in 3D: real elevation drawn as contour lines, with the Bosphorus cutting the city in two' }] },
        { head: 'Styles', text: 'The seven styles, three presets and six seed variants.', wide: true, shots: [
          { src: '/topography/styles.png', width: 1920, height: 1260, alt: '16 dark tiles: the seven terrain styles, three presets and six seed variants, each labelled' }] },
      ],
    } },
];

// topo style per background state (0-based style index):
// idle T1, Havooch T8, Shipyard T4, Skills T5, topographic T6 (neutral), Kudos T12 dunes
export const styleMap = [0, 7, 3, 4, 5, 11];

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
