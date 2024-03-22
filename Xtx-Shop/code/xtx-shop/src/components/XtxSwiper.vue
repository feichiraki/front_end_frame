<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'

const activeIndex = ref(0)
// UniHelper 为 uni-app 提供事件类型
const onChange: UniHelper.SwiperOnChange = (ev) => {
  // !:非空断言，主观上排除空值情况
  activeIndex.value = ev.detail!.current
}

defineProps<{
  list: BannerItem[]
}>()
</script>

<template>
  <view class="carousel">
    <swiper @change="onChange" :circular="true" :autoplay="false" :interval="3000">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss">
@import '@/components/styles/XtxSwiper.scss';
</style>
