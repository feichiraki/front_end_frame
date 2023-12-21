import { createApp } from 'vue'
import router from './router'
import pinia  from './stores'
import App from './App.vue'
import {lazy} from '@/directives'
 

// 引入初始化的样式文件
import '@/styles/common.scss'
// 导入全局组件
import { componentPlugin } from '@/components'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(lazy)
// 注册全局组件
app.use(componentPlugin)

app.mount('#app')
