const bot = require('./dingtalk-bot')

module.exports = function message(msg) {
  console.log(msg)
  bot.sendMessage(msg)
}
