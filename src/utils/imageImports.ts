// Function to get image URL using Vite's asset handling
export function getImageUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Use relative path from the current location to the images directory
  return new URL(`../../${cleanPath}`, import.meta.url).href;
}
