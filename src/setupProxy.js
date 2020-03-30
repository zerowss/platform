const { createProxyMiddleware } = require('http-proxy-middleware');
//before
// target: 'http://phecda.t.mlwplus.com/',
module.exports = (app)=>{
    app.use(
      createProxyMiddleware("/api", {
        target: 'http://df3119dd.ngrok.io',
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      })
    );
};


