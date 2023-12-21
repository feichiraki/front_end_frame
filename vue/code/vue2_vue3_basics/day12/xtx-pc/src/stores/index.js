import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'


const pinia = createPinia()

pinia.use(persist)
export default pinia

// 导出layout模块
export * from './modules/layout'
// 导出user模块
export * from './modules/user'
// 导出cart模块
export * from './modules/cart'

