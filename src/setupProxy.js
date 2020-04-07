const { createProxyMiddleware } = require('http-proxy-middleware');
//before
// target: 'http://phecda.t.mlwplus.com/',
module.exports = (app)=>{
    app.use(
      createProxyMiddleware("/api", {
        target: 'http://phecda.t.mlwplus.com/',
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      })
    );
};


