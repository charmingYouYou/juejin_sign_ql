/*
掘金签到抽奖
更新地址：https://github.com/charmingYouYou/juejin_sign_ql

[task_local]
#掘金签到抽奖
1 1 0 * * * juejin_sign.js, tag=掘金签到抽奖, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
 */
const axios = require('axios')
const { sendNotify } = require('./sendNotify.js')
const { autoGame } = require('./autoGame')
const COOKIE = process.env.JUEJIN_COOKIE || ''
const ALL_IN = process.env.JUEJIN_ALL_IN || ''
const USER_ID = process.env.JUEJIN_USER_ID || ''

let msg = ''
function sendNotifyFn(msg) {
  sendNotify('掘金签到抽奖', msg)
}

const defaultOptions = {
  method: 'GET',
  data: {},
  params: {},
  headers: {
    origin: 'https://juejin.cn',
    pragma: 'no-cache',
    referer: 'https://juejin.cn/',
    'sec-ch-ua':
      '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
  },
}

function juejinApi(cookie) {
  return {
    check_in: function () {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/check_in',
        headers: {
          cookie,
        },
      })
    },
    draw: function () {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/lottery/draw',
        headers: {
          cookie,
        },
      })
    },
    get_cur_point: function () {
      return request({
        method: 'GET',
        url: 'https://api.juejin.cn/growth_api/v1/get_cur_point',
        headers: {
          cookie,
        },
      })
    },

    /**
     * 获取沾喜气中奖列表
     * @returns Promise<any>
     */
     get_dip_lucky_list: function () {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/lottery_history/global_big',
        headers: {
          cookie
        },
        data: { page_no: 1, page_size: 5 }
      })
    },

    /**
     * 沾喜气
     * @param {string | number} id
     * @returns Promise<any>
     */
    dip_lucky: function (id) {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky',
        headers: {
          cookie
        },
        data: { lottery_history_id: id }
      })
    }
  }
}

function request(options) {
  return new Promise((resolve, reject) => {
    axios(assignOption(defaultOptions, options))
      .then(res => {
        let data = res.data || {}
        if (data.err_no === 0) {
          resolve(data.data)
        } else {
          msg += `请求失败: ${data.err_msg} \n`
          reject(data)
        }
      })
      .catch(err => {
        msg += `请求失败: ${err.message} \n`
        reject(err)
      })
  })
}

function assignOption(ops1, ops2) {
  let ops = Object.assign({}, ops1, ops2)
  let keys = Object.keys(ops1)
  keys.forEach(item => {
    if (typeof ops1[item] === 'object' && !Array.isArray(ops1[item])) {
      ops[item] = Object.assign({}, ops1[item], ops2[item] || {})
    }
  })
  return ops
}

async function init() {
  if (!COOKIE) {
    sendNotifyFn('获取不到cookie，请检查设置')
  } else {
    const api = juejinApi(COOKIE)

    // 获取可抽奖次数
    async function get_raw_time() {
      const res = await api.get_cur_point()
      return Math.floor(res / 200)
    }

    // 抽奖一次
    async function draw() {
      const res = await api.draw()
      msg += `抽奖结果: 抽奖成功，获得：${res.lottery_name}\n`
      return res
    }

    // 沾福气
    async function dipLucky() {
      const RANDOM_NUMBER = Math.floor(Math.random() * 5)
      const { lotteries } = await api.get_dip_lucky_list()
      const DIP_LUCKY_ID = lotteries?.[RANDOM_NUMBER]?.history_id ?? 0
      const { has_dip, dip_action, total_value } = await api.dip_lucky(DIP_LUCKY_ID)
      if (has_dip) {
        msg += `沾喜气: 今日已沾过喜气, 当前喜气值: ${total_value}\n`
        return
      }
      if (dip_action === 1) {
        msg += `沾喜气: 沾喜气成功! 当前喜气值: ${total_value}\n`
        return 
      }
    }

    // 抽所有
    async function draw_all() {
      const time = await get_raw_time()
      msg += `抽奖梭哈: 可抽奖次数${time}\n`
      if (!time) {
        msg += `抽奖梭哈: 抽奖完成\n`
      }

      for (let i = 0; i < time; i++) {
        await draw()
      }

      if (await get_raw_time()) {
        draw_all()
      }
    }

    try {
      await api.check_in()
      msg += `签到结果: 签到成功 \n`
      if (ALL_IN === 'true') {
        await draw_all()
      } else {
        await draw()
      }
      await dipLucky()
    } catch (error) {
      msg += `${error.err_msg}\n`
    }
    if (USER_ID) {
      autoGame(COOKIE, USER_ID)
      msg += '自动挖矿: 开始自动挖矿\n'
    } else {
      msg += '自动挖矿: 没有找到userId, 不执行挖矿游戏\n'
    }
    sendNotifyFn(msg)
  }
}

init()
