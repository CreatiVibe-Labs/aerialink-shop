import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashboard.aerialinkshop.jp",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
