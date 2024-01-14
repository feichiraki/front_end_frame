import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const biilStore = createSlice({
    name: 'bills',
    initialState:{
        // 初始化数据
        billList:[]
    },
    reducers: {
        setBillList: (state, action) => {
            state.billList = action.payload
        },
        addBill:(state,action)=>{
            state.billList.push(action.payload)
        }
    }
})

export const {setBillList,addBill} = biilStore.actions
export default biilStore.reducer

// 异步操作
// 1.获取账单列表
export const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3006/ka')
        dispatch(setBillList(res.data))
    }
}

// 2.新增账单
export const insertBill = (data) =>{
    return async (dispatch)=>{
        // 编写异步请求
        const res =  await axios.post('http://localhost:3006/ka',data)
        // 触发同步事件reducer
        // console.log(res)
        dispatch(addBill(res.data))
    }
}