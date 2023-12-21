import {defineStore} from 'pinia'
import { ref } from 'vue'
import { getCategoryListService } from '@/api/layout'

export const useLayoutStore = defineStore('layout',()=>{

    // state
    // 导航列表
    const categoryList = ref([])

    // action
    // 获取导航列表数据
    function getCategoryList() {
        getCategoryListService().then(res => {
            categoryList.value = res.data.result
        })
    }
    
    return{
        categoryList,
        getCategoryList
    }
})