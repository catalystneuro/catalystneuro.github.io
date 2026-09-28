// Builds the single-colour funder logos used in the homepage "Backed and
// trusted by" strip. The source files arrive in different colours, formats and
// backgrounds, so greyscaling them in CSS leaves them at very different visual
// weights. Here each pixel's darkness (against white, times its own alpha)
// becomes the alpha of a solid navy pixel, normalised so the darkest ink in
// every logo is fully opaque. Run with `node scripts/mono-logos.mjs`.
import sharp from "sharp";

const NAVY = [16, 22, 66];
const OUT = "public/images/sponsors/mono";
const LOGOS = {
  nih: "public/images/sponsors/nih_logo.png",
  allen: "public/images/institutions/allen_logo.png",
  kavli: "public/images/sponsors/kavli_foundation_logo.png",
  mjff: "public/images/sponsors/MJFF_logo.png",
  simons: "public/images/sponsors/simons_foundation_logo.avif",
};

for (const [name, src] of Object.entries(LOGOS)) {
  const { data, info } = await sharp(src)
    .flatten({ background: "#ffffff" }).ensureAlpha()
    .raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const dark = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const [r, g, b] = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
    dark[i] = 1 - (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }
  // Normalise against the 98th percentile of the inked pixels rather than the
  // maximum, so a few stray dark pixels cannot leave the rest of a pale logo faint.
  const inked = Array.from(dark).filter((d) => d > 0.08).sort((a, b) => a - b);
  const ref = inked[Math.floor(inked.length * 0.98)] || 1;
  const out = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const a = Math.min(1, Math.max(0, (dark[i] - 0.04) / (ref - 0.04)));
    out.set([...NAVY, Math.round(a * 255)], i * 4);
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ height: 160, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(`${OUT}/${name}.png`);
  console.log(name);
}
