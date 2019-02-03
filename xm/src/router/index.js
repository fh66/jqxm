import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import ext from '@/components/ext.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:{
        name:'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/ext',
      name: 'ext',
      component: ext
    }
  ]
})
