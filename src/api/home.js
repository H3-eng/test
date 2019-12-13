import axios from 'axios'
export default {
  //获取用户信息
  statistics:()=>axios.get('/api/cats/lv2/statistics')
}
