#!/usr/bin/env node

/**
 * ESA Serverless 平台构建后处理脚本
 *
 * 用途：重组 Next.js 构建产物，使 ESA 平台能够正确识别和部署
 *
 * 使用方法：
 *   node scripts/post-build-esa.js
 */

const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step) {
  log(`\n${'='.repeat(60)}`, 'blue');
  log(`  ${step}`, 'blue');
  log(`${'='.repeat(60)}`, 'blue');
}

// 递归复制目录
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    log(`  ⚠️  源目录不存在: ${src}`, 'yellow');
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 递归删除目录
function removeDirectory(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      removeDirectory(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }

  fs.rmdirSync(dir);
}

// 主函数
async function main() {
  logStep('ESA 平台构建后处理');

  const rootDir = process.cwd();
  const nextDir = path.join(rootDir, '.next');
  const outputDir = path.join(rootDir, '.esa-build');

  // 检查 .next 是否存在
  if (!fs.existsSync(nextDir)) {
    log('❌ 错误：.next 目录不存在，请先运行 next build', 'red');
    log('   运行命令：npm run build:esa', 'red');
    process.exit(1);
  }

  // 清理旧的输出
  log('🧹 清理旧的构建输出...');
  if (fs.existsSync(outputDir)) {
    removeDirectory(outputDir);
  }
  fs.mkdirSync(outputDir, { recursive: true });
  log('  ✅ 清理完成', 'green');

  // 复制 .next/server 到 .esa-build/api
  // 这样平台就能从 api/ 目录找到函数文件
  log('📦 复制 API Routes...');
  const serverDir = path.join(nextDir, 'server');
  const apiDir = path.join(outputDir, 'api');

  if (fs.existsSync(serverDir)) {
    copyDirectory(serverDir, apiDir);
    log('  ✅ API Routes 复制完成', 'green');
  } else {
    log('  ⚠️  .next/server 目录不存在', 'yellow');
  }

  // 复制 .next/static 到 .esa-build/_next/static
  log('📦 复制静态资源...');
  const staticDir = path.join(nextDir, 'static');
  const nextStaticDir = path.join(outputDir, '_next', 'static');

  if (fs.existsSync(staticDir)) {
    copyDirectory(staticDir, nextStaticDir);
    log('  ✅ 静态资源复制完成', 'green');
  } else {
    log('  ⚠️  .next/static 目录不存在', 'yellow');
  }

  // 复制 public 到 .esa-build/public
  log('📦 复制 public 目录...');
  const publicDir = path.join(rootDir, 'public');
  const outputPublicDir = path.join(outputDir, 'public');

  if (fs.existsSync(publicDir)) {
    copyDirectory(publicDir, outputPublicDir);
    log('  ✅ public 目录复制完成', 'green');
  } else {
    log('  ⚠️  public 目录不存在', 'yellow');
  }

  // 创建清单文件
  log('📝 生成构建清单...');
  const manifest = {
    version: '1.0',
    platform: 'esa-serverless',
    buildTime: new Date().toISOString(),
    structure: {
      api: './api',
      static: './_next/static',
      public: './public',
    },
    functions: [
      './api/app/api/auth/[...nextauth]/route.js',
      './api/app/api/session/route.js',
    ],
  };

  fs.writeFileSync(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  log('  ✅ 清单生成完成', 'green');

  // 完成
  logStep('构建后处理完成');
  log(`✅ ESA 部署包已生成: ${outputDir}`, 'green');
  log('\n目录结构:', 'blue');
  log('  .esa-build/');
  log('    ├── api/          ← API Routes (函数文件)');
  log('    ├── _next/        ← Next.js 静态资源');
  log('    ├── public/       ← 公共资源');
  log('    └── manifest.json ← 构建清单');
  log('\n提示: 在 ESA 平台配置"函数文件路径"为: api', 'blue');
}

// 执行
main().catch((error) => {
  log(`\n❌ 错误: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
