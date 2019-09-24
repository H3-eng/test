const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpackBase')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
module.exports = merge(baseWebpackConfig, {
  entry: './src/main.js',
  output:{
    path:'/dist'
  },
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
