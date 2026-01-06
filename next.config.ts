import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",

  // 函数计算优化配置
  experimental: {
    // 优化包大小（可选）
    serverComponentsExternalPackages: ['sharp'],
  },

  // 图片优化配置（函数计算环境）
  images: {
    unoptimized: true, // 避免使用 Next.js 图片优化（需要文件系统）
  },
};

export default nextConfig;
