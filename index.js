import express from "express";
import cors from "cors";
import {createProxyMiddleware} from "http-proxy-middleware";

const app = express()

app.use(cors())

app.use('/bili', createProxyMiddleware({
    target: 'https://api.bilibili.com', changeOrigin: true, headers: {
        "referer": "https://space.bilibili.com/"
    }, pathRewrite: {
        '^/bili': '/',
    }, onProxyReq: function (proxyReq) {
        proxyReq.setHeader('origin', 'https://www.bilibili.com/')
    }, onProxyRes: function (proxyRes) {
        delete proxyRes.headers['access-control-allow-origin']
        delete proxyRes.headers['access-control-allow-credentials']
    }
}))

app.use('/gravatar', createProxyMiddleware({
    target: 'https://secure.gravatar.com/avatar', changeOrigin: true, headers: {
        "referer": "https://secure.gravatar.com/"
    }, pathRewrite: {
        '^/gravatar': '/',
    }
}))

app.use('/shields', createProxyMiddleware({
    target: 'https://img.shields.io/badge', changeOrigin: true, headers: {
        "referer": "https://img.shields.io/"
    }, pathRewrite: {
        '^/shields': '/',
    }
}))

app.use('/github-profile-summary-cards', createProxyMiddleware({
    target: 'https://github-profile-summary-cards.vercel.app/api', changeOrigin: true, headers: {
        "referer": "https://github-profile-summary-cards.vercel.app/"
    }, pathRewrite: {
        '^/github-profile-summary-cards': '/',
    }
}))

app.use('/notion-api', createProxyMiddleware({
    target: 'https://api.notion.com', changeOrigin: true, pathRewrite: {
        '^/notion-api': '/',
    }
}))

app.use('/notion-icons', createProxyMiddleware({
    target: 'https://www.notion.so/icons', changeOrigin: true, pathRewrite: {
        '^/notion-icons': '/',
    }
}))

app.listen(3000)
