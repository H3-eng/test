import axios from 'axios'
// import qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const ticket=JSON.parse(localStorage.getItem('loginTicket'))
// eslint-disable-next-line no-debugger
debugger
if(ticket&&ticket['access_token']){
  axios.defaults.headers['X-AToken']=ticket['access_token']
}
/**
 * 请求之前可以做什么
 */
axios.interceptors.request.use((config) => {
  //post请求序列化
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data);
  }
  return config; //添加这一行
}, (error) => {
  return Promise.reject(error);
});

/**
 * 返回拦截，可以做些什么
 */
axios.interceptors.response.use((res) => {
  return Promise.resolve(res.data)
}, (error) => {
  return Promise.reject(error)
}
)

export default {
  mpdata:(data)=>axios.get('/mainWeb/mpdata',data),
  getLog:()=>axios.get('/logUpdate/getLog'),
  login:(data)=>axios.get('/cas/oauth2.0/token',data)
}

