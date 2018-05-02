import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import addArticle from '@/views/addArticle/addArticle'
import articleList from '@/views/articleList/articleList'
import systemSetup from '@/views/systemSetup/systemSetup'
import editArticle from '@/views/articleList/editArticle'
import articleDetail from '@/views/articleList/articleDetail'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: '首页',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: '仪表盘',
          component: Dashboard
        },
        {
          path: 'addArticle',
          name: '添加文章',
          component: addArticle
        },
        {
          path: 'articleList',
          name: '文章列表',
          component: articleList
        },
        {
          path: 'systemSetup',
          name: '系统设置',
          component: systemSetup
        },
        {
          path: 'editArticle',
          name: '编辑文章',
          component: editArticle
        },
        {
          path: 'articleDetail',
          name: '文章详情',
          component: articleDetail
        }
      ]
    }
  ]
})
