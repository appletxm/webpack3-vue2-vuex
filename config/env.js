module.exports = {
    development: {
        host: '127.0.0.1',
        port: 8089,
        get publicPath() {
            return 'http://' + this.host + ':' + this.port + '/dist/'
        },
        // publicPath: this.host + ':' + this.port + '/dist/',
        distPath: '../dist/',
        sourcePath: '../src/'
    },
    production: {
        publicPath: '',
        distPath: '../dist/',
        sourcePath: '../src/'
    },
    test: {},
    mock: {
        proxy: {
            host: '127.0.0.1',
            port: '5000'
        }
    }
};
