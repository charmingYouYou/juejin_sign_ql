const axios = require('axios')
const message = require('./message')
const { assignOption } = require('./utils')

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

module.exports = function request(options) {
  return new Promise((resolve, reject) => {
    axios(assignOption(defaultOptions, options))
      .then((res) => {
        let data = res.data || {}
        if (data.err_no === 0) {
          resolve(data.data)
        } else {
          message(data.err_msg)
          reject(data)
        }
      })
      .catch((err) => {
        message(err.message)
        reject(err)
      })
  })
}
