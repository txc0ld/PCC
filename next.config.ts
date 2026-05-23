import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "perthconcretecare.com.au" }],
        destination: "https://perthcommercialfloors.com.au/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.perthconcretecare.com.au" }],
        destination: "https://perthcommercialfloors.com.au/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.perthcommercialfloors.com.au" }],
        destination: "https://perthcommercialfloors.com.au/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "perthconcretepolishing.com.au" }],
        destination: "https://perthcommercialfloors.com.au/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.perthconcretepolishing.com.au" }],
        destination: "https://perthcommercialfloors.com.au/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "image.mux.com" },
    ],
  },
  experimental: { optimizePackageImports: ["framer-motion", "gsap"] },
};

export default config;
