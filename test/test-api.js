const api = require('../src/lib/api')('自己的Cookie')

api.draw().then((data) => {
  console.log(`抽奖成功，获得：${data.lottery_name}`)
})
