import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add headers for Brotli-compressed files
  async headers() {
    return [
      {
        source: "/webgl-app/:path*",
        headers: [
          {
            key: "Content-Encoding",
            value: "br",
          },
        ],
      },
    ];
  },
  // Configure static file serving
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(br)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/webgl",
            outputPath: "static/webgl",
            name: "[name].[ext]",
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
