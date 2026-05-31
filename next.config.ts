import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Images are pre-optimized to WebP and served from MinIO/S3, so we skip
    // Next.js's on-the-fly optimizer (slow on Render's free tier CPU).
    unoptimized: true,
  },
};

export default nextConfig;
