#!/usr/bin/env node
/**
 * optimize-and-upload.js
 * Converts every image under public/ to resized WebP in a temp dir (same
 * relative path, .webp extension), so they can be mirrored to MinIO/S3.
 *
 * Sizing: thumbnails -> max 700px wide, everything else -> max 1500px wide.
 * Never upscales. WebP quality 80.
 *
 * Usage: node optimize-and-upload.js   (writes to /tmp/portfolio-cdn)
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "public");
const OUT_DIR = "/tmp/portfolio-cdn";
const EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXT.includes(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}
const fmt = (b) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(0)}KB` : `${(b / 1048576).toFixed(2)}MB`);

(async () => {
  const files = walk(PUBLIC_DIR);
  let inTotal = 0, outTotal = 0, n = 0;
  for (const src of files) {
    const rel = path.relative(PUBLIC_DIR, src);
    const isThumb = rel.split(path.sep)[0] === "thumbnails";
    const maxW = isThumb ? 700 : 1500;
    const outRel = rel.replace(/\.(png|jpe?g|webp|gif)$/i, ".webp");
    const dest = path.join(OUT_DIR, outRel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    try {
      await sharp(src, { animated: true })
        .resize({ width: maxW, height: 16000, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(dest);
      const inB = fs.statSync(src).size, outB = fs.statSync(dest).size;
      inTotal += inB; outTotal += outB; n++;
      if (outB > inB) { // webp bigger than source? keep source bytes re-encoded anyway, just note
      }
    } catch (err) {
      console.error("FAILED", rel, err.message);
    }
  }
  console.log(`\nConverted ${n} images`);
  console.log(`Total: ${fmt(inTotal)} -> ${fmt(outTotal)}  (${((1 - outTotal / inTotal) * 100).toFixed(0)}% smaller)`);
  console.log(`Output: ${OUT_DIR}`);
})();
