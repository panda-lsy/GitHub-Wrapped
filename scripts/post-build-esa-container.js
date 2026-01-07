#!/usr/bin/env node

/**
 * ESA 容器模式构建后处理脚本
 *
 * 用途：准备 Next.js Standalone 输出用于 ESA 平台容器模式部署
 *
 * 使用方法：
 *   node scripts/post-build-esa-container.js
 *
 * 部署说明：
 *   1. 将 .next/standalone 目录打包上传到 ESA 平台
 *   2. 启动命令：node esa-server.js
 *   3. 端口：使用环境变量 PORT（平台自动注入）
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

// 主函数
async function main() {
  logStep('ESA 容器模式构建后处理');

  const rootDir = process.cwd();
  const nextDir = path.join(rootDir, '.next');
  const standaloneDir = path.join(nextDir, 'standalone');

  // 检查 .next/standalone 是否存在
  if (!fs.existsSync(standaloneDir)) {
    log('❌ 错误：.next/standalone 目录不存在', 'red');
    log('   请确保 next.config.ts 中配置了 output: "standalone"', 'red');
    log('   运行命令：npm run build:esa-container', 'red');
    process.exit(1);
  }

  // 复制 esa-server.js 到 standalone 目录
  log('📦 复制 ESA 服务器文件...');
  const esaServerSrc = path.join(rootDir, 'esa-server.js');
  const esaServerDest = path.join(standaloneDir, 'esa-server.js');

  if (fs.existsSync(esaServerSrc)) {
    fs.copyFileSync(esaServerSrc, esaServerDest);
    log('  ✅ esa-server.js 复制完成', 'green');
  } else {
    log('  ❌ esa-server.js 不存在', 'red');
    process.exit(1);
  }

  // 复制 public 到 standalone 目录
  log('📦 复制 public 目录...');
  const publicSrc = path.join(rootDir, 'public');
  const publicDest = path.join(standaloneDir, 'public');

  if (fs.existsSync(publicSrc)) {
    copyDirectory(publicSrc, publicDest);
    log('  ✅ public 目录复制完成', 'green');
  } else {
    log('  ⚠️  public 目录不存在', 'yellow');
  }

  // 复制 .next/static 到 standalone/.next/static
  log('📦 复制静态资源...');
  const staticSrc = path.join(nextDir, 'static');
  const staticDest = path.join(standaloneDir, '.next', 'static');

  if (fs.existsSync(staticSrc)) {
    copyDirectory(staticSrc, staticDest);
    log('  ✅ 静态资源复制完成', 'green');
  } else {
    log('  ⚠️  .next/static 目录不存在', 'yellow');
  }

  // 创建 ESA 配置文件
  log('📝 生成 ESA 配置...');
  const esaConfig = {
    version: '2.0',
    platform: 'esa-container',
    mode: 'container',
    buildTime: new Date().toISOString(),
    runtime: 'nodejs20',
    startup: {
      command: 'node esa-server.js',
      port: '$PORT',
      env: {
        NODE_ENV: 'production',
        PORT: '$PORT'
      }
    },
    structure: {
      root: '.',
      server: 'esa-server.js',
      static: './public',
      nextStatic: './.next/static'
    }
  };

  fs.writeFileSync(
    path.join(standaloneDir, 'esa-container.json'),
    JSON.stringify(esaConfig, null, 2)
  );
  log('  ✅ 配置文件生成完成', 'green');

  // 完成
  logStep('构建后处理完成');
  log('✅ ESA 容器部署包已生成', 'green');
  log('\n部署目录: .next/standalone/', 'blue');
  log('\n在 ESA 平台配置:', 'blue');
  log('  1. 部署方式: 容器模式');
  log('  2. 上传目录: .next/standalone/');
  log('  3. 启动命令: node esa-server.js');
  log('  4. 端口: 使用环境变量 $PORT');
  log('\n生成的目录结构:', 'blue');
  log('  .next/standalone/');
  log('  ├── esa-server.js       ← 启动文件');
  log('  ├── esa-container.json  ← ESA 配置');
  log('  ├── package.json');
  log('  ├── node_modules/       ← 依赖包');
  log('  ├── .next/');
  log('  │   └── static/        ← Next.js 静态资源');
  log('  └── public/            ← 公共资源');
}

// 执行
main().catch((error) => {
  log(`\n❌ 错误: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
