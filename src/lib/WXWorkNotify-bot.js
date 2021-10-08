const WXWorkNotify = require('./WXWorkNotify.js')
const config = require('./config.js')

let msg = ''
let timer = ''
module.exports = function bot(message) {
  msg += message
  
  timer && clearTimeout(timer)
  timer = setTimeout(function(){
    WXWorkNotify({
        id: config.WX_COMPANY_ID, // 企业 ID
        agentId: config.WX_APP_ID, // 应用 ID
        secret: config.WX_APP_SECRET, // 应用 secret
        msgData: {
          msgtype: "text",
          text: {
            content: msg
          }
        }
      });
  }, 500)
    
}
