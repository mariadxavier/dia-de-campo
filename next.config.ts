import type { NextConfig } from "next";
const storageUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
const protocol = storageUrl.protocol === "https:" ? "https" : "http";

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
      {
        protocol: protocol,
        hostname: storageUrl.hostname,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
