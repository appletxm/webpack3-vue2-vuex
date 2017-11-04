var path = require('path'),
  fs = require('fs'),
  serverProxy = require('./serverProxy'),
  isMock = false,
  serverRouter,
  env = require('../config/env')

function getMockFile (reqPath, res) {
  reqPath = reqPath.replace('/api', '')
  reqPath = path.join(__dirname, '../mock' + reqPath)

  fs.readFile(reqPath, function (err, result) {
    var result = JSON.parse(String(result))
    if (err) {
      res.send(err)
    }else {
      res.set('content-type', 'application/json')
      res.send(result)
    }
    res.end()
  })
}

function getProxyConfig () {
  return {
    host: env['development']['api']['host'], // 这里是代理服务器       
    port: env['development']['api']['port'], // 这里是代理到的服务器端口 
  }
}

serverRouter = {
  '*': function (req, res, next) {
    console.info('[req info]', req.path, req.baseUrl, req.params)
    next()
  },

  '/api': function (req, res, next) {
    var reqPath = req.path

    if (process.env.NODE_ENV === 'mock') {
      isMock = true
      getMockFile(reqPath, res)
    }else if (process.env.NODE_ENV === 'development') {
      //   console.info('****************', req)
      serverProxy.doProxy(getProxyConfig(), req, res)
    }
    if (next) {
      next()
    }
  },

  '/': function (req, res, compiler, next) {
    // TODO compiler.outputPath is equal to the webpack publickPath
    var filename = path.join(compiler.outputPath, 'index.html')
    // console.info('####', compiler.outputPath, path.join(compiler.outputPath, 'index.html'))

    compiler.outputFileSystem.readFile(filename, function (err, result) {
      if (err) {
        res.send(err)
      }else {
        res.set('content-type', 'text/html')
        res.send(result)
      }
      res.end()

      if (next) {
        next()
      }
    })
  }
}

module.exports = serverRouter
