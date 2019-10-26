const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpackBase')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
module.exports = merge(baseWebpackConfig, {
  output:{
    path:'/dist'
  },
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
