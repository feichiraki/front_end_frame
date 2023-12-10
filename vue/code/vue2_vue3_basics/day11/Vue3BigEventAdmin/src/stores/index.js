import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import { useUserStore } from './modules/user'
// export { useUserStore }

// 下面这行代码等价于上面的两行代码
export * from './modules/user'
export * from './modules/article'
