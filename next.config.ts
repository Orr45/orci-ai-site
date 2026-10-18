import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // עיר המצביעים: a standalone static app in public/ir (full-screen, outside the site layout)
  // קישור קצר לביו באינסטגרם: נכנסים ישר לעיר, והמדידה יודעת שהגיעו מהביו
  async redirects() {
    return [{ source: "/city", destination: "/ir?src=bio", permanent: false }];
  },
  async rewrites() {
    return [{ source: "/ir", destination: "/ir/index.html" }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
