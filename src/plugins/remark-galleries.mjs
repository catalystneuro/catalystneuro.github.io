import fs from "node:fs";
import path from "node:path";

const MEDIA_RE = /\.(jpg|jpeg|png|gif|mp4|webm|avif|webp)$/i;

function parseAttrs(str) {
  const attrs = {};
  const re = /(\w+)="([^"]*)"/g;
  let m;
  while ((m = re.exec(str))) attrs[m[1]] = m[2];
  return attrs;
}

function collectText(node, out) {
  if (!node) return;
  if (typeof node.value === "string") out.push(node.value);
  if (node.url) out.push(node.url);
  if (Array.isArray(node.children)) node.children.forEach((c) => collectText(c, out));
}

function folderImages(folder) {
  const dir = path.join(process.cwd(), "public", "images", folder);
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((f) => MEDIA_RE.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => `/images/${folder}/${f}`);
}

function galleryNode(images, attrs) {
  const data = images.join("|");
  const aspect = attrs.aspect || "16/9";
  const width = attrs.width || "";
  return {
    type: "html",
    value: `<div class="cn-gallery" data-aspect="${aspect}" data-width="${width}" data-images="${data}"></div>`,
  };
}

/** Expands `<!-- gallery-start ... -->  ... <!-- gallery-end -->` blocks. */
export default function remarkGalleries() {
  return (tree) => {
    const children = tree.children;
    const next = [];
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      const isHtml = node.type === "html" && typeof node.value === "string";
      if (!isHtml || !node.value.includes("gallery-start")) {
        next.push(node);
        continue;
      }

      const startMatch = node.value.match(/gallery-start([^>]*)-->/);
      const attrs = parseAttrs(startMatch ? startMatch[1] : "");

      // Folder mode: attributes carry the folder; images read from disk.
      if (attrs.folder) {
        next.push(galleryNode(folderImages(attrs.folder), attrs));
        // If the end marker is a separate node right after, skip it.
        if (
          !node.value.includes("gallery-end") &&
          children[i + 1]?.type === "html" &&
          children[i + 1].value.includes("gallery-end")
        )
          i++;
        continue;
      }

      // List mode: collect URLs from nodes until the end marker.
      const urls = [];
      let j = i;
      // same-node end marker means an empty list gallery
      let ended = node.value.includes("gallery-end");
      while (!ended && j + 1 < children.length) {
        j++;
        const n = children[j];
        if (n.type === "html" && n.value.includes("gallery-end")) {
          ended = true;
          break;
        }
        const parts = [];
        collectText(n, parts);
        parts
          .flatMap((p) => p.split(/\s+/))
          .filter((p) => p.startsWith("/") || p.startsWith("http"))
          .forEach((u) => urls.push(u.replace(/^-\s*/, "")));
      }
      i = j;
      next.push(galleryNode(urls, attrs));
    }
    tree.children = next;
  };
}
