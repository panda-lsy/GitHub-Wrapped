/**
 * Next.js Server Wrapper for Aliyun Function Compute
 *
 * 用途：导出 Next.js 实例供函数计算适配器使用
 *
 * 使用方法：
 * ```javascript
 * const { app, handle } = require('./server.js');
 * await handle(req, res);
 * ```
 */

const next = require('next');

// 创建 Next.js 实例
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

// 导出供函数计算使用
module.exports = { app, handle };
