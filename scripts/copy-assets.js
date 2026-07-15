import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Copies the repo-root `images/` directory into `dist/images/` after the build.
// (Static HTML for every route is now produced by vite-react-ssg; this script
// only handles the image assets that live outside Vite's `public/` directory.)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const imagesDir = path.join(rootDir, 'images');
const distImagesDir = path.join(rootDir, 'dist', 'images');

if (fs.existsSync(imagesDir)) {
  fs.mkdirSync(distImagesDir, { recursive: true });
  fs.cpSync(imagesDir, distImagesDir, { recursive: true });
  console.log(`Copied images/ -> dist/images/`);
} else {
  console.log('No images/ directory found; nothing to copy.');
}
