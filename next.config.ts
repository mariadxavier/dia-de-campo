import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // TODO: REMOVER LINKS DE DADOS MOCKADOS E MANTER APENAS O DO STORAGE
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
