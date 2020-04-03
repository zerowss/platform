const { createProxyMiddleware } = require('http-proxy-middleware');
//before
// target: 'http://phecda.t.mlwplus.com/',
module.exports = (app)=>{
    app.use(
      createProxyMiddleware("/api", {
        target: 'http://0700c377.ngrok.io',
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      })
    );
};


