const path=require('path')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports={
  //开发环境配置
  dev:{
    //接口代理地址
    proxy:[{
      //需代理的应用
      context:['/cas','/mainWeb','/public'],
      //代理目标主机
      target:'http://192.168.10.129',
      //代理域名
      changeOrigin: true,
      // 利用node.js重写domain,解决tomcat接口重定向（302）导致接口跨域问题
      hostRewrite:'localhost:8081'
    },{
      //需代理的应用
      context:['/logUpdate'],
      //代理目标主机
      target:'http://192.168.10.9:8090',
      //代理域名
      changeOrigin: true,
      // 利用node.js重写domain,解决tomcat接口重定向（302）导致接口跨域问题
      hostRewrite:'localhost:8081'
    }],
    //host
    host:'localhost',
    //端口
    port:8081,
    //开发路径别名
    alias:{
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
      '_c':resolve('src/component'),
      '_p':resolve('src/pages'),
      '_w':resolve('src/webgis/components')
    },
    //自动解析拓展
    extensions:['.js', '.vue', '.scss']
  },
  build:{
    //输出目标目录
    //输出目录
    assetsRoot:resolve('./mainProject'),
    //输出静态资源目录
    assetsSubDir:'static',
    //sourcemap配置
    sourcemap:false,
    //是否开启gzip
    gzip:false,
    //开启bundleAnalyzerReport
    bundleAnalyzerReport:false
  }
}
