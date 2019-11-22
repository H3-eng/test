// axios 配置
axios.defaults.timeout = 10000000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
let ticket = JSON.parse(sessionStorage.getItem('loginTicket'))
if (!ticket && window.location.pathname != '/mainProject/login.html'&&
  window.location.pathname != '/mainProject/home.html') {
  //模块开发需先通过网关登陆
  const admin = prompt("账户名", "admin");
  if (admin != null && admin != "") {
    const password = prompt("密码", "Admin123");
    if (password != null && password != "") {
      axios.get('/cas/oauth2.0/token', {
        baseURL: '',
        params: {
          grant_type: 'password',
          client_id: 'sfpasys',
          username: admin,
          password: sha1(password).toUpperCase()
        }
      }).then(res => {
        localStorage.setItem('loginTicket', JSON.stringify(res.data))
        window.location.reload()
      })
        .catch(err => {
          console.log(err.response);
        })
    }
  }
}
axios.defaults.headers['X-AToken'] = ticket['access_token']
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
  Vue.$msg.error('这是一条错误的消息')
  return Promise.reject(error)
}
)
