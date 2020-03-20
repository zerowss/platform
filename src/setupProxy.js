const { createProxyMiddleware } = require('http-proxy-middleware');
//before
module.exports = (app)=>{
    app.use(
      createProxyMiddleware("/api", {
        target: 'http://phecda.t.mlwplus.com',
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      })
    );
};


