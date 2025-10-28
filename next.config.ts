import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     // {
  //     //   source: `/revive-api/:path*`, // Incoming request path
  //     //   destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`, // Destination (your backend server)
  //     // },
  //     // {
  //     //   source: `/auth/:path*`, // Incoming request path
  //     //   destination: `/api/auth/:path*`, // Destination (your backend server)
  //     // },
  //   ];
  // },
  images: {
    remotePatterns: [new URL('http://localhost:8080/api/uploads/profile-pictures/**')],
  },
};

export default nextConfig;
