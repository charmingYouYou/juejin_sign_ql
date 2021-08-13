const DingtalkBot = require('../src/lib/DingtalkBot')

const bot = new DingtalkBot({
  webhook:
    'https://oapi.dingtalk.com/robot/send?access_token=87247f2738a324357674841530ae8b06e8b1f6d805c35c1c56053553406d8a36', // 请填写自己机器人的Webhook地址
  secret: 'SECef27f51664d61c1d218de3f782bb90a4f3ecb1c5a788d0f19a65d9fc40945a99', // 请填写自己机器人加签的secret
})

bot.sendMessage('测试消息').then((res) => {
  console.log(res)
})
