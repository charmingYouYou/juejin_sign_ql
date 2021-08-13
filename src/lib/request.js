const axios = require('axios')
const message = require('./message')

const defaultOptions = {
  method: 'GET',
  data: {},
  params: {},
}

module.exports = function request(options) {
  return new Promise((resolve, reject) => {
    axios(Object.assign({}, defaultOptions, options))
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
