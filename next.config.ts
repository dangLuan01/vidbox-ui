import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      }
    ],
    formats: ["image/avif", "image/webp"],
  },
  productionBrowserSourceMaps: false,
  compress: true,
  reactStrictMode: true,

  experimental: { 
    optimizePackageImports: ["lucide-react"],
    serverActions: { 
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
