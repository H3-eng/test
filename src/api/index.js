import axios from 'axios'
// import qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

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
  getLog:()=>axios.get('/api/getLog')
}

