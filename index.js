const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/proxy', createProxyMiddleware({
  target: 'https://www.netflix.com',
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' },
  onProxyRes(proxyRes, req, res) {
    // Strip security headers so iframe embedding works
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['content-security-policy-report-only'];
    delete proxyRes.headers['strict-transport-security'];
    delete proxyRes.headers['cross-origin-embedder-policy'];
    delete proxyRes.headers['cross-origin-opener-policy'];
    delete proxyRes.headers['cross-origin-resource-policy'];
  },
  onError(err, req, res) {
    res.status(500).send('Proxy error: ' + err.message);
  }
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
