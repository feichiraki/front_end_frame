<script setup lang="ts">
import type { CategroyItem } from '@/types/home'

defineProps<{
  categoryList: CategroyItem[]
}>()
</script>

<template>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      url="/pages/index/index"
      v-for="item in categoryList"
      :key="item.id"
    >
      <image class="icon" :src="item.icon"> </image>
      <text class="text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<style lang="scss">
@import './styles/CategoryPanel.scss';
</style>
