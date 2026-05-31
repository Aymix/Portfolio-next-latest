/**
 * Resolves an image path to its CDN (MinIO/S3) URL.
 *
 * When NEXT_PUBLIC_ASSET_BASE_URL is set, images are served from the bucket
 * as optimized WebP (every source was converted to .webp at upload time).
 * When it's unset (e.g. local dev without the env var), it falls back to the
 * original file in /public so the site still works offline.
 */
const BASE = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || "").replace(/\/+$/, "");

export function asset(path: string): string {
  if (!path) return path;
  if (!BASE) return path; // fall back to local /public
  const webp = path.replace(/\.(png|jpe?g|gif|webp)$/i, ".webp");
  return BASE + encodeURI(webp);
}
