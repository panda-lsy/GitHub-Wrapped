#!/usr/bin/env node

/**
 * ESA 平台 Index 模式构建后处理脚本
 *
 * 用途：将 index.js 入口文件和 Next.js 依赖复制到项目根目录
 *        这样 ESA 平台的"函数文件路径"配置为 "." 或 "./index.js" 就能找到
 *
 * 使用方法：
 *   npm run build:esa-index
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
  logStep('ESA Index 模式构建后处理');

  const rootDir = process.cwd();
  const nextDir = path.join(rootDir, '.next');
  const standaloneDir = path.join(nextDir, 'standalone');

  // 检查 standalone 目录是否存在
  if (!fs.existsSync(standaloneDir)) {
    log('❌ 错误：.next/standalone 目录不存在', 'red');
    log('   请确保 next.config.ts 中配置了 output: "standalone"', 'red');
    log('   运行命令：npm run build:esa-index', 'red');
    process.exit(1);
  }

  // 复制 standalone/node_modules 到项目根目录
  log('📦 复制 node_modules...');
  const srcNodeModules = path.join(standaloneDir, 'node_modules');
  const destNodeModules = path.join(rootDir, 'node_modules');

  if (fs.existsSync(srcNodeModules)) {
    copyDirectory(srcNodeModules, destNodeModules);
    log('  ✅ node_modules 复制完成', 'green');
  } else {
    log('  ⚠️  standalone/node_modules 不存在', 'yellow');
  }

  // 复制 .next 到项目根目录
  log('📦 复制 .next 目录...');
  const srcNext = path.join(standaloneDir, '.next');
  const destNext = path.join(rootDir, '.next');

  if (fs.existsSync(srcNext)) {
    copyDirectory(srcNext, destNext);
    log('  ✅ .next 目录复制完成', 'green');
  } else {
    log('  ⚠️  standalone/.next 不存在', 'yellow');
  }

  // 确保 index.js 存在
  log('📝 检查 index.js...');
  const indexJs = path.join(rootDir, 'index.js');

  if (!fs.existsSync(indexJs)) {
    log('  ❌ index.js 不存在', 'red');
    process.exit(1);
  } else {
    log('  ✅ index.js 已存在', 'green');
  }

  // 复制 package.json 从 standalone
  log('📝 更新 package.json...');
  const standalonePackageJson = path.join(standaloneDir, 'package.json');

  if (fs.existsSync(standalonePackageJson)) {
    const packageJson = JSON.parse(fs.readFileSync(standalonePackageJson, 'utf-8'));

    // 添加 main 字段指向 index.js
    packageJson.main = 'index.js';

    fs.writeFileSync(
      path.join(rootDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    log('  ✅ package.json 已更新', 'green');
  }

  // 创建部署清单
  log('📝 生成部署清单...');
  const manifest = {
    version: '3.0',
    platform: 'esa-serverless-index',
    mode: 'index',
    buildTime: new Date().toISOString(),
    entryPoint: './index.js',
    structure: {
      root: '.',
      entry: 'index.js',
      nodeModules: './node_modules',
      nextBuild: './.next',
      public: './public',
    },
    config: {
      functionPath: '.', // 或 './index.js'
      runtime: 'nodejs20',
    },
  };

  fs.writeFileSync(
    path.join(rootDir, 'esa-index-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  log('  ✅ 部署清单生成完成', 'green');

  // 完成
  logStep('构建后处理完成');
  log('✅ ESA Index 模式部署包已生成', 'green');
  log('\n在 ESA 平台配置:', 'blue');
  log('  1. 安装命令: npm install (如果需要)');
  log('  2. 构建命令: npm run build:esa-index');
  log('  3. 函数文件路径: . 或 ./index.js');
  log('  4. 运行时: Node.js 20');
  log('\n部署目录结构:', 'blue');
  log('  项目根目录/');
  log('  ├── index.js              ← ESA 入口文件');
  log('  ├── package.json          ← 包配置 (main: index.js)');
  log('  ├── node_modules/         ← 依赖包');
  log('  ├── .next/                ← Next.js 构建');
  log('  │   ├── server/           ← 服务器代码');
  log('  │   └── static/           ← 静态资源');
  log('  └── public/               ← 公共资源');
  log('\n生成的文件:', 'blue');
  log('  - index.js');
  log('  - esa-index-manifest.json');
}

// 执行
main().catch((error) => {
  log(`\n❌ 错误: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
