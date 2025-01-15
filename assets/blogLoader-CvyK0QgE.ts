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

// Process content to handle inline galleries
function processContent(content: string): string {
  let processedContent = content;
  const galleryRegex = /<!-- gallery-start(?:\s+width="([^"]*)")?\s*(?:aspect="([^"]*)")?\s*(?:folder="([^"]*)")?\s*-->\n([\s\S]*?)<!-- gallery-end -->/g;
  
  processedContent = processedContent.replace(galleryRegex, (match, width, aspect, folder, imageList) => {
    let images: string[] = [];
    
    if (folder) {
      // If a folder is specified, use all images from that folder
      try {
        const files = import.meta.glob('/images/**/*.(jpg|jpeg|png|gif|mp4|webm)', { 
          as: 'url',
          eager: true 
        });
        images = Object.keys(files)
          .filter(path => path.startsWith(`/images/${folder}/`))
          .sort()
          .map(path => path);
      } catch (error) {
        console.error('Error loading images from folder:', error);
      }
    } else {
      // Otherwise use explicitly listed images
      images = imageList
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.slice(1).trim())
        .filter(Boolean);
    }

    if (images.length === 0) return '';

    const attrs = [
      'class="gallery"',
      `data-images="${images.join('|')}"`,
      width && `data-width="${width}"`,
      aspect && `data-aspect="${aspect}"`
    ].filter(Boolean).join(' ');

    return `<div ${attrs}></div>`;
  });

  return processedContent;
}

// Load and parse all markdown files from the blog directory
export const loadMarkdownFiles = () => {
  try {
    // Use raw loader to get markdown content directly
    const files = import.meta.glob('../content/blog/*.md', { 
      as: 'raw',
      eager: true 
    });

    console.log('Found files:', Object.keys(files));

    const posts = Object.entries(files)
      .map(([path, content]) => {
        try {
          if (typeof content !== 'string') {
            console.error('Invalid content type for file:', path);
            return null;
          }

          // Split content into frontmatter and markdown
          const [, frontmatter, ...contentParts] = content.split('---\n');
          if (!frontmatter) {
            console.error('No frontmatter found:', path);
            return null;
          }

          // Parse frontmatter
          const data = parseFrontmatter(frontmatter);
          if (!data) {
            console.error('Failed to parse frontmatter:', path);
            return null;
          }

          const slug = path.split('/').pop()?.replace('.md', '') || '';
          const mdContent = contentParts.join('---\n').trim();

          return {
            title: data.title || '',
            date: data.date || '',
            description: data.description || '',
            image: data.image || '',
            readTime: data.readTime || '',
            keywords: data.keywords || [],
            gallery: data.gallery || [],
            slug,
            content: processContent(mdContent),
          } as BlogPost;
        } catch (error) {
          console.error('Error processing file:', path, error instanceof Error ? error.message : error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error in loadMarkdownFiles:', error instanceof Error ? error.stack : error);
    return [];
  }
};

// Helper function to parse frontmatter
function parseFrontmatter(frontmatter: string) {
  try {
    const data: Record<string, any> = {};
    let currentKey: string | null = null;
    let arrayItems: string[] = [];
    let isInArray = false;

    // Split into lines and process each line
    const lines = frontmatter.trim().split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) continue;

      // Check if line starts a new key
      const keyMatch = trimmedLine.match(/^(\w+):\s*(.*)$/);
      if (keyMatch) {
        currentKey = keyMatch[1];
        const value = keyMatch[2].trim();

        // Handle array start
        if (value.startsWith('[')) {
          isInArray = true;
          arrayItems = [];
          continue;
        }

        // Handle simple value
        if (value) {
          data[currentKey] = value.replace(/^"(.*)"$/, '$1'); // Remove quotes if present
        }
        continue;
      }

      // Handle array items
      if (isInArray && currentKey) {
        if (trimmedLine.endsWith(']')) {
          // End of array
          arrayItems.push(trimmedLine.replace(/[\s,\]]$/, ''));
          data[currentKey] = arrayItems.map(item => 
            item.trim().replace(/^["'](.*)["']$/, '$1') // Remove quotes
              .replace(/^[-\s]*/, '') // Remove leading dash and spaces
              .trim()
          );
          isInArray = false;
          currentKey = null;
          arrayItems = [];
        } else {
          // Array item
          arrayItems.push(trimmedLine.replace(/^[-\s]*/, '')); // Remove leading dash
        }
      }
    }

    console.log('Parsed frontmatter:', data);
    return data;
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    console.error('Raw frontmatter:', frontmatter);
    return null;
  }
}

// Export the blog posts
export const blogPosts = loadMarkdownFiles();
