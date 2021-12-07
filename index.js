/**
 * [task_local]
 * #掘金签到抽奖
 * 23 1,12,22 * * * https://github.com/charmingYouYou/juejin_sign_ql.git, tag=掘金签到抽奖, enabled=true
 */
const { COOKIE, ALL_IN } = require('./src/lib/config')
const message = require('./src/lib/message')

if (!COOKIE) {
  message('获取不到cookie，请检查设置')
} else {
  const api = require('./src/lib/api')(COOKIE)

  // 获取可抽奖次数
  async function get_raw_time() {
    const res = await api.get_cur_point()
    return Math.floor(res / 200)
  }

  // 抽奖一次
  async function draw() {
    const res = await api.draw()
    message(`抽奖成功，获得：${res.lottery_name}`)
    return res
  }

  // 抽所有
  async function draw_all() {
    const time = await get_raw_time()
    message(`梭哈, 可抽奖次数${time}`)
    if (!time) {
      message(`抽奖完成`)
    }

    for (let i = 0; i < time; i++) {
      await draw()
    }

    if (await get_raw_time()) {
      draw_all()
    }
  }

  api.check_in().then(() => {
    message(`签到成功`)
    if (ALL_IN === 'true') {
      draw_all()
      return
    }
    draw()
  })
}
