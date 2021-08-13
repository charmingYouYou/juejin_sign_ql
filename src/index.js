const { COOKIE } = require('./lib/config')
const message = require('./lib/message')

if (!COOKIE) {
  message('获取不到cookie，请检查设置')
} else {
  const api = require('./lib/api')(COOKIE)
  api.check_in().then((data1) => {
    let date = new Date()
    message(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 签到成功`,
    )
    api.draw().then((data2) => {
      message(`抽奖成功，获得：${data2.lottery_name}`)
    })
  })
}
