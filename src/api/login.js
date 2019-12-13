import axios from './index.js'
export default {
  //登陆获取token
  login:(data,config)=>axios.get('/cas/oauth2.0/token',data,config),
  //获取所有子系统信息
  listAllSubSystems:()=>axios.get('/mainweb/public/listAllSubSystems'),
  //获取当前用户可用子系统列表
  listSubSystems:()=>axios.get('/mainweb/listSubSystems')
}

