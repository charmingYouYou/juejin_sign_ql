const request = require('./request')

module.exports = function (cookie) {
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
  }
}
