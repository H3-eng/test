const path = require('path');
const webpack = require('webpack');
const config=require('./config');
function assetsPath(_path) {
  return path.posix.join(config.build.assetsSubDir, _path)
}
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
var webpackConfig =  {
  mode: 'production',
  devtool:"cheap-source-map",
  entry: {
    app:'./src/assets.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/assets.js'),
    publicPath:"./"
  },
  module:{
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'

    }]
  },
  externals: {
    vue:{
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    vuex:'vuex'
  },
  resolve: {
    modules: ['node_modules'],
    alias:{
      '@': resolve('src')
    }
  },
  optimization: {
    minimizer: [
      //webpack4压缩js，支持es6
      // new TerserPlugin({
      //   sourceMap: config.build.sourcemap
      // })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
};
if (config.build.gzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: path.posix.join('./gzip','[path].gz[query]'),
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig;
