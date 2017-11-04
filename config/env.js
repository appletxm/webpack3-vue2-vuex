module.exports = {
  development: {
    host: '127.0.0.1',
    port: 8089,
    get publicPath() {
      return 'http://' + this.host + ':' + this.port + '/dist/'
    },
    // publicPath: this.host + ':' + this.port + '/dist/',
    distPath: '../dist/',
    sourcePath: '../src/',
    api: {
      host: '127.0.0.1',
      port: '9000'
    }
  },
  production: {
    publicPath: '',
    distPath: '../dist/',
    sourcePath: '../src/'
  },
  test: {},
  mock: {
    host: '127.0.0.1',
    port: 8089,
    get publicPath() {
      return 'http://' + this.host + ':' + this.port + '/dist/'
    },
    // publicPath: this.host + ':' + this.port + '/dist/',
    distPath: '../dist/',
    sourcePath: '../src/',
    api: {
      host: '127.0.0.1',
      port: '9000'
    }
  }
}
