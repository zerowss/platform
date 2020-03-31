const { createProxyMiddleware } = require('http-proxy-middleware');
//before
// target: 'http://phecda.t.mlwplus.com/',
module.exports = (app)=>{
    app.use(
      createProxyMiddleware("/api", {
        target: 'http://244ad31c.ngrok.io',
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      })
    );
};


