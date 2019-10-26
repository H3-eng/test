/*
 *@author: huangjianhui
 *@date: 2019/10/17
 *@description: 应用公用函数
 */
import axios from 'axios'
/**
* @Description:判断应用有无登陆
 * 若主应用已经登陆，在sessionStorage拿cookie值去请求接口登陆
 * 若主应用未登陆，则跳转到登陆页面
 * 待优化：记录未登陆前打开的页面，登陆后直接跳转到改页面
 * @author huangjianhui
 * @date 2019/10/17
 * @param:scode(子系统代码）
 * @return mpdata(系统信息)
*/
export const isLogin=function (scode) {
  //去sessionStorage拿cookie尝试登陆，若失败则跳转登录页
  document.cookie="name="+sessionStorage.getItem('cookie')
  return new Promise((resolve,reject)=>{
    axios.get('/mainWeb/mpdata',{
      params:scode?scode:null
    })
      .then(res=>{
        if(Object.prototype.toString.call(res.data)=="[object String]"){
          if(res.data.indexOf('mainWeb登录页')){
            window.location.href='/login.html'
          }
        }
        resolve(res)
      })
      .catch(error=>{
        reject(error.response)
      })
  })
}
