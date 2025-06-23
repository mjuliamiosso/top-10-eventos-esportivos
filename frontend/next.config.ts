import type { NextConfig } from "next";

const cmsHost = new URL(process.env.NEXT_PUBLIC_DIRECTUS_URL!).hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8055",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: cmsHost,
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
