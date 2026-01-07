/**
 * ESA 平台 Next.js 启动文件
 *
 * 用途：为阿里云 ESA 平台提供 Next.js 启动入口
 *
 * 使用方法：
 *   node esa-server.js
 *   或在 package.json 中配置启动命令
 */

const { createServer } = require('http');
const next = require('next');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

// 创建 Next.js 应用
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // 解析请求 URL
      const parsedUrl = parse(req.url, true);

      // 让 Next.js 处理所有请求
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
