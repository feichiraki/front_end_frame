<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import type { BannerItem } from '@/types/home'
import type { CategoryTopItem } from '@/types/category'

import { getHomeBannerAPI } from '@/services/home'
import { getCategoryTopAPI } from '@/services/category'
import PageSkeleton from './components/PageSkeleton.vue'

// 获取轮播图数据
const categoryBannerList = ref<BannerItem[]>([])
const getBannerData = async () => {
  // 传递参数2,标识获取商品分类页广告
  const res = await getHomeBannerAPI(2)
  // 存放轮播图数据
  categoryBannerList.value = res.result
}

// 创建tab项选中索引存储 , 默认选中第一项
const activeIndex = ref(0)

// 获取分类数据
const categoryTopData = ref<CategoryTopItem[]>([])
const getCategoryData = async () => {
  const res = await getCategoryTopAPI()
  categoryTopData.value = res.result
}

// 提取二级分类数据
const subCategoryList = computed(() => {
  return categoryTopData.value[activeIndex.value]?.children || []
})

// 是否加载完数据
const isFinished = ref(false)

// 加载时调用接口
onLoad(async () => {
  await Promise.all([getBannerData(), getCategoryData()])
  isFinished.value = true
})
</script>

<template>
  <view class="viewport" v-if="isFinished">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          v-for="(item, index) in categoryTopData"
          :key="item.id"
          class="item"
          :class="{ active: index === activeIndex }"
          @tap="activeIndex = index"
        >
          <text class="name"> {{ item.name }} </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view class="secondary" scroll-y>
        <!-- 焦点图 -->
        <XtxSwiper class="banner" :list="categoryBannerList" />
        <!-- 内容区域 -->
        <view class="panel" v-for="item in subCategoryList" :key="item.id">
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <view class="section">
            <navigator
              v-for="good in item.goods"
              :key="good.id"
              class="goods"
              hover-class="none"
              :url="`/pages/goods/index?id=${good.id}`"
            >
              <image class="image" :src="good.picture"></image>
              <view class="name ellipsis">{{ good.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ good.price }}</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
  <!-- 骨架屏 -->
  <PageSkeleton v-else />
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

@import './components/styles/search.scss';
@import './components/styles/category.scss';
</style>
