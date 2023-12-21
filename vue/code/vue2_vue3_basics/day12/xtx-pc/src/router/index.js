import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      component:()=>import('@/views/layout/index.vue'),
      children:[
        { path: '', component: ()=>import ('@/views/home/index.vue') },
        { path: 'category/:id', component: ()=>import ('@/views/category/index.vue') },
        { path: 'category/sub/:id', component:()=>import ('@/views/subCategory/index.vue')},
        { path: 'detail/:id' , component:()=>import ('@/views/detail/index.vue')},
        { path: 'cart', component:()=>import ('@/views/cart/index.vue')},
        { path: 'checkout', component:()=>import ('@/views/order/index.vue')},
        { path: 'pay', component:()=>import ('@/views/Pay/index.vue')},
        // 注意路径，必须是paycallback
        { path: 'paycallback', component:()=>import ('@/views/Pay/PayBack.vue')},
        { 
          path: 'member',
          component:()=>import ('@/views/member/index.vue'),
          redirect:'/member/user',
          children:[
            { path: 'user', component:()=>import ('@/views/member/components/UserInfo.vue')},
            { path: 'order', component:()=>import ('@/views/member/components/UserOrder.vue')}
          ]
        }
      ]
    },
    { path: '/login', component: ()=> import('@/views/login/index.vue') }, 
  ],
  scrollBehavior(){
    return { top:0 }
  }
})

export default router
