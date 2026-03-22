import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // 👈 Adiciona esta entrada
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
