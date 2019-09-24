const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpackBase');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const config=require('./config');
function assetsPath(_path) {
  return path.posix.join(config.build.assetsSubDir, _path)
}
var webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool:"cheap-source-map",
  entry: {
    app:'./src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].js'),
    publicPath:"./"
  },
  resolve: {
    modules: ['node_modules']
  },
  optimization: {
    minimizer: [
      //webpack4压缩js，支持es6
      new TerserPlugin({
        sourceMap: config.build.sourcemap
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 30000,
          minChunks: 1,
          chunks: 'initial',
          priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
        },
        commons: {
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'commons',
          minSize: 30000,
          minChunks: 3,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    // new BundleAnalyzerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].css'),
      chunkFilename: assetsPath('css/[id].css'),
      ignoreOrder: false
    }),
    new HtmlWebpackPlugin({
      title: 'index.html',
      template: 'index.html',
      hash: true,//防止缓存
      minify: {
        // 压缩选项
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDir,
        ignore: ['.*']
      }
    ])
  ]
});
if(config.build.sourcemap){
  webpackConfig.optimization.minimizer.push(
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true }, // 这里是个大坑
        mergeLonghand: false,
        discardComments: {
          removeAll: true // 移除注释
        },
        map:{
          inline:false,
          annotation: true
        }
      },
      canPrint: true
    })
  )
}else{
  webpackConfig.optimization.minimizer.push(
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true }, // 这里是个大坑
        mergeLonghand: false,
        discardComments: {
          removeAll: true // 移除注释
        }
      },
      canPrint: true
    })
  )
}
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

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig;
