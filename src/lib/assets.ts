/**
 * Resolves an image path to its CDN (MinIO/S3) URL.
 *
 * When NEXT_PUBLIC_ASSET_BASE_URL is set, images are served from the bucket
 * as optimized WebP (every source was converted to .webp at upload time).
 * When it's unset (e.g. local dev without the env var), it falls back to the
 * original file in /public so the site still works offline.
 */
// Default to the MinIO bucket so production works without extra env config.
// Override with NEXT_PUBLIC_ASSET_BASE_URL, or set it to "local" to use /public.
const DEFAULT_BASE = "https://minio-hosoo0wcgscc8sgckgok4444.31.97.193.81.sslip.io/portfolio";
const RAW = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? DEFAULT_BASE;
const BASE = RAW === "local" ? "" : RAW.replace(/\/+$/, "");

export function asset(path: string): string {
  if (!path) return path;
  if (!BASE) return path; // fall back to local /public
  const webp = path.replace(/\.(png|jpe?g|gif|webp)$/i, ".webp");
  return BASE + encodeURI(webp);
}
