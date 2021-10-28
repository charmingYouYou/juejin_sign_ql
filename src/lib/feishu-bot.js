const FeishuBot = require('./FeishuBot')
const config = require('./config')

const feishuBot = new FeishuBot({
    webhook: config.FEISHU_WEBHOOK, // Webhook地址
    secret: config.FEISHU_SECRET, // 安全设置：加签的secret
})

module.exports = feishuBot