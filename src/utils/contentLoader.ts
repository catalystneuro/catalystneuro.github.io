import frontMatter from 'front-matter';

export interface SoftwareItem {
  name: string;
  description: string;
  status: string;
  image: string;
  github: string;
  docs: string;
}

interface DandiDataset {
  url: string;
  name: string;
}

export interface PortfolioItem {
  lab: string;
  institution: string;
  description: string;
  github: string;
  dandi?: string | DandiDataset[];
  date: string;
}

export interface JobOpening {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  image: string;
  responsibilities: string[];
  requirements: string[];
  enabled?: boolean;
}

export interface AboutSection {
  title: string;
  icon: string;
  content: string;
}

export interface AboutContent {
  sections: AboutSection[];
}

export interface FundedProject {
  title: string;
  funder: string;
  status: string;
  startDate: string;
  description: string;
  image?: string;
  body?: string;
}

function loadMarkdownFiles(directory: string) {
  const files = import.meta.glob('../content/**/*.md', { as: 'raw', eager: true });
  
  return Object.entries(files)
    .filter(([path]) => path.includes(`/${directory}/`))
    .map(([_, content]) => {
      const { attributes } = frontMatter(content);
      return attributes as any;
    });
}

export const loadSoftware = (): SoftwareItem[] => {
  return loadMarkdownFiles('software') as SoftwareItem[];
};

export const loadPortfolio = (): PortfolioItem[] => {
  return loadMarkdownFiles('nwb-conversions') as PortfolioItem[];
};

export const loadOpenings = (): JobOpening[] => {
  return loadMarkdownFiles('openings') as JobOpening[];
};

export const loadAbout = (): AboutContent => {
  const files = import.meta.glob('../content/**/*.md', { as: 'raw', eager: true });
  const aboutPath = Object.keys(files).find(path => path.includes('/about.md'));
  if (!aboutPath || !files[aboutPath]) {
    return { sections: [] };
  }
  const { attributes } = frontMatter(files[aboutPath]);
  return attributes as AboutContent;
};

export const loadFundedProjects = (): FundedProject[] => {
  const files = import.meta.glob('../content/**/*.md', { as: 'raw', eager: true });
  
  return Object.entries(files)
    .filter(([path]) => path.includes('/funded-projects/'))
    .map(([_, content]) => {
      const { attributes, body } = frontMatter<FundedProject>(content);
      return {
        title: attributes.title,
        funder: attributes.funder,
        status: attributes.status,
        startDate: attributes.startDate,
        description: attributes.description,
        image: attributes.image,
        body: body.trim(),
      };
    })
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
};
