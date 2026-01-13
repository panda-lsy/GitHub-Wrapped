/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  distDir: "out",

  // 图片优化配置（静态导出环境）
  images: {
    unoptimized: true, // 避免使用 Next.js 图片优化（需要文件系统）
  },
};

module.exports = nextConfig;
