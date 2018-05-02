import axios from 'axios'

const service = axios.create()

service.defaults.timaout = 5000
service.defaults.baseURL = 'http://gateway.mygear.cn/wiki'

export default service
