export const SITE = {
  name: "CatalystNeuro",
  url: "https://catalystneuro.com",
  defaultTitle: "CatalystNeuro — Neurophysiology Data & Software Solutions",
  titleTemplate: (t: string) => `${t} — CatalystNeuro`,
  description:
    "CatalystNeuro empowers neuroscience labs with data standardization, NWB conversions, spike sorting pipelines, and open-source software tools for neurophysiology research.",
  ogImage: "/social-card.png",
  email: "info@catalystneuro.com",
  github: "https://github.com/catalystneuro",
  linkedin: "https://www.linkedin.com/company/catalyst-neuro",
  calendly: "https://calendly.com/ben-dichter",
  address: ["CatalystNeuro", "150 E B St Lbby #1810 SMB#45673", "Casper, WY 82601"],
};

export const NAV = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Openings", href: "/openings" },
    ],
  },
  {
    label: "Software",
    href: "/nwb-software",
    children: [
      { label: "NWB Software", href: "/nwb-software" },
      { label: "Analysis Software", href: "/analysis-software" },
      { label: "Guides", href: "/guides" },
    ],
  },
  {
    label: "Portfolio",
    href: "/nwb-conversions",
    children: [
      { label: "NWB Conversions", href: "/nwb-conversions" },
      { label: "Funded Projects", href: "/funded-projects" },
      { label: "Publications", href: "/publications" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/openings" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Funded Projects", href: "/funded-projects" },
      { label: "NWB Software", href: "/nwb-software" },
      { label: "Analysis Software", href: "/analysis-software" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/catalystneuro", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/catalyst-neuro", external: true },
    ],
  },
];
