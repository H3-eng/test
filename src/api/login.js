export default {
  login:(data,config)=>axios.get('/cas/oauth2.0/token',data,config)
}

