import frontMatter from 'front-matter';

export interface SoftwareItem {
  name: string;
  description: string;
  status?: string;
  type?: 'core' | 'extension' | 'guide' | 'analysis';
  image?: string;
  github?: string;
  docs?: string;
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
  funded_project?: string;
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
  github?: string[];
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

export const portfolio = loadMarkdownFiles('nwb-conversions') as PortfolioItem[];

// Keep the sync version for backward compatibility
export const loadPortfolio = (): PortfolioItem[] => {
  return portfolio;
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

export const fundedProjects = (() => {
  const files = import.meta.glob('../content/**/*.md', { as: 'raw', eager: true });
  const projects = Object.entries(files)
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
        github: attributes.github,
      };
    })
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  
  return projects;
})();

// Keep the async version for backward compatibility
export const loadFundedProjects = (): Promise<FundedProject[]> => {
  return Promise.resolve(fundedProjects);
};
