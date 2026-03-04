#!/usr/bin/env node

/**
 * cleanup-unused-images.js
 * Scans the src/ directory for all image path references,
 * then deletes any image in public/ that is not referenced anywhere.
 *
 * Usage:
 *   node cleanup-unused-images.js            # dry-run (preview only)
 *   node cleanup-unused-images.js --delete   # actually delete unused files
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_DIR = path.join(__dirname, 'src');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.ico', '.PNG', '.JPG'];
const SRC_EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.md'];

const DELETE_MODE = process.argv.includes('--delete');

// --- Collect all image files in public/ ---
function walkDir(dir, results = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(fullPath, results);
        } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name))) {
            results.push(fullPath);
        }
    }
    return results;
}

// --- Collect all source file contents ---
function getAllSourceContent(dir, content = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
            content += getAllSourceContent(fullPath);
        } else if (SRC_EXTENSIONS.includes(path.extname(entry.name))) {
            content += fs.readFileSync(fullPath, 'utf-8') + '\n';
        }
    }
    return content;
}

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// --- Main ---
console.log(`\n🔍 Unused Image Cleaner`);
console.log(`📁 Scanning: ${PUBLIC_DIR}`);
console.log(`🔧 Mode    : ${DELETE_MODE ? '⚠️  DELETE (files will be removed)' : 'DRY RUN (preview only)'}\n`);

const allImages = walkDir(PUBLIC_DIR);
console.log(`Found ${allImages.length} image(s) in public/\n`);

// Gather all source file content (src/ + root config files)
let sourceContent = getAllSourceContent(SRC_DIR);

// Also check root-level config files
for (const file of fs.readdirSync(__dirname)) {
    const ext = path.extname(file);
    if (SRC_EXTENSIONS.includes(ext) && !file.startsWith('.')) {
        sourceContent += fs.readFileSync(path.join(__dirname, file), 'utf-8') + '\n';
    }
}

const unused = [];
const used = [];

for (const imgPath of allImages) {
    // Get path relative to public/ — this is how it's referenced in code (e.g. /screenshots/foo.png)
    const relPath = '/' + path.relative(PUBLIC_DIR, imgPath).replace(/\\/g, '/');
    // Also check just the filename alone (for cases like src="/foo.png")
    const fileName = path.basename(imgPath);

    const isReferenced =
        sourceContent.includes(relPath) ||
        sourceContent.includes(fileName);

    if (isReferenced) {
        used.push(imgPath);
    } else {
        unused.push(imgPath);
    }
}

console.log(`✅ Used   : ${used.length}`);
console.log(`🗑  Unused : ${unused.length}\n`);

if (unused.length === 0) {
    console.log('Nothing to delete. All images are referenced.\n');
    process.exit(0);
}

let totalSize = 0;

console.log('─── Unused images ───────────────────────────────────');
for (const imgPath of unused) {
    const rel = path.relative(PUBLIC_DIR, imgPath);
    const size = fs.statSync(imgPath).size;
    totalSize += size;
    console.log(`  ${DELETE_MODE ? '🗑 ' : '  '} ${rel}  (${formatBytes(size)})`);
}

console.log(`\n  Total size of unused images: ${formatBytes(totalSize)}`);
console.log('─────────────────────────────────────────────────────\n');

if (DELETE_MODE) {
    let deleted = 0;
    for (const imgPath of unused) {
        try {
            fs.unlinkSync(imgPath);
            deleted++;
        } catch (e) {
            console.error(`  ❌ Failed to delete ${imgPath}: ${e.message}`);
        }
    }
    console.log(`✅ Deleted ${deleted} file(s), freed ${formatBytes(totalSize)}\n`);

    // Remove empty directories
    function removeEmptyDirs(dir) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir);
        if (entries.length === 0 && dir !== PUBLIC_DIR) {
            fs.rmdirSync(dir);
            console.log(`  📁 Removed empty dir: ${path.relative(PUBLIC_DIR, dir)}`);
            removeEmptyDirs(path.dirname(dir));
        }
    }

    const deletedDirs = new Set(unused.map(f => path.dirname(f)));
    for (const dir of [...deletedDirs].sort((a, b) => b.length - a.length)) {
        removeEmptyDirs(dir);
    }
} else {
    console.log(`💡 Run with --delete to remove these ${unused.length} files and free ${formatBytes(totalSize)}:\n`);
    console.log(`   node cleanup-unused-images.js --delete\n`);
}
