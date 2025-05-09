const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Proxy all /netflix/* requests
app.use('/netflix', createProxyMiddleware({
  target: 'https://www.netflix.com',
  changeOrigin: true,
  pathRewrite: {
    '^/netflix': '', // remove /netflix from URL
  },
  onProxyRes(proxyRes, req, res) {
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['x-frame-options'];
  }
}));

app.listen(3000, () => {
  console.log('Proxy running on http://localhost:3000');
});
