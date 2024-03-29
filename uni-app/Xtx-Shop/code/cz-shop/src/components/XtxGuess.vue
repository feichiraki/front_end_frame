<script setup lang="ts">
import { getHomeGoodsGuessLike } from '@/services/home'
import type { GuessItem } from '@/types/home'
import type { PageParams } from '@/types/global'
import { onMounted, ref } from 'vue'

// 分页参数
const pageParams: Required<PageParams> = {
  page: import.meta.env ? 1 : 1,
  pageSize: 10,
}

// 获取猜你喜欢数据
const guessList = ref<GuessItem[]>([])
// 结束请求标记
const finish = ref(false)
const getGuessLikeData = async () => {
  if (finish.value) {
    return uni.showToast({ icon: 'none', title: '没有更多的数据~' })
  }
  const res = await getHomeGoodsGuessLike(pageParams)
  // 数组追加
  guessList.value.push(...res.result.items)

  // 分页条件
  if (pageParams.page < res.result.pages) {
    // 页数累加
    pageParams.page++
  } else {
    finish.value = true
  }
}

// 组件挂载完毕
onMounted(() => {
  getGuessLikeData()
})

// 重置数据
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  finish.value = false
}

// 暴露方法
defineExpose({
  getMore: getGuessLikeData,
  resetData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/index?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name"> {{ item.desc }} </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text"> {{ finish ? '没有更多了~' : '正在加载...' }} </view>
</template>

<style lang="scss">
@import '@/components/styles/XtxGuess.scss';
</style>
