#!/usr/bin/env node

/**
 * compress-images.js
 * Compresses all JPG/JPEG/PNG/WebP images in the public/ folder in-place.
 * Original files are replaced with compressed versions (same filenames).
 *
 * Quality settings:
 *   JPEG/JPG → quality 80
 *   PNG      → quality 80 (palette-based compression)
 *   WebP     → quality 80
 *
 * Usage:
 *   node compress-images.js
 *   node compress-images.js --quality 70   (custom quality)
 *   node compress-images.js --dry-run      (preview only, no changes)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- Config ---
const PUBLIC_DIR = path.join(__dirname, 'public');
const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.webp'];
const args = process.argv.slice(2);
const qualityArg = args.indexOf('--quality');
const QUALITY = qualityArg !== -1 ? parseInt(args[qualityArg + 1], 10) : 80;
const DRY_RUN = args.includes('--dry-run');

// --- Helpers ---
function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function walkDir(dir, results = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(fullPath, results);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (SUPPORTED_EXT.includes(ext)) {
                results.push(fullPath);
            }
        }
    }
    return results;
}

async function compressImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const originalSize = fs.statSync(filePath).size;
    const tempPath = filePath + '.tmp';

    try {
        let pipeline = sharp(filePath);

        if (ext === '.png') {
            pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
        } else if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
        } else if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: QUALITY });
        }

        await pipeline.toFile(tempPath);

        const compressedSize = fs.statSync(tempPath).size;

        if (compressedSize < originalSize) {
            fs.renameSync(tempPath, filePath); // replace original
            const saved = originalSize - compressedSize;
            const pct = ((saved / originalSize) * 100).toFixed(1);
            return { status: 'compressed', originalSize, compressedSize, saved, pct };
        } else {
            fs.unlinkSync(tempPath); // discard — already optimal
            return { status: 'skipped', originalSize, compressedSize, saved: 0, pct: '0' };
        }
    } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        return { status: 'error', error: err.message };
    }
}

// --- Main ---
(async () => {
    console.log(`\n🗜  Image Compressor`);
    console.log(`📁 Directory : ${PUBLIC_DIR}`);
    console.log(`🎯 Quality   : ${QUALITY}`);
    console.log(`🧪 Dry run   : ${DRY_RUN ? 'YES (no files changed)' : 'NO'}\n`);

    const images = walkDir(PUBLIC_DIR);
    console.log(`Found ${images.length} image(s)\n`);

    let totalOriginal = 0;
    let totalCompressed = 0;
    let compressedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const imgPath of images) {
        const rel = path.relative(PUBLIC_DIR, imgPath);
        const originalSize = fs.statSync(imgPath).size;
        totalOriginal += originalSize;

        if (DRY_RUN) {
            console.log(`  [dry-run] ${rel}  (${formatBytes(originalSize)})`);
            totalCompressed += originalSize;
            continue;
        }

        const result = await compressImage(imgPath);

        if (result.status === 'compressed') {
            totalCompressed += result.compressedSize;
            compressedCount++;
            console.log(`  ✅ ${rel}`);
            console.log(`     ${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)}  (saved ${result.pct}%)`);
        } else if (result.status === 'skipped') {
            totalCompressed += result.originalSize;
            skippedCount++;
            console.log(`  ⏭  ${rel}  (already optimal, skipped)`);
        } else {
            totalCompressed += originalSize;
            errorCount++;
            console.error(`  ❌ ${rel}  ERROR: ${result.error}`);
        }
    }

    const totalSaved = totalOriginal - totalCompressed;
    const totalPct = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📊 Summary`);
    console.log(`   Total images  : ${images.length}`);
    console.log(`   Compressed    : ${compressedCount}`);
    console.log(`   Skipped       : ${skippedCount}`);
    console.log(`   Errors        : ${errorCount}`);
    console.log(`   Before        : ${formatBytes(totalOriginal)}`);
    console.log(`   After         : ${formatBytes(totalCompressed)}`);
    console.log(`   Saved         : ${formatBytes(totalSaved)}  (${totalPct}%)`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
})();
