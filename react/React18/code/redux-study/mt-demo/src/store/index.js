import {configureStore} from '@reduxjs/toolkit'
import takeaway from './modules/takeaway'

const store = configureStore({
    reducer: {
        takeaway
    }
})

export default store
// 导出takeaway模块所有的导出
export * from './modules/takeaway'