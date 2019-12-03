export default {
  //登陆获取token
  login:(data,config)=>axios.get('/cas/oauth2.0/token',data,config),
  //获取所有子系统信息
  listAllSubSystems:()=>axios.get('/mainweb/public/listAllSubSystems')
}

