/**
 * ESA 平台 HTTP 服务器
 *
 * 用途：启动 Next.js HTTP 服务器
 *
 * 使用方法：
 *   启动命令：node server.js
 */

const { createServer } = require('http');
const next = require('next');
const { parse } = require('url');

// 创建 Next.js 实例
const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// 启动服务器
app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });
});

// 导出 Next.js 实例（可选，供其他模块使用）
module.exports = { app, handle };
