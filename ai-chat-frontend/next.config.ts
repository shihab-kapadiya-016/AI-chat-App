import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',     // Frontend route
        destination: 'http://127.0.0.1:8000/:path*/', // Backend URL (adjust port)
      }
    ]
  },
};

export default nextConfig;
