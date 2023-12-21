import { ref, onMounted } from 'vue'
import { getCategoryService } from '@/api/category'
import { useRoute,onBeforeRouteUpdate } from 'vue-router'

export const useCategory = () => {
    const categoryData = ref({})
    const route = useRoute()

    const getCategory = (id= route.params.id ) => {
        getCategoryService(id).then(res => {
            categoryData.value = res.data.result
        })
    }
    onMounted(() => {
        getCategory()
    })
    // 目标：路由参数变化时，可以把分类数据接口重新发送
    onBeforeRouteUpdate((to)=>{
        // 存在问题：使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id)
    }) 

    return {
        categoryData
    }
}