// 组合子模块 => 导出store实例
import { configureStore } from "@reduxjs/toolkit"
import billReducer from "./modules/billStore"


const store = configureStore({
    reducer:{
        bill:billReducer
    }
})


export default store
// 导出子模块的函数
export * from "./modules/billStore"