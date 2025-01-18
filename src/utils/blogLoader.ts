export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  description: string;
  content: string;
  image: string;
  gallery?: string[];
  readTime: string;
  keywords: string[];
}

let cachedPosts: BlogPost[] | null = null;

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (cachedPosts) {
    return cachedPosts;
  }

  try {
    const response = await fetch('/blog-data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.statusText}`);
    }
    
    const posts = await response.json();
    cachedPosts = posts;
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};
