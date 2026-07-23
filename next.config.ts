import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // In dev, proxy /api/* to the local Python twin (uvicorn on :8000) so the
    // browser can talk to it same-origin. In production Vercel serves the
    // api/*.py functions directly, so no rewrite is needed there.
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
