import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
