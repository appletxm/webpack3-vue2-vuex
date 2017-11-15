console.info('======my loader 1======')

module.exports = function (source) {
  console.info('======my loader======', source)
  this.cacheable()
  //   return source

  return 'aaaaaaaaaaaaa'
}
