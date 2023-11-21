
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// 导入Pinia持久化的插件
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia() // 创建Pinia实例
const app = createApp(App)  // 创建根实例
app.use(pinia.use(persist))                   // pinia插件的安装配置
app.mount('#app')           // 视图的挂载