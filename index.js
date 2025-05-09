const Proxy = require('http-mitm-proxy');
const proxy = Proxy();

// Optional logging
proxy.onError((ctx, err) => {
  console.error('Proxy error:', err);
});

proxy.onRequest((ctx, callback) => {
  ctx.onResponseHeaders((ctx, callback) => {
    // Strip headers that block iframe embedding
    delete ctx.serverToProxyResponse.headers['x-frame-options'];
    delete ctx.serverToProxyResponse.headers['content-security-policy'];
    callback(null, true);
  });

  return callback();
});

// Start proxy on port 8000
proxy.listen({ port: 8000 }, () => {
  console.log('Proxy listening on port 8000');
});
