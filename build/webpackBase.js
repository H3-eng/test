const path=require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
function assetsPath(_path) {
  return path.posix.join(config.build.assetsSubDir, _path)
}
const devModel=process.env.NODE_ENV !== 'production'?true:false
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config=require('./config');

const webpackconfig= {
  resolve: {
    extensions:config.dev.extensions,
    alias:config.dev.alias
  },
  devServer: {
    proxy:config.dev.proxy,
    hot: true,
    port:config.dev.port,
    host: config.dev.host
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]

    },{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }},
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: assetsPath('images/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
if(devModel){
  webpackconfig.module.rules.push(
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }
  )
}else{
  webpackconfig.module.rules.push(
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader:MiniCssExtractPlugin.loader,
          options:{
            publicPath: '../../'
          }
        },
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }
  )
}
module.exports =webpackconfig
