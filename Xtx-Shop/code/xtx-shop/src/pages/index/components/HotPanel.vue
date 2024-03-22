<script setup lang="ts">
import type { HotItem } from '@/types/home'

defineProps<{
  hotList: HotItem[]
}>()
</script>

<template>
  <!-- 推荐专区 -->
  <view class="panel hot">
    <view class="item" v-for="item in hotList" :key="item.id">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-desc">{{ item.alt }}</text>
      </view>
      <navigator hover-class="none" :url="`/pages/hot/index?type=${item.type}`" class="cards">
        <image
          class="image"
          mode="aspectFit"
          v-for="src in item.pictures"
          :key="src"
          :src="src"
        ></image>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
@import './styles/HotPanel.scss';
</style>
