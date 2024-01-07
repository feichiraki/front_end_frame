// store

import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const takeAwayStore = createSlice({
    name: 'takeaway',
    initialState: {
        // goodslist
        takeAwayList: [],
        // activeIndex
        activeIndex:0,
        // cart
        cartList:[]
    },
    reducers: {
        // set foodslist
        setGoodsList(state, action) {
            state.takeAwayList = action.payload
        },
        // update activeIndex
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        // add goods to cart
        addCart(state,action){
            // 是否添加过？
            const item = state.cartList.find(item => item.id === action.payload.id)
            if(item){
                item.count++
            }else{
                state.cartList.push({...action.payload,count:1})
            }
        },

        // increment count 
        increCount(state,action){
            // 修改购物车中对应商品的数量 => id
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        // decrement count
        decreCount(state,action){
            // 修改购物车中对应商品的数量 => id
            const item = state.cartList.find(item => item.id === action.payload.id)
            if(item.count ===  0){
                return
            }
            item.count--
        },

        //clear cart data
        clearCart(state,action){
            state.cartList = []
        }
    }   
})
export const { setGoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart }  = takeAwayStore.actions

// 异步获取
const fetchGoodsList = () => {
    return async (dispatch) => {
        // 编写异步逻辑
        const res = await axios.get('http://localhost:3004/takeaway')
        // 调用dispatch函数提交action
        dispatch(setGoodsList(res.data))
    }
}
export {fetchGoodsList}
export default takeAwayStore.reducer