export const SITE = {
  name: "CatalystNeuro",
  url: "https://catalystneuro.com",
  defaultTitle: "CatalystNeuro — Neurophysiology Data & Software Solutions",
  titleTemplate: (t: string) => `${t} — CatalystNeuro`,
  description:
    "CatalystNeuro is a team of research software engineers for neuroscience. We convert lab data to NWB, publish it on DANDI, and build open-source software.",
  ogImage: "/social-card.png",
  email: "info@catalystneuro.com",
  github: "https://github.com/catalystneuro",
  linkedin: "https://www.linkedin.com/company/catalyst-neuro",
  // The 30-minute event itself, not the scheduling profile, which lists every
  // meeting length. /book-intro redirects to the same event.
  calendly: "https://calendly.com/ben-dichter/30min",
  address: ["CatalystNeuro", "150 E B St Lbby #1810 SMB#45673", "Casper, WY 82601"],
};

// The one name for the main call to action. Every button that leads to
// /consultation/ uses it, so the header, hero, and page title cannot drift.
export const CTA = { label: "Book a free consultation", href: "/consultation/" };

export const NAV = [
  {
    label: "About",
    href: "/about/",
    children: [
      { label: "About", href: "/about/" },
      { label: "Team", href: "/team/" },
      { label: "Openings", href: "/openings/" },
    ],
  },
  { label: "Work With Us", href: "/work-with-us/" },
  {
    label: "Software",
    href: "/nwb-software/",
    children: [
      { label: "NWB Software", href: "/nwb-software/" },
      { label: "Analysis Software", href: "/analysis-software/" },
      { label: "Data & AI Tools", href: "/data-and-ai-tools/" },
    ],
  },
  {
    label: "Portfolio",
    href: "/nwb-conversions/",
    children: [
      { label: "NWB Conversions", href: "/nwb-conversions/" },
      { label: "Funded Projects", href: "/funded-projects/" },
      { label: "Publications", href: "/publications/" },
    ],
  },
  {
    label: "Resources",
    href: "/guides/",
    children: [
      { label: "Guides", href: "/guides/" },
      { label: "Blog", href: "/blog/" },
      { label: "AI in Neuroscience", href: "/ai-in-neuroscience/" },
      { label: "LLM Cost Frontier", href: "https://llm-frontier.catalystneuro.com/" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

export const FOOTER = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Work With Us", href: "/work-with-us/" },
      { label: "Team", href: "/team/" },
      { label: "Careers", href: "/openings/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/guides/" },
      { label: "Blog", href: "/blog/" },
      { label: "NWB Software", href: "/nwb-software/" },
      { label: "Analysis Software", href: "/analysis-software/" },
      { label: "Funded Projects", href: "/funded-projects/" },
      { label: "LLM Cost Frontier", href: "https://llm-frontier.catalystneuro.com/", external: true },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/catalystneuro", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/catalyst-neuro", external: true },
      { label: "Blog RSS", href: "/rss.xml" },
    ],
  },
];
