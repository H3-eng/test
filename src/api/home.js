export default {
  mpdata:(data)=>axios.get('/mainWeb/mpdata',data),
  getLog:()=>axios.get('/logUpdate/getLog')
}
