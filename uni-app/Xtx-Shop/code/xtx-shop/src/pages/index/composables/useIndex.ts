import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategroyItem, HotItem } from '@/types/home'
import { useGuessList } from '@/composables/useGuess'

export function usePageIndex() {
  // 获取轮播图数据
  const bannerList = ref<BannerItem[]>([])
  const getHomeBannerData = async () => {
    const res = await getHomeBannerAPI()
    bannerList.value = res.result
  }

  // 获取前台分类数据
  const categoryList = ref<CategroyItem[]>([])
  const getHomeCategroyDate = async () => {
    const res = await getHomeCategoryAPI()
    categoryList.value = res.result
  }

  // 获取热门推荐数据
  const hotList = ref<HotItem[]>([])
  const getHomeHotData = async () => {
    const res = await getHomeHotAPI()
    hotList.value = res.result
  }
  const isLoading = ref(false)
  onLoad(async () => {
    isLoading.value = true
    await Promise.all([getHomeBannerData(), getHomeCategroyDate(), getHomeHotData()])
    isLoading.value = false
  })

  // 获取猜你喜欢组件实例
  const { guessRef, onScrolltolower } = useGuessList()
  // 下拉刷新状态
  const isTriggered = ref(false)
  // 下拉刷新
  const OnRefresherrefresh = async () => {
    // 启用下拉刷新动画
    isTriggered.value = true
    // 加载数据
    // await getHomeBannerData()
    // await getHomeCategroyDate()
    // await getHomeHotData()
    // 重置猜你喜欢数据
    guessRef.value?.resetData()
    await Promise.all([getHomeBannerData(), getHomeCategroyDate(), getHomeHotData()])
    // 关闭下拉刷新动画
    isTriggered.value = false
  }

  return {
    bannerList,
    categoryList,
    hotList,
    isLoading,
    isTriggered,
    OnRefresherrefresh,
    onScrolltolower,
    guessRef,
  }
}
