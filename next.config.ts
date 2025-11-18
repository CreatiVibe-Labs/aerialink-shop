import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashboard.aerialinkshop.jp",
        port: "",
        pathname: "/storage/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
