import type { NextConfig } from "next";

const NEXT_PUBLIC_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/revive-api/:path*", // Incoming request path
        destination: `${NEXT_PUBLIC_API_BASE}/api/:path*`, // Destination (your backend server)
      },
    ];
  },
};

export default nextConfig;
