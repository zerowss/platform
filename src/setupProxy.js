const { createProxyMiddleware } = require('http-proxy-middleware');
const target = `http://${process.env.ERP_DOMAIN}`;
//before
module.exports = (app)=>{
    app.use(
      createProxyMiddleware("/api", {
        target,
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      })
    );
};


