const express = require('express')
const cors = require('cors')
const {createProxyMiddleware} = require('http-proxy-middleware')

const app = express()

app.use(cors())

app.use('/bili', createProxyMiddleware({
    target: 'https://api.bilibili.com', changeOrigin: true, headers: {
        "referer": "https://space.bilibili.com/"
    }, pathRewrite: {
        '^/bili': '/',
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

app.listen(3000)
