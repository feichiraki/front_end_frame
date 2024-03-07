<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategroyItem, HotItem } from '@/types/home'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { useGuessList } from '@/composables/useGuess'

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
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 
    1.自定义导航栏不需要加入滚动栏里面
    2.scroll-y 垂直滚动
    3.给滚动容器设置高度
   -->
  <scroll-view
    refresher-enabled
    @refresherrefresh="OnRefresherrefresh"
    @scrolltolower="onScrolltolower"
    :refresher-triggered="isTriggered"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 前台分类 -->
      <CategoryPanel :categoryList="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :hotList="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
// 小程序页面根标签是 page
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f7f7f7;
}

.scroll-view {
  flex: 1;
}
</style>
@/composables/useGuess
