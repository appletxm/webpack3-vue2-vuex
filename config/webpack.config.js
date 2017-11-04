var path = require('path')
var webpack = require('webpack')
var HtmlWebPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')
var envConfig = require('./env')
var envKeyWord = (process.argv)[2]

var env = envConfig[envKeyWord]
var publicPath = env.publicPath
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'
var vendorPath, cssPath
var sourcePath, distPath
var webpackConfig

process.env.NODE_ENV = envKeyWord
sourcePath = path.join(__dirname, env.sourcePath)
distPath = path.join(__dirname, env.distPath)

console.info('***current env***', envKeyWord, __dirname)

webpackConfig = {
  entry: {
    app: [],
    vendor: ['axios', 'es6-promise', 'mint-ui', 'vue', 'vuex', 'vue-router']
  },
  output: {
    filename: (envKeyWord === 'development' || envKeyWord === 'mock') ? 'js/[name].js' : 'js/[name].min.[hash:7].js',
    path: path.resolve('./dist'),
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          context: 'client',
          name: (envKeyWord === 'development' || envKeyWord === 'mock') ? '[path][name].[ext]' : 'assets/imgs/[name].[hash:7].[ext]',
          outputPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '' : 'assets/imgs/',
          publicPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '' : '../'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          context: 'client',
          name: (envKeyWord === 'development' || envKeyWord === 'mock') ? '[path][name].[ext]' : 'assets/fonts/[name].[hash:7].[ext]',
          outputPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '' : 'assets/fonts/',
          publicPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '' : '../'
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: [path.join(__dirname, '..', 'src')]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.less', '.css', '.html', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      'vue': 'vue/dist/vue.min.js',
      'pages': path.join(__dirname, '../src/js/pages/'),
      'components': path.join(__dirname, '../src/js/components/'),
      'assets': path.join(__dirname, '../src/assets/'),
      'common': path.join(__dirname, '../src/js/common/')
    }
  },
  plugins: []
}

if (envKeyWord === 'development' || envKeyWord === 'mock') {
  vendorPath = '../dist/js/vendor.js'
  cssPath = 'css/[name].[hash:7].css'
  webpackConfig.entry.app = [hotMiddlewareScript, path.resolve('./src/js/index.js')]
  webpackConfig.devtool = 'source-map'
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
} else {
  vendorPath = 'js/vendor.min.[hash:7].js'
  cssPath = 'css/[name].min.[hash:7].css'
  webpackConfig.entry.app = [path.resolve('./src/js/index.js')]
  webpackConfig.devtool = 'cheap-source-map'
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  )
}

webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: vendorPath }),
  new CopyPlugin([{ from: path.join(__dirname, '../src/assets'), to: path.join(__dirname, '../dist/assets') }]),
  new ExtractTextPlugin(cssPath),
  new HtmlWebPlugin({
    title: 'Smart Sampling',
    filename: path.join(__dirname, '../dist/', 'index.html'),
    template: path.join(__dirname, '../src/', 'index.ejs'),
    favicon: '',
    inject: 'body',
    libFiles: {
      css: [],
      js: []
    }
  })
)

module.exports = webpackConfig
