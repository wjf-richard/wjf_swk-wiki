import Vue from 'vue'
import Router from 'vue-router'

import detail from '@/views/detail/detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: '详情页',
      component: detail
    }
  ]
})
