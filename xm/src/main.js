// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import ElementUi from 'element-ui'
import '@/assets/css/index.css'
// 引入axios
import fzaxios from '@/assets/js/fzaxios.js'
Vue.use(fzaxios)
Vue.use(ElementUi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
