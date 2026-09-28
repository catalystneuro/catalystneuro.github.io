import path from "node:path";
import sharp from "sharp";

// Give every Markdown image that points at a file in public/ its intrinsic
// width and height, so the browser reserves the space before the image loads,
// and lazy-load it. Images without a readable local file are left alone.
export default function rehypeImageSize() {
  return async (tree) => {
    const imgs = [];
    (function walk(node) {
      if (node.type === "element" && node.tagName === "img") imgs.push(node);
      node.children?.forEach(walk);
    })(tree);

    await Promise.all(
      imgs.map(async (img) => {
        const p = img.properties ?? (img.properties = {});
        if (!p.loading) p.loading = "lazy";
        if (!p.decoding) p.decoding = "async";
        const src = typeof p.src === "string" ? decodeURI(p.src) : "";
        if (!src.startsWith("/") || (p.width && p.height)) return;
        try {
          const { width, height } = await sharp(path.join(process.cwd(), "public", src)).metadata();
          if (width && height) Object.assign(p, { width, height });
        } catch {
          // Missing or unreadable file: nothing to measure.
        }
      })
    );
  };
}
