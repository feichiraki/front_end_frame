<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { usePageIndex } from './composables/useIndex'

const {
  bannerList,
  categoryList,
  hotList,
  isLoading,
  isTriggered,
  OnRefresherrefresh,
  onScrolltolower,
  guessRef,
} = usePageIndex()
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
/* #ifdef APP-PLUS */
#app,
/* #endif */
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
