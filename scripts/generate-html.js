import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Get blog post slugs from markdown files
const getBlogSlugs = () => {
  const blogDir = path.join(rootDir, 'src', 'content', 'blog');
  return fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
};

const routes = [
  'about',
  'team',
  'blog',
  'software',
  'openings',
  'funded-projects',
  'nwb-conversions'
];

// Add blog post routes
const blogSlugs = getBlogSlugs();

// Read the template
const distDir = path.join(rootDir, 'dist');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Fix asset paths to be absolute
const fixedTemplate = template
  .replace(/src="\.\//g, 'src="/')
  .replace(/href="\.\//g, 'href="/')
  .replace(/src="\.\.\//g, 'src="/')
  .replace(/href="\.\.\//g, 'href="/');

// Create directories and HTML files for each route
routes.forEach(route => {
  const dir = path.join(distDir, route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'index.html'), fixedTemplate);
});

// Create HTML files for each blog post
const blogDir = path.join(distDir, 'blog');
blogSlugs.forEach(slug => {
  const postDir = path.join(blogDir, slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }
  fs.writeFileSync(path.join(postDir, 'index.html'), fixedTemplate);
});

// Update the root index.html as well
fs.writeFileSync(path.join(distDir, 'index.html'), fixedTemplate);

// Copy images directory to dist if it exists
const imagesDir = path.join(rootDir, 'images');
const distImagesDir = path.join(distDir, 'images');
if (fs.existsSync(imagesDir)) {
  if (!fs.existsSync(distImagesDir)) {
    fs.mkdirSync(distImagesDir, { recursive: true });
  }
  fs.cpSync(imagesDir, distImagesDir, { recursive: true });
}
