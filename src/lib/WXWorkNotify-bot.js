const WXWorkNotify = require('./WXWorkNotify.js')
const config = require('./config.js')

let msg = ''
let timer = ''
module.exports = function bot(message) {
  msg += message
  
  timer && clearTimeout(timer)
  timer = setTimeout(function(){
    WXWorkNotify({
        id: config.WXCompanyId, // 企业 ID
        agentId: config.WXAppId, // 应用 ID
        secret: config.WXAppSecret, // 应用 secret
        msgData: {
          msgtype: "text",
          text: {
            content: msg
          }
        }
      });
  }, 500)
    
}
