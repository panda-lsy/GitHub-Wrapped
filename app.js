/**
 * ESA 平台 HTTP 服务器启动文件
 *
 * 用途：直接启动 HTTP 服务器，让 ESA 平台的反向代理转发请求
 *
 * 使用方法：
 *   启动命令：node app.js
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

app.prepare().then(() => {
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
});
