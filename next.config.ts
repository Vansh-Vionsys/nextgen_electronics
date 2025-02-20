import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["*"], // Allow all domains
    unoptimized: true, // Disable Next.js optimization for all images
  },
};

export default nextConfig;
