// Content that lived hardcoded in the old site's components, externalized here.

export const HERO = {
  eyebrow: "Open-source neurophysiology tools",
  titleTop: "Empowering neurophysiology data",
  titleAccent: "for open science",
  body: "We help research labs standardize, share, and publish their neurophysiology data through custom software solutions and expert consulting.",
  primary: { label: "Request a consultation", href: "/consultation" },
  secondary: { label: "See conversion work", href: "/nwb-conversions" },
  pipeline: [
    { step: "01", title: "Standardize", copy: "Convert complex lab formats to NWB" },
    { step: "02", title: "Validate", copy: "Build tested, documented data pipelines" },
    { step: "03", title: "Publish", copy: "Prepare datasets for DANDI and reuse" },
  ],
};

// STATS are derived from the content collections at build time — see
// src/pages/index.astro. Only the labels live here.
export const STAT_LABELS = {
  labs: "Research labs supported",
  projects: "Grant-funded projects",
  institutions: "Partner institutions",
};

export const WHY = {
  eyebrow: "Why CatalystNeuro",
  title: "Research software engineers for neuroscience",
  body: "We bridge the gap between academic research and professional software engineering. Our team combines deep neuroscience domain expertise with production-grade development practices, delivering solutions that are both scientifically rigorous and built to last.",
  cards: [
    {
      title: "Domain experts",
      copy: "Our engineers have published research and understand the nuances of neurophysiology data.",
    },
    {
      title: "100% open source",
      copy: "No vendor lock-in. Every tool we build is open source and belongs to the community.",
    },
    {
      title: "Production quality",
      copy: "Professional testing, documentation, and long-term maintainability. Not just research prototypes.",
    },
  ],
};

export const SERVICES = {
  eyebrow: "What we do",
  title: "Our services",
  body: "CatalystNeuro has worked successfully with diverse scientific research groups in a variety of capacities. All work we do is open source, so our team can fit seamlessly with research groups without worry of expensive licensing fees or vendor lock-in.",
  items: [
    {
      title: "Open data management",
      copy: "Convert your data to Neurodata Without Borders (NWB) and publish on the DANDI Archive.",
      link: { label: "View our work", href: "/nwb-conversions" },
      features: [
        "Open-source conversion pipeline",
        "Compliance with government and foundation funders",
        "Includes notebooks demonstrating data use",
        "Experience with 60+ labs",
      ],
    },
    {
      title: "Software engineering",
      copy: "Integrate existing analysis, visualization, and data management tools with open data via NWB and DANDI.",
      link: { label: "View our work", href: "/analysis-software" },
      features: [
        "Professionalize software through packaging, testing, and documentation",
        "Create reproducible workflows for data processing and analysis",
      ],
    },
    {
      title: "AI in neuroscience",
      copy: "Leverage AI and machine learning to accelerate neuroscience research.",
      link: { label: "Get started", href: "/contact" },
      features: [
        "Develop agents to automate processing steps",
        "Data curation for building neural foundation models",
        "Training in agentic code generation",
      ],
    },
  ],
  capabilities: ["Cloud integration", "Team training", "Data analytics", "Open source"],
};

export const PARTNERS = {
  title: "Backed and trusted by",
  logos: [
    { name: "NIH", src: "/images/sponsors/nih_logo.png" },
    { name: "Allen Institute", src: "/images/sponsors/allen_institute_logo.jpeg" },
    { name: "Kavli Foundation", src: "/images/sponsors/kavli_foundation_logo.png" },
    { name: "Michael J. Fox Foundation", src: "/images/sponsors/MJFF_logo.png" },
    { name: "Simons Foundation", src: "/images/sponsors/simons_foundation_logo.avif" },
    { name: "MIT", src: "/images/sponsors/MIT_logo.png" },
  ],
};

const BIG_LOGOS = new Set([
  "Mount Sinai",
  "Allen Institute",
  "Karolinska Institutet",
  "Salk Institute",
  "Baylor College of Medicine",
]);

export const INSTITUTIONS = [
  ["Stanford", "stanford_logo.png"],
  ["Harvard", "harvard_logo.png"],
  ["MIT", "mit_logo.png"],
  ["Princeton", "princeton_logo.png"],
  ["Yale", "yale_logo.png"],
  ["Columbia", "columbia_logo.png"],
  ["NYU", "nyu_logo.png"],
  ["Berkeley", "berkeley_logo.png"],
  ["Northwestern", "northwestern_logo.png"],
  ["UCSF", "ucsf_logo.png"],
  ["Johns Hopkins", "jhu_logo.png"],
  ["Salk Institute", "salk_logo.png"],
  ["University of Washington", "washington_logo.png"],
  ["University of Pennsylvania", "upenn_logo.png"],
  ["UT Austin", "utaustin_logo.png"],
  ["Emory", "emory_logo.png"],
  ["Mount Sinai", "mountsinai_logo.png"],
  ["Cornell", "cornell_logo.png"],
  ["University of Pittsburgh", "pitt_logo.png"],
  ["Karolinska Institutet", "karolinska_logo.png"],
  ["Baylor College of Medicine", "bcm_logo.png"],
  ["Case Western Reserve", "cwru_logo.png"],
  ["Vanderbilt", "vanderbilt_logo.png"],
  ["University of Edinburgh", "edinburgh_logo.png"],
  ["Boston University", "bu_logo.png"],
  ["Janelia Research Campus", "janelia_logo.png"],
  ["Brandeis", "brandeis_logo.png"],
  ["UC Santa Barbara", "ucsb_logo.png"],
  ["UC San Diego", "ucsd_logo.png"],
  ["Allen Institute", "allen_logo.png"],
].map(([name, file]) => ({
  name,
  src: `/images/institutions/${file}`,
  // These wordmarks are set small within their own artwork, so they read as
  // undersized next to the others at a shared cap height.
  big: BIG_LOGOS.has(name),
}));

export const FEATURED = {
  title: "Featured in",
  articles: [
    {
      title: "Neuroscience's open data revolution is just getting started",
      publication: "The Transmitter",
      author: "Benjamin Dichter",
      description: "How open data standards are transforming neuroscience research.",
      url: "https://www.thetransmitter.org/open-neuroscience-and-data-sharing/neurosciences-open-data-revolution-is-just-getting-started/",
    },
    {
      title: "Should neuroscientists vibe code?",
      publication: "The Transmitter",
      author: "Benjamin Dichter",
      description: "Exploring the role of AI in scientific programming.",
      url: "https://www.thetransmitter.org/craft-and-careers/should-neuroscientists-vibe-code/",
    },
  ],
};

export const TESTIMONIALS = [
  {
    quote:
      "Working with the team at CatalystNeuro was a terrific, highly productive experience. They revamped a bespoke volumetric imaging pipeline we had developed, integrated it with our behavioral data, and made it all compatible with NWB. My lab has already used their CatalystNeuro pipeline in publication, and will undoubtedly find their NWB toolkit of great use in the future.",
    name: "Dr. Thomas Clandinin",
    title: "Professor",
    institution: "Stanford University",
  },
];

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  url: string;
  abstract: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    title: "NeuroConv: Streamlining Neurophysiology Data Conversion to the NWB Standard",
    authors: "Mayorquin H, Baker C, Adkisson-Floro P, Weigl S, Trappani A, Tauffer L, Rübel O, Dichter B",
    journal: "SciPy Proceedings",
    year: 2025,
    doi: "10.25080/cehj4257",
    url: "https://proceedings.scipy.org/articles/cehj4257",
    abstract:
      "Modern neurophysiology generates increasingly complex, multimodal datasets that require standardized formats for effective sharing and reuse. We present NeuroConv, an open-source Python library that automates the conversion of neurophysiology data from 47 distinct formats into NWB through a unified, modular architecture.",
  },
  {
    title: "Facilitating analysis of open neurophysiology data on the DANDI Archive using large language model tools",
    authors: "Magland JF, Ly R, Rübel O, Dichter B",
    journal: "Scientific Data",
    year: 2025,
    doi: "10.1038/s41597-025-06285-x",
    url: "https://www.nature.com/articles/s41597-025-06285-x",
    abstract:
      "We introduce an AI-powered, agentic chat assistant and a notebook generation pipeline for exploring DANDI datasets. The system leverages large language models (LLMs) to guide users through data access, visualization, and preliminary analysis of NWB neurophysiology data.",
  },
  {
    title: "Neurosift: DANDI exploration and NWB visualization in the browser",
    authors: "Magland J, Soules J, Li AE, Dichter B",
    journal: "Journal of Open Source Software",
    year: 2024,
    doi: "10.21105/joss.06590",
    url: "https://joss.theoj.org/papers/10.21105/joss.06590",
    abstract:
      "Neurosift is a browser-based tool for exploring the DANDI Archive and visualizing NWB (Neurodata Without Borders) neurophysiology files. It provides interactive visualizations for various data modalities including electrophysiology, calcium imaging, and behavioral data.",
  },
  {
    title: "The Neurodata Without Borders ecosystem for neurophysiological data science",
    authors: "Rübel O, Tritt A, Ly R, Dichter BK, Ghosh S, Niu L, Baker P, Soltesz I, Ng L, Svoboda K, Frank L, Bouchard KE",
    journal: "eLife",
    year: 2022,
    doi: "10.7554/eLife.78362",
    url: "https://elifesciences.org/articles/78362",
    abstract:
      "The neurophysiology of cells and tissues are monitored electrophysiologically and optically in diverse experiments and species. Understanding the brain requires integration of data across this diversity, requiring data to be findable, accessible, interoperable, and reusable (FAIR). We describe design and implementation principles for a language for neurophysiology data through open-source software (Neurodata Without Borders, NWB).",
  },
];

// Facet vocabularies for the NWB Conversions filters.
export const METHODS = [
  "electrophysiology",
  "patch clamp",
  "calcium imaging",
  "two-photon microscopy",
  "behavioral tracking",
  "brain-computer interface",
  "fiber photometry",
  "pose estimation",
  "video",
  "optogenetics",
];

export const RESEARCH_AREAS = [
  "visual processing",
  "motor control",
  "social behavior",
  "spatial navigation",
  "Parkinson's disease",
  "autism",
  "decision-making",
  "working memory",
  "sleep",
];

// Reconcile funded-project titles with conversion `funded_project` values,
// for the few projects whose conversions reference a shorter name. (The ASAP
// project uses its full name "Aligning Science Across Parkinson's" on both
// sides, so it needs no alias.)
export const FUNDED_PROJECT_ALIASES: Record<string, string> = {
  "NYU Librarians NWB Adoption": "NYU Librarians",
  "Ripple U19 NWB Adoption": "Ripple U19",
};
