// 封装轮播图业务逻辑
import { ref, onMounted } from 'vue'
import { getHomeBannerDataService } from '@/api/home'

export const useBanner = ()=>{
    // 获取banner
    const bannerList = ref([])
    const getHomeBannerData = async () => {
        const res = await getHomeBannerDataService('2')
        bannerList.value = res.data.result
    }
    onMounted(() => {
        getHomeBannerData()
    })

    return {
        bannerList
    }
}