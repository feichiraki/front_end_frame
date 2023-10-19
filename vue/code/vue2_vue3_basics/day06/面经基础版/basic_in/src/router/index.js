import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/Layout'
import ArticleDetail from '@/views/ArticleDetail'
import Article from '@/views/Article'
import Collect from '@/views/Collect'
import Like from '@/views/Like'
import User from '@/views/User'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      // 通过children配置项，可以配置嵌套子路由
      // 1.在children配置项中，配规则
      // 2.准备二级路由出口
      children: [
        {
          path: '/article',
          component: Article,
        },
        {
          path: '/collect',
          component: Collect,
        },
        {
          path: '/like',
          component: Like,
        },
        {
          path: '/user',
          component: User,
        },
      ],
    },
    {
      path: '/detail/:id',
      component: ArticleDetail,
    },
  ],
  mode: 'history',
})

export default router
