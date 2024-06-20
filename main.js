const express = require('express');

const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();
console.log(`Start forward all req to: `, process.env.TARGET_PROXY)

const proxyMiddleware = createProxyMiddleware({
    target: process.env.TARGET_PROXY,
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req, res) => {
            console.log({method: proxyReq.method, request: proxyReq?.path})
        },
        proxyRes: (proxyRes, req, res) => {
        },
        error: (err, req, res) => {
            console.log({error: err})
        }
    }
});
const prefix = process.env.PREFIX_PROXY_PATH || '/'

app.use(prefix, proxyMiddleware);

const port = process.env.PROXY_PORT || 5555
console.log("App listen at port: ", port, "Prefix: ", prefix)
app.listen(port);