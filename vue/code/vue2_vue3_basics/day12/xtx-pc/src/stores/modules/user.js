import {defineStore} from 'pinia'
import {ref} from 'vue'
import {userLoginService} from '@/api/login'
import { useCartStore } from './cart'

export const useUserStore = defineStore('user',()=>{
    const cartStore = useCartStore()

    // 1.定义管理的用户数据 state
    const userInfo = ref({})
    const token = ref('')
    // 2.定义对数据(获取/增加/修改/删除)的action函数
    const getUserInfo = async ({account,password})=>{
        // 发送登录请求
        const res = await userLoginService({account,password})
        // 将用户信息保存到Store中
        userInfo.value = res.data.result
        token.value = res.data.result.token
        // 如果本地存在购物车列表
        if(cartStore.cartList.length>0){
            // 发送请求合并数据
           await cartStore.mergeCartList()
        }
        // 获取购物车列表
        cartStore.getCartList()
    } 
    const clearUserInfo = ()=>{
        userInfo.value = {} 
        token.value = ''
        cartStore.clearCartList()
    }
    // 3.把 state 和 action 以对象的形式导出
    return {
        token,
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
{
    // 启用持久化
    persist:true
})