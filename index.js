const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/proxy', createProxyMiddleware({
  target: 'https://www.netflix.com',
  changeOrigin: true,
  selfHandleResponse: false,
  pathRewrite: { '^/proxy': '' },
  onProxyRes(proxyRes, req, res) {
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
  }
}));

app.listen(3000, () => {
  console.log('Proxy running at http://localhost:3000');
});
