const NAGETIVE_DIRECTION = {
  U: 'D',
  L: 'R',
  D: 'U',
  R: 'L'
}
const COLUMN = 6
const OBSTACLE = 6
const { Game } = require('./game')
const { sendNotify } = require('./sendNotify.js')

/**
 * @desc 一维数组转二维数组
 * @param {Array} arr 原数据
 * @param {Number} num 每个维度的元素数量
 */
function ArrayOneToTwo(arr, num) {
  let arrList = []
  arr.map((item, index) => {
    if (index % num == 0) {
      arrList.push([item])
    } else {
      arrList[arrList.length - 1].push(item)
    }
  })
  return arrList
}

/**
 * @desc 计算行走轨迹
 * @param {Array} maps 地图
 */
const getTarck = maps => {
  const mapsTrack = [
    [3, 1, 'U'],
    [2, 2, 'L'],
    [4, 2, 'D'],
    [3, 3, 'R']
  ]
  const mapsTree = ArrayOneToTwo(maps, COLUMN)

  // 过滤掉有障碍物的位置
  const trackXY = mapsTrack.filter(item => {
    const xy = mapsTree[item[0]][item[1]]
    return xy !== OBSTACLE
  })

  // 移动后反方向移动回初始位置
  const trackList = trackXY
    .map(item => {
      return [item[2], NAGETIVE_DIRECTION[item[2]]]
    })
    .flat()
  return trackList
}

let runNum = 0
let errorCalled = false // 报错后，尝试再次执行
const autoGame = async (cookie, userId, index) => {
  try {
    runNum++
    if (runNum > 500) return // 防止死循环
    let exp = new Game(userId, cookie)
    let gameData = await exp.openGame()
    console.log(gameData !== undefined ? 'Game Start🎮' : 'Game Start Error❌')
    if (!gameData) return

    const { mapData } = gameData
    const track = getTarck(mapData)
    exp.move(track).then(() => {
      exp.outGame().then(async res => {
        console.log(
          `Game over, Reward: ${res.data.realDiamond}, Today reward: ${res.data.todayDiamond}, Today limit reward: ${res.data.todayLimitDiamond}`
        )
        console.log('10s后开始下一轮游戏🎮,请稍等～')
        if (res.data.realDiamond < 40) {
          // 奖励小于40刷新下地图
          await exp.freshMap()
        }
        // 没达到今日上限继续自动游戏
        if (res.data.todayDiamond < res.data.todayLimitDiamond) {
          setTimeout(() => {
            autoGame(cookie, userId)
          }, 10000) // 设置10s执行一次，防止接口调用太过频繁，服务器报500的错
        } else {
          sendNotify('掘金自动挖矿', `第${index}个用户\ncookie: ${cookie.slice(0, 10)}\nuserId: ${userId}\n今日奖励已达上限！\n今日奖励: ${res.data.todayDiamond}, 今日上限: ${res.data.todayLimitDiamond}`)
          console.log('今日奖励已达上限！')
        }
      })
    })
  } catch (e) {
    console.log('捕获到错误 => ', e)
    if (errorCalled) return
    console.log('20s后尝试再次执行🎮')
    setTimeout(() => {
      errorCalled = true
      autoGame(cookie, userId)
    }, 20000)
  }
}

exports.autoGame = autoGame