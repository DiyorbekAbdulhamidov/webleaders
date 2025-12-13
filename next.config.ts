import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Build vaqtida ESLint xatolariga e'tibor bermaslik
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Build vaqtida TypeScript xatolariga e'tibor bermaslik
    ignoreBuildErrors: true,
  },
};

export default nextConfig;