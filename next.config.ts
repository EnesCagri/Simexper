import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: "/webgl-app/Basic/Build/:path*.js",
        headers: [{ key: "Content-Type", value: "application/javascript" }],
      },
      {
        source: "/webgl-app/Basic/Build/:path*.wasm.unityweb",
        headers: [
          { key: "Content-Encoding", value: "gzip" },
          { key: "Content-Type", value: "application/wasm" },
        ],
      },
      {
        source: "/webgl-app/Basic/Build/:path*.framework.js.unityweb",
        headers: [
          { key: "Content-Encoding", value: "gzip" },
          { key: "Content-Type", value: "application/javascript" },
        ],
      },
      {
        source: "/webgl-app/Basic/Build/:path*.data.unityweb",
        headers: [
          { key: "Content-Encoding", value: "gzip" },
          { key: "Content-Type", value: "application/octet-stream" },
        ],
      },
    ];
  },
};

export default nextConfig;
