const DingtalkBot = require('./DingtalkBot')
const config = require('./config')

const bot = new DingtalkBot({
  webhook: config.DINGTALK_WEBHOOK, // Webhook地址
  secret: config.DINGTALK_SECRET, // 安全设置：加签的secret
})

module.exports = bot
