/**
 * Aliyun Function Compute Handler for Next.js
 *
 * 用途：将阿里云函数计算的 HTTP 事件转换为 Next.js 可处理的请求
 *
 * 架构流程：
 * 阿里云 HTTP 触发器 → exports.handler → 解析事件 → 伪造 Node.js req/res → Next.js 处理 → 返回响应
 */

const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const { handle: nextHandle } = require('./server.js');

// Next.js 实例初始化标记
let isAppReady = false;

/**
 * 初始化 Next.js 应用
 */
async function initializeApp() {
  if (!isAppReady) {
    await require('./server.js').app.prepare();
    isAppReady = true;
  }
}

/**
 * 伪造 Node.js IncomingMessage 对象
 */
class MockIncomingMessage extends http.IncomingMessage {
  constructor(event) {
    super({});

    // 解析 URL
    const queryString = Object.entries(event.queryParameters || {})
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');

    const fullPath = queryString ? `${event.path}?${queryString}` : event.path;
    const parsedUrl = url.parse(fullPath, true);

    // 基础属性
    this.method = event.httpMethod || 'GET';
    this.url = fullPath;
    this.headers = event.headers || {};
    this.httpVersion = '1.1';
    this.httpVersionMajor = 1;
    this.httpVersionMinor = 1;

    // URL 相关属性
    this.pathname = parsedUrl.pathname;
    this.query = parsedUrl.query;

    // Body 处理
    this._body = event.body || '';
    this._bodyIsBase64 = event.isBase64Encoded || false;

    // 初始化可读流
    this._readableState = {
      flowing: null,
      ended: false,
      endEmitted: false
    };
  }

  /**
   * 覆盖 _read 方法（Next.js 可能会调用）
   */
  _read() {
    if (!this._readableState.ended) {
      this.push(this._body);
      this.push(null);
      this._readableState.ended = true;
      this._readableState.endEmitted = false;
    }
  }
}

/**
 * 伪造 Node.js ServerResponse 对象
 */
class MockServerResponse extends http.ServerResponse {
  constructor() {
    super({ method: 'GET' });

    this._statusCode = 200;
    this._headers = {};
    this._headersSent = false;
    this._bodyChunks = [];
    this._finished = false;

    // 初始化可写流
    this._writableState = {
      ended: false,
      ending: false,
      finished: false
    };

    // 模拟底层连接
    this.connection = {
      writable: true,
      destroyed: false
    };
  }

  /**
   * 写入响应头
   */
  writeHead(statusCode, headers) {
    this._statusCode = statusCode;
    if (headers) {
      Object.assign(this._headers, headers);
    }
    this._headersSent = true;
  }

  /**
   * 设置响应头
   */
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
  }

  /**
   * 获取响应头
   */
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }

  /**
   * 移除响应头
   */
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }

  /**
   * 是否已发送响应头
   */
  headersSent {
    return this._headersSent;
  }

  /**
   * 写入响应体
   */
  write(chunk, encoding, callback) {
    if (typeof chunk === 'string') {
      this._bodyChunks.push(Buffer.from(chunk, encoding || 'utf8'));
    } else {
      this._bodyChunks.push(chunk);
    }

    if (callback) {
      process.nextTick(callback);
    }
    return true;
  }

  /**
   * 结束响应
   */
  end(chunk, encoding, callback) {
    if (chunk) {
      this.write(chunk, encoding);
    }

    this._finished = true;
    this._writableState.ended = true;
    this._writableState.finished = true;

    if (callback) {
      process.nextTick(callback);
    }
  }

  /**
   * 获取最终的响应数据
   */
  getResponse() {
    const body = Buffer.concat(this._bodyChunks);

    return {
      statusCode: this._statusCode,
      headers: this._headers,
      body: body.toString('utf8')
    };
  }
}

/**
 * 阿里云函数计算入口函数
 * @param {Object} event - HTTP 事件对象
 * @param {Object} context - 函数运行时上下文
 * @returns {Object} 阿里云标准响应格式
 */
exports.handler = async (event, context) => {
  try {
    // 1. 初始化 Next.js 应用（仅首次）
    await initializeApp();

    // 2. 解析请求路径（阿里云可能提供 path 或 requestContext.path）
    const eventPath = event.path || event.requestContext?.path || '/';

    // 3. 构造完整的 event 对象（处理不同触发器格式）
    const normalizedEvent = {
      path: eventPath,
      httpMethod: event.httpMethod || event.requestContext?.httpMethod || 'GET',
      headers: normalizeHeaders(event.headers || {}),
      queryParameters: event.queryParameters || event.queryStringParameters || {},
      body: event.body || null,
      isBase64Encoded: event.isBase64Encoded || false
    };

    // 4. 创建伪造的 Node.js 请求和响应对象
    const req = new MockIncomingMessage(normalizedEvent);
    const res = new MockServerResponse();

    // 5. 调用 Next.js 处理请求
    await new Promise((resolve, reject) => {
      try {
        nextHandle(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });

    // 6. 获取响应并转换为阿里云格式
    const response = res.getResponse();

    // 7. 返回阿里云标准响应格式
    return {
      isBase64Encoded: false,
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body
    };

  } catch (error) {
    console.error('Function Compute Error:', error);

    // 返回错误响应
    return {
      isBase64Encoded: false,
      statusCode: 500,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};

/**
 * 标准化请求头（统一转为小写）
 */
function normalizeHeaders(headers) {
  const normalized = {};
  for (const [key, value] of Object.entries(headers)) {
    normalized[key.toLowerCase()] = value;
  }
  return normalized;
}
