#!/usr/bin/env node

/**
 * compress-heavy.js
 * Specifically targets and compresses large image files (> 500KB) in the public/ folder.
 * It also resizes images that are excessively wide to a more reasonable 2000px.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- Config ---
const PUBLIC_DIR = path.join(__dirname, 'public');
const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.PNG', '.JPG', '.JPEG'];
const MIN_SIZE_BYTES = 500 * 1024; // Target images > 500KB
const MAX_WIDTH = 2000; // Resize if wider than 2000px
const QUALITY = 85; // High enough quality for full-size view

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function walkDir(dir, results = []) {
    if (!fs.existsSync(dir)) return results;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Skip thumbnails directory to avoid double processing
            if (entry.name !== 'thumbnails') {
                walkDir(fullPath, results);
            }
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (SUPPORTED_EXT.includes(ext)) {
                const stats = fs.statSync(fullPath);
                if (stats.size > MIN_SIZE_BYTES) {
                    results.push({ path: fullPath, size: stats.size });
                }
            }
        }
    }
    return results;
}

async function compressHeavyImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const originalSize = fs.statSync(filePath).size;
    const tempPath = filePath + '.heavy.tmp';

    try {
        let pipeline = sharp(filePath);
        const metadata = await pipeline.metadata();

        // Resize if too wide
        if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH);
        }

        if (ext === '.png') {
            pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9, palette: true });
        } else if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
        } else if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: QUALITY });
        }

        await pipeline.toFile(tempPath);

        const compressedSize = fs.statSync(tempPath).size;

        if (compressedSize < originalSize) {
            fs.renameSync(tempPath, filePath);
            const saved = originalSize - compressedSize;
            const pct = ((saved / originalSize) * 100).toFixed(1);
            return { status: 'compressed', originalSize, compressedSize, saved, pct, resized: metadata.width > MAX_WIDTH };
        } else {
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            return { status: 'skipped', originalSize, compressedSize: originalSize, saved: 0, pct: '0', resized: false };
        }
    } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        return { status: 'error', error: err.message };
    }
}

(async () => {
    console.log(`\n🐘 Heavy Image Compressor`);
    console.log(`🎯 Threshold  : > ${formatBytes(MIN_SIZE_BYTES)}`);
    console.log(`📏 Max Width  : ${MAX_WIDTH}px`);
    console.log(`✨ Quality    : ${QUALITY}%\n`);

    const heavyImages = walkDir(PUBLIC_DIR);
    
    if (heavyImages.length === 0) {
        console.log(`✅ No heavy images found! Everything is already optimized.`);
        return;
    }

    console.log(`Found ${heavyImages.length} heavy image(s)\n`);

    let totalSaved = 0;
    let compressedCount = 0;

    for (const img of heavyImages) {
        const rel = path.relative(PUBLIC_DIR, img.path);
        process.stdout.write(`  ⏳ Optimizing ${rel}... `);
        
        const result = await compressHeavyImage(img.path);

        if (result.status === 'compressed') {
            totalSaved += result.saved;
            compressedCount++;
            console.log(`\r  ✅ ${rel}`);
            console.log(`     ${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)} (-${result.pct}%)${result.resized ? ' [Resized]' : ''}`);
        } else if (result.status === 'skipped') {
            console.log(`\r  ⏭  ${rel} (already optimal)`);
        } else {
            console.log(`\r  ❌ ${rel} Error: ${result.error}`);
        }
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📊 Summary`);
    console.log(`   Images optimized : ${compressedCount}`);
    console.log(`   Total space saved: ${formatBytes(totalSaved)}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
})();
