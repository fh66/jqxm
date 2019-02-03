import axios from 'axios'
// 将axios封装为vue的插件
var myaxios = {}
myaxios.install = function (Vue) {

  // 设置请求统一路径
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  // 挂在到原型中
  Vue.prototype.$http = axios

}
// 暴露
export default myaxios

