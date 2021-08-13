const cookie = process.env.COOKIE

if (!cookie) {
  console.error('获取不到cookie，请检查设置')
} else {
  const api = require('./lib/api')(cookie)
  api.check_in().then((data1) => {
    let date = new Date()
    console.log(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 签到成功`,
    )
    api.draw().then((data2) => {
      console.log(`抽奖成功获得：${data2.lottery_name}`)
    })
  })
}
