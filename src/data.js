export const me = {
  name: 'Yahya Bedirhan Pak',
  title: 'Software Engineer',
};

// state: background slot (1 Swift Lab granite, 2 Havooch orange, 3 Shipyard green, 4 Skills violet, 5 Topography neutral)
// about: the page description; null shows a placeholder for Yahya to fill
export const projects = [
  { id: 'shipyard', name: 'Shipyard', state: 3, repo: 'https://github.com/yahyabedirhan/shipyard', icon: '/shipyard/shipyard.png', iconSide: true,
    iconAlt: "shipyard's logo: a white sailboat with folded sails on two waves, on a dark green graphite tile",
    line: 'Home for every project I ship',
    about: 'shipyard is my macOS menu bar app. It lists the pull requests, issues and workflow runs my coding agents open across my GitHub repositories, shows one count of what needs my attention, and lets agents ping me with a `shipyard ping` command.',
    // assets from yahyabedirhan/shipyard at 1f6e3e3
    diagrams: [
      { src: '/shipyard/architecture.png', width: 2000, height: 1080, raw: true,
        alt: 'Shipyard architecture: GitHub, agents on the Mac and on servers, and Notion notes feed the Shipyard menu bar app, whose refresh turns them into a menu bar panel and notifications.',
        caption: 'How shipyard works: four sources feed one refresh, which turns into a count in the menu bar and notifications.' },
    ],
    views: {
      title: 'Two ways to see the same work',
      groups: [
        { head: 'List', text: 'Every project in one column, open or folded.', shots: [
          { name: 'list', width: 800, height: 1008, alt: "shipyard's list layout: the Shipyard and Skills projects open with their pull requests, issues and runs, and Swift Lab and Havooch folded" }] },
        { head: 'Tabs', text: 'One tab per project, plus All.', shots: [
          { name: 'tabs-project', width: 800, height: 1190, alt: "shipyard's tabs layout on the Shipyard tab: pull requests, issues and workflow runs in groups" },
          { name: 'tabs-all', width: 800, height: 1408, alt: "shipyard's tabs layout on the All tab: every project's pull requests in one list, open ones first" }] },
      ],
    } },
  { id: 'havooch', name: 'Havooch', state: 2, repo: 'https://github.com/yahyabedirhan/havooch',
    // assets from yahyabedirhan/havooch at e75c17c; havooch-mark.svg is there for small inline uses
    icon: '/havooch/havooch-app-icon-256.png', icon2x: '/havooch/havooch-app-icon-512.png', iconLarge: true,
    iconAlt: "Havooch's app icon: the head of Havuç, an orange and white cat folded from paper, on a dark graphite rounded tile",
    line: 'Video player that you can watch with your agents',
    about: "Havooch is a video player for your Mac that lets you give feedback to a coding agent the way you'd give it to a person. You pause the video, point at the spot, and say what you want changed. Your agent gets each comment with the moment and the frame it's about, does the work, and answers you right beside the video.",
    hero: { src: '/havooch/thread-answered-and-queued-dark.png', width: 2720, height: 1460,
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
      { title: 'Havooch architecture', src: '/havooch/havooch-connect.png', width: 2000, height: 1024, raw: true,
        alt: 'How the Havooch app, the `havooch` command, your agent, the skill, your repository and your data connect',
        caption: 'Your agent reaches the app only through the havooch command, and the skill teaches it how.' },
    ],
    views: {
      title: 'In the app',
      groups: [{ wide: true, shots: [
        { src: '/havooch/version-switcher-dark.png', width: 2720, height: 1460, alt: 'A project on v3: the version switcher in the header, and the thread list grouped by version' },
        { src: '/havooch/side-by-side-dark.png', width: 2720, height: 1460, alt: 'Compare: v1 and v3 side by side on one playhead' },
        { src: '/havooch/connect-view-dark.png', width: 2720, height: 1460, alt: 'The Connect view: the command is linked, the skill is installed, and Codex is picked' }] }],
    } },
  { id: 'swift-lab', name: 'Swift Lab', state: 1, repo: 'https://github.com/yahyabedirhan/swift-lab', icon: '/icons/swift-lab.webp',
    line: 'Native components, build without Xcode', about: null },
  { id: 'skills', name: 'Skills', state: 4, repo: 'https://github.com/yahyabedirhan/skills', icon: '/icons/skills.webp',
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
  { id: 'topography', name: 'Topography', state: 5, repo: 'https://github.com/yahyabedirhan/topography', icon: '/icons/topography.webp',
    line: 'Animated topographic backgrounds for the web', about: null },
];

// topo style per background state (0-based style index):
// idle T1, Swift Lab T2, Havooch T8, Shipyard T4, Skills T5, Topography T6 (neutral), Kudos T12 dunes
export const styleMap = [0, 1, 7, 3, 4, 5, 11];

export const experience = [
  { name: 'Polymet', role: 'Founding Engineer', href: 'https://polymet.ai' },
  { name: 'Zeplin', role: 'Software Engineer', href: 'https://zeplin.io' },
];

// label: Yahya's answer heading in the article; title: the article's own title
export const press = [
  { outlet: 'Forbes', label: 'Eliminating Specs Outside The Codebase', title: 'The New Management Practices AI Demands From Tech Leaders', href: 'https://www.forbes.com/councils/forbestechcouncil/2026/04/27/the-new-management-practices-ai-demands-from-tech-leaders/' },
  { outlet: 'Forbes', label: 'Open-Source Useful Tools', title: 'B2B Tech: How Brands Can Build Engaging, Supportive Communities', href: 'https://www.forbes.com/councils/forbestechcouncil/2026/04/15/b2b-tech-how-brands-can-build-engaging-supportive-communities/' },
];

export const links = [
  { id: 'x', label: 'X', href: 'https://x.com/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/yahyabedirhan' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/yahyabedirhanpak' },
  { id: 'email', label: 'Email', href: 'mailto:hello@example.com' },
];

export const kudos = {
  intro: 'The design of this site was inspired by their work. Thank you.',
  people: [
    { name: 'Emil Kowalski', site: 'https://emilkowal.ski', x: 'https://x.com/emilkowalski' },
    { name: 'Mert Duzgun', site: 'https://mertbuilds.com', x: 'https://x.com/mertduzgun' },
    { name: 'Abdullah Enes Gules', site: 'https://enesgules.com', x: 'https://x.com/abdushbag' },
  ],
};
