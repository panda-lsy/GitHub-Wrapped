const next = require('next');

// Set environment
process.env.NODE_ENV = 'production';

// Initialize Next.js app (standalone directory is the current dir)
const app = next({
  dev: false,
  dir: '.',
});

const handle = app.getRequestHandler();

// Prepare app once at startup
let isPrepared = false;
const preparePromise = app.prepare().then(() => {
  isPrepared = true;
  console.log('Next.js app prepared');
});

// Export handler for ESA
module.exports.handler = async (event, context) => {
  // Wait for app to be ready
  await preparePromise;

  // Parse event
  const reqPath = event.path || '/';
  const method = event.method || 'GET';
  const headers = event.headers || {};
  const queryString = event.queryStringParameters || {};

  // Build full URL with query string
  const queryStringStr = Object.entries(queryString)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  const fullUrl = reqPath + (queryStringStr ? `?${queryStringStr}` : '');

  // Create mock request
  const req = {
    method,
    url: fullUrl,
    headers,
  };

  // Collect response data
  let responseData = Buffer.from('');
  const responseHeaders = {};
  let statusCode = 200;

  // Create mock response
  const res = {
    statusCode: 200,
    status(code) {
      statusCode = code;
      return this;
    },
    setHeader(name, value) {
      responseHeaders[name] = value;
    },
    getHeader(name) {
      return responseHeaders[name];
    },
    getHeaders() {
      return responseHeaders;
    },
    write(data) {
      if (Buffer.isBuffer(data)) {
        responseData = Buffer.concat([responseData, data]);
      } else {
        responseData = Buffer.concat([responseData, Buffer.from(data)]);
      }
    },
    end(data) {
      if (data) {
        this.write(data);
      }
    },
    send(data) {
      if (data) {
        responseData = Buffer.isBuffer(data) ? data : Buffer.from(data);
      }
    },
  };

  // Handle the request
  await handle(req, res);

  // Convert buffer to string for response
  const bodyStr = responseData.toString('utf-8');

  // Return ESA response format
  return {
    statusCode,
    headers: responseHeaders,
    body: bodyStr,
  };
};
