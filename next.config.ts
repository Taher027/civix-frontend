import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    staleTimes: { dynamic: 0 },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "example.com" },
    ],
  },
};

export default nextConfig;
