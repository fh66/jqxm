import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import ext from '@/components/ext.vue'
import users from '@/components/user/users.vue'
import rights from '@/components/qxlb/rights.vue'
import roles from '@/components/qxlb/roles.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: {
        name: 'login'
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
      component: ext,
      children: [{
        path: '/users',
        component: users
      },
      {
        path:'/rights',
        component:rights,
      },
      {
        path:'/roles',
        component:roles,
      }
    ]
    }
  ]
})
