/**
 * 函数计算适配器本地测试脚本
 *
 * 用途：模拟阿里云函数计算的 HTTP 事件，测试 fc-handler.js 是否正常工作
 *
 * 使用方法：
 *   node .fcconfig/test-handler.js
 */

const { handler } = require('../fc-handler.js');

// 模拟阿里云函数计算事件
const mockEvents = [
  {
    name: '首页请求',
    event: {
      path: '/',
      httpMethod: 'GET',
      headers: {
        'host': 'localhost',
        'user-agent': 'test',
        'accept': 'text/html',
      },
      queryParameters: {},
      body: null,
      isBase64Encoded: false,
    },
  },
  {
    name: 'API 会话请求',
    event: {
      path: '/api/session',
      httpMethod: 'GET',
      headers: {
        'host': 'localhost',
        'user-agent': 'test',
        'accept': 'application/json',
      },
      queryParameters: {},
      body: null,
      isBase64Encoded: false,
    },
  },
  {
    name: '静态资源请求',
    event: {
      path: '/favicon.ico',
      httpMethod: 'GET',
      headers: {
        'host': 'localhost',
        'user-agent': 'test',
      },
      queryParameters: {},
      body: null,
      isBase64Encoded: false,
    },
  },
];

// 模拟函数计算上下文
const mockContext = {
  requestId: 'test-request-id',
  credentials: {
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    securityToken: 'test-token',
  },
  function: {
    name: 'nextjs-handler',
    handler: 'index.handler',
    memory: 1024,
    timeout: 30,
  },
  service: {
    name: 'github-wrapped-service',
    logProject: 'test-project',
    logStore: 'test-store',
  },
  region: 'cn-hangzhou',
  accountId: '1234567890',
};

/**
 * 运行单个测试
 */
async function runTest(testCase) {
  console.log(`\n测试: ${testCase.name}`);
  console.log('路径:', testCase.event.path);
  console.log('方法:', testCase.event.httpMethod);

  try {
    const startTime = Date.now();
    const response = await handler(testCase.event, mockContext);
    const duration = Date.now() - startTime;

    console.log('\n✅ 成功');
    console.log('状态码:', response.statusCode);
    console.log('响应时间:', duration, 'ms');
    console.log('响应头:', JSON.stringify(response.headers, null, 2));

    // 显示响应体的前 200 个字符
    const bodyPreview = response.body
      ? response.body.substring(0, 200) + (response.body.length > 200 ? '...' : '')
      : '(empty)';
    console.log('响应体预览:', bodyPreview);

    return { success: true, response, duration };
  } catch (error) {
    console.log('\n❌ 失败');
    console.error('错误:', error.message);
    console.error('堆栈:', error.stack);

    return { success: false, error };
  }
}

/**
 * 运行所有测试
 */
async function runAllTests() {
  console.log('='.repeat(60));
  console.log('函数计算适配器测试');
  console.log('='.repeat(60));

  const results = [];

  for (const testCase of mockEvents) {
    const result = await runTest(testCase);
    results.push({ ...testCase, ...result });
  }

  // 打印测试总结
  console.log('\n' + '='.repeat(60));
  console.log('测试总结');
  console.log('='.repeat(60));

  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;
  const avgDuration = results
    .filter((r) => r.success)
    .reduce((sum, r) => sum + r.duration, 0) / (successCount || 1);

  console.log('总测试数:', results.length);
  console.log('成功:', successCount);
  console.log('失败:', failCount);
  console.log('平均响应时间:', avgDuration.toFixed(0), 'ms');

  if (failCount === 0) {
    console.log('\n✅ 所有测试通过！适配器工作正常。');
  } else {
    console.log('\n⚠️ 部分测试失败，请检查错误信息。');
  }

  return failCount === 0;
}

// 运行测试
runAllTests()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('测试运行失败:', error);
    process.exit(1);
  });
