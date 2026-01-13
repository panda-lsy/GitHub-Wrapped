/**
 * ESA 平台入口文件
 *
 * 用途：作为 ESA 平台的函数入口点，直接处理 Next.js 请求
 *
 * 支持两种模式：
 * 1. 函数模式：exports.handler(event, context) - 每次 HTTP 请求调用
 * 2. 服务器模式：直接运行此文件启动 HTTP 服务器
 */

const path = require('path');

// 添加模块搜索路径（支持 standalone 输出）
// 在 standalone 模式下，优化的依赖在 .next/standalone/node_modules
const standaloneModules = path.join(__dirname, '.next', 'standalone', 'node_modules');
if (require('fs').existsSync(standaloneModules)) {
  require('module').Module.globalPaths.push(standaloneModules);
}

const next = require('next');
const { parse } = require('url');

// 创建 Next.js 实例（使用 standalone 输出）
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Next.js 准备状态
let isAppReady = false;

// 确保应用已准备就绪
async function ensureAppReady() {
  if (!isAppReady) {
    await app.prepare();
    isAppReady = true;
  }
  return app;
}

/**
 * 方案 A: 函数计算模式 Handler
 *
 * 如果 ESA 平台使用函数计算模式（每次请求调用一次 handler）
 */
async function handler(event, context) {
  await ensureAppReady();

  // 模拟 Node.js HTTP 请求和响应对象
  const req = {
    method: event.httpMethod || event.method || 'GET',
    url: event.path || event.url || '/',
    headers: event.headers || {},
    body: event.body || null,
  };

  const res = {
    statusCode: 200,
    headers: {},
    body: '',

    setHeader(name, value) {
      this.headers[name] = value;
    },

    getHeader(name) {
      return this.headers[name];
    },

    status(code) {
      this.statusCode = code;
      return this;
    },

    send(data) {
      this.body = data;
    },

    json(data) {
      this.setHeader('Content-Type', 'application/json');
      this.body = JSON.stringify(data);
    },

    end(data) {
      if (data) this.body = data;
    },
  };

  // 让 Next.js 处理请求
  const parsedUrl = parse(req.url, true);

  try {
    await handle(req, res, parsedUrl);

    // 返回 ESA 平台期望的响应格式
    return {
      isBase64Encoded: false,
      statusCode: res.statusCode,
      headers: res.headers,
      body: res.body || '',
    };
  } catch (error) {
    console.error('Handler error:', error);
    return {
      isBase64Encoded: false,
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}

/**
 * 方案 B: HTTP 服务器模式
 *
 * 如果 ESA 平台支持长时间运行的 HTTP 服务器
 */
async function startServer() {
  await ensureAppReady();

  const { createServer } = require('http');
  const hostname = '0.0.0.0';
  const port = parseInt(process.env.PORT, 10) || 3000;

  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    })
    .on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });
}

// 导出 handler（函数模式）
module.exports = { handler, app, handle };

// 如果直接运行此文件，启动 HTTP 服务器
if (require.main === module) {
  startServer();
}
