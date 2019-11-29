/*
 *@author: huangjianhui
 *@date: 2019/10/17
 *@description: 应用公用函数
 */
/**
* @Description:判断应用有无登陆
 * 若主应用已经登陆，在sessionStorage拿cookie值去请求接口登陆
 * 若主应用未登陆，则跳转到登陆页面
 * 待优化：记录未登陆前打开的页面，登陆后直接跳转到改页面
 * @author huangjianhui
 * @date 2019/10/17
 * @param { String } scode(子系统代码）
 * @return { Array } mpdata(系统信息)
*/
export const isLogin=function (scode) {
  //去sessionStorage拿loginTicket尝试登陆，若失败则跳转登录页
  const ticket=JSON.parse(localStorage.getItem('loginTicket'))
  //如果ticket不存在，直接跳转登陆页
  if(!ticket){
    window.location.href=process.env.NODE_ENV==='production'?'/mainProject/login.html':'/login.html'
  }
  axios.defaults.headers['X-AToken']=ticket['access_token']
  return new Promise((resolve,reject)=>{
    axios.get('/mainWeb/mpdata',{
      params:scode?scode:null
    })
      .then(res=>{
        console.log(res);
        resolve(res)
      })
      .catch(error=>{
        console.log(error.response);
        if(error.response.data.code===-201||error.response.data.code===-110){
          console.log(process.env.NODE_ENV);
          window.location.href=process.env.NODE_ENV==='production'?'/mainProject/login.html':'/login.html'
        }
        reject(error.response)
      })
  })
}
