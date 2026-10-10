import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Stránka /praxe byla zrušena – staré odkazy vedou na úvod.
  redirects() {
    return [{ source: "/praxe", destination: "/", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
