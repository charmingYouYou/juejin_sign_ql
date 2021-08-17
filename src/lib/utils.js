module.exports = {
  assignOption(ops1, ops2) {
    let ops = Object.assign({}, ops1, ops2)
    let keys = Object.keys(ops1)
    keys.forEach((item) => {
      if (typeof ops1[item] === 'object' && !Array.isArray(ops1[item])) {
        ops[item] = Object.assign({}, ops1[item], ops2[item] || {})
      }
    })
    return ops
  },
}
