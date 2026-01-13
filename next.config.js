/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",

  // 服务器组件外部包（Next.js 16+）
  serverExternalPackages: ['sharp'],

  // 图片优化配置（函数计算环境）
  images: {
    unoptimized: true, // 避免使用 Next.js 图片优化（需要文件系统）
  },
};

module.exports = nextConfig;
