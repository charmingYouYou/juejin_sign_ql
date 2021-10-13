const bot = require('./dingtalk-bot')
const WXWorkNotify = require('./WXWorkNotify-bot.js')


module.exports = function message(msg) {
  console.log(msg)
  bot.sendMessage(msg)
  WXWorkNotify(msg)
}
