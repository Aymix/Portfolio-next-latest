#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, 'public', 'screenshots');
const THUMBNAILS_DIR = path.join(__dirname, 'public', 'thumbnails');
const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.PNG', '.JPG', '.JPEG'];
const THUMB_WIDTH = 400;
const FORCE = process.argv.includes('--force');

function walkDir(dir, results = []) {
    if (!fs.existsSync(dir)) return results;
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

async function generateThumbnail(sourcePath) {
    const relPath = path.relative(SCREENSHOTS_DIR, sourcePath);
    const targetPath = path.join(THUMBNAILS_DIR, relPath);
    const targetDir = path.dirname(targetPath);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    try {
        if (!FORCE && fs.existsSync(targetPath)) {
            const sourceStat = fs.statSync(sourcePath);
            const targetStat = fs.statSync(targetPath);
            if (sourceStat.mtime <= targetStat.mtime) {
                return { status: 'skipped', relPath };
            }
        }

        await sharp(sourcePath)
            .resize(THUMB_WIDTH)
            .toFile(targetPath);

        return { status: 'generated', relPath };
    } catch (err) {
        return { status: 'error', relPath, error: err.message };
    }
}

(async () => {
    console.log(`🖼  Thumbnail Generator`);
    console.log(`📁 Source      : ${SCREENSHOTS_DIR}`);
    console.log(`📁 Destination : ${THUMBNAILS_DIR}`);
    console.log(`🔥 Force mode  : ${FORCE ? 'ON' : 'OFF'}\n`);

    const images = walkDir(SCREENSHOTS_DIR);
    console.log(`Found ${images.length} image(s)\n`);

    let generatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const imgPath of images) {
        const result = await generateThumbnail(imgPath);
        if (result.status === 'generated') {
            generatedCount++;
            console.log(`  ✅ ${result.relPath}`);
        } else if (result.status === 'skipped') {
            skippedCount++;
            console.log(`  ⏭  ${result.relPath} (skipped)`);
        } else {
            errorCount++;
            console.error(`  ❌ ${result.relPath}  ERROR: ${result.error}`);
        }
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📊 Summary`);
    console.log(`   Generated     : ${generatedCount}`);
    console.log(`   Skipped       : ${skippedCount}`);
    console.log(`   Errors        : ${errorCount}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
})();
