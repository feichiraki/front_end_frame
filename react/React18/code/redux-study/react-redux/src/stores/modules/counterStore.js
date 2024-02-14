import {createSlice} from '@reduxjs/toolkit'

const counterStore = createSlice({
    name:'counter',
    // 初始状态数据
    initialState:{
        count:0
    },
    // 修改数据的同步方法
    reducers:{
        increment(state){
            state.count++
        },
        decrement(state){
            state.count--
        }
    }
})

// 导出=>0解构出创建的action对象的函数 (actionCreater)
export const {increment,decrement} = counterStore.actions

// 导出reducer函数
export default counterStore.reducer