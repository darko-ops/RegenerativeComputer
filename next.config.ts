import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile outside the repo is not picked up.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
