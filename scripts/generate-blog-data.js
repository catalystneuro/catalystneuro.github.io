import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const OUTPUT_FILE = path.join(__dirname, '../public/blog-data.json');

function processContent(content) {
  let processedContent = content;
  const galleryRegex = /<!-- gallery-start(?:\s+width="([^"]*)")?\s*(?:aspect="([^"]*)")?\s*(?:folder="([^"]*)")?\s*-->\n([\s\S]*?)<!-- gallery-end -->/g;
  
  processedContent = processedContent.replace(galleryRegex, (match, width, aspect, folder, imageList) => {
    let images = [];
    
    if (folder) {
      const folderPath = path.join(__dirname, '../images', folder);
      if (fs.existsSync(folderPath)) {
        images = fs.readdirSync(folderPath)
          .filter(file => /\.(jpg|jpeg|png|gif|mp4|webm|avif)$/i.test(file))
          .sort()
          .map(file => `/images/${folder}/${file}`);
      }
    } else {
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

async function generateBlogData() {
  try {
    // Read all markdown files from the blog directory
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
    
    const posts = files.map(file => {
      const filePath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: markdownContent } = matter(content);
      const slug = file.replace('.md', '');

      return {
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        image: data.image || '',
        readTime: data.readTime || '',
        keywords: data.keywords || [],
        gallery: data.gallery || [],
        slug,
        content: processContent(markdownContent),
      };
    });

    // Sort posts by date
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log('Blog data generated successfully!');
  } catch (error) {
    console.error('Error generating blog data:', error);
    process.exit(1);
  }
}

generateBlogData();
