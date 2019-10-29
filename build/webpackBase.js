const path=require('path');
const fs=require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack =require('webpack')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
function assetsPath(_path) {
  return path.posix.join(config.build.assetsSubDir, _path)
}
const devModel=process.env.NODE_ENV !== 'production'?true:false
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config=require('./config');

const page=fs.readdirSync(resolve('src/pages'))
let enterArr={}
let htmlplugin=[]
/**
 * @desicription:动态加载page下面所有页面的${name}.js作为入口文件
 * 并生成html-plugin
 * @author huangjianhui
 * @date 2019/9/21
 */
page.forEach(item=>{
  enterArr[item]=`./src/pages/${item}/${item}.js`,
  htmlplugin.push(
    new HtmlWebpackPlugin({
      entryName: item,
      filename: `${item}.html`,
      template: `./src/pages/${item}/${item}.html`,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: "dependency",
      chunks: ['vendors','commons',item]
    })
  )
})
const webpackconfig= {
  entry:enterArr,
  resolve: {
    extensions:config.dev.extensions,
    alias:config.dev.alias
  },
  devServer: {
    proxy:config.dev.proxy,
    hot: true,
    port:config.dev.port,
    host: 'localhost'
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
    new VueLoaderPlugin(),
    ...htmlplugin,
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default']
    })
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
