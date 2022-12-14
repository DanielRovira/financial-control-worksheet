const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
    //   target: 'http://localhost:3001',
      target: 'https://server-backend.onrender.com',
      changeOrigin: true,
    })
  );
};
