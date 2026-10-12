export const me = {
  name: 'Yahya Bedirhan Pak',
  title: 'Software Engineer',
};

// state: background slot (1 Swift Lab granite, 2 Havooch orange, 3 Shipyard green, 4 Skills violet, 5 Topography neutral)
// about: placeholder text for Yahya to replace
export const projects = [
  { id: 'shipyard', name: 'Shipyard', state: 3, repo: 'https://github.com/yahyabedirhan/shipyard', icon: '/icons/shipyard.webp',
    line: 'Home for every project I ship', about: 'Description coming soon. [Yahya to fill]' },
  { id: 'havooch', name: 'Havooch', state: 2, repo: 'https://github.com/yahyabedirhan/havooch', icon: '/icons/havooch.webp',
    line: 'Video player that you can watch with your agents', about: 'Description coming soon. [Yahya to fill]' },
  { id: 'swift-lab', name: 'Swift Lab', state: 1, repo: 'https://github.com/yahyabedirhan/swift-lab', icon: '/icons/swift-lab.webp',
    line: 'Native components, build without Xcode', about: 'Description coming soon. [Yahya to fill]' },
  { id: 'skills', name: 'Skills', state: 4, repo: 'https://github.com/yahyabedirhan/skills', icon: '/icons/skills.webp',
    line: 'Agent skills I use across projects', about: 'Description coming soon. [Yahya to fill]',
    diagrams: [
      { src: '/diagrams/skill-families', minWidth: 620, alt: 'The five skill families and the skills in each' },
      { src: '/diagrams/effort-lifecycle', alt: 'The effort lifecycle from init-effort to settle-effort' },
    ] },
  { id: 'topography', name: 'Topography', state: 5, repo: 'https://github.com/yahyabedirhan/topography', icon: '/icons/topography.webp',
    line: 'Animated topographic backgrounds for the web', about: 'Description coming soon. [Yahya to fill]' },
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
