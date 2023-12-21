// 封装购物车模块
import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import {addCartService,delCartService,getCartListService,mergerCartService} from '@/api/cart'
import {useUserStore} from './user'

export const useCartStore = defineStore('cart',()=>{
    const userStore = useUserStore()

    // 定义cart模块的state数据
    const cartList = ref([])

    // 计算属性 - getters
    // 1.商品总数量 ，所有项之和
    const totalCount = computed(()=>cartList.value.reduce((pre,item) => pre + item.count,0))
    // 2.所有商品总价格，所有项 count*price之和
    const totalPrice = computed(()=>cartList.value.reduce((pre,item) => pre+item.count*item.price,0))
    // 3.商品是否全选
    const isAll = computed(()=>cartList.value.every(item => item.selected))
    // 4.商品选中数量
    const selectedCount = computed(()=>cartList.value.filter(item => item.selected).length)
    // 5.选中商品的总价格
    const selectedTotalPrice = computed(()=>cartList.value.filter(item => item.selected).reduce((pre,item) => pre+item.count*item.price,0))
    // 6.获取当前的登录状态
    const isLogin = computed(()=>userStore.token)




    // 定义cart模块的action函数
    // 获取购物车商品列表
    const getCartList = async () =>{
        // 1.发送请求获取购物车列表
        const {data:{result}} = await getCartListService()
        // 2.将获取到的购物车列表赋值给cartList
        cartList.value = result
    }
    // 添加购物车操作
    const addCart = async (cartObj) =>{
        if(isLogin.value){
            // 已登录->接口添加商品
            // 1.发送添加商品请求
            await addCartService(cartObj)
            // 2.获取最新的购物车列表
            getCartList()
        }else{
            // 未登录->本地添加至购物车
            // 购物车添加业务逻辑
            const item = cartList.value.find(item => item.skuId === cartObj.skuId)
            if(item){
                item.count++
            }else{
                cartList.value.push(cartObj)
            }
        }
    }
    // 删除商品操作
    const delCart =async (skuId) =>{
        if(isLogin.value){
            // 登录后的删除业务逻辑
            // 1.发送删除商品请求
            await delCartService([skuId])
            // 2.获取最新的购物车列表
            getCartList()
        }else{
            // 未登录时的业务逻辑
            // 思路：
            // 1.找到要删除项的下标值 - splice
            // 2.使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex(item => item.skuId === skuId)
                cartList.value.splice(idx,1)
        }
    }
    // 购物车单选功能
    const singleCheck = (skuId,selected) =>{
        const item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }   
    // 全选选中功能
    const getCheckAll = (selected) =>{
        cartList.value.forEach(item => item.selected = selected)
    }
    // 清除购物车
    const clearCartList = ()=>{
        cartList.value = []
    }
    // 合并本地购物车及用户已有购物车
    const mergeCartList = async ()=>{ 
        const arr = cartList.value.map(item=>({skuId:item.skuId,selected:item.selected,count:item.count}))
        console.log(arr)
        await mergerCartService(arr)
    }



    // 返回cart模块中的state和action
    return {
        cartList,
        totalCount,
        totalPrice,
        isAll,
        selectedCount,
        selectedTotalPrice,
        addCart,
        delCart,
        singleCheck,
        getCheckAll,
        getCartList,
        clearCartList, 
        mergeCartList
    }
},{
    persist:'true'
})