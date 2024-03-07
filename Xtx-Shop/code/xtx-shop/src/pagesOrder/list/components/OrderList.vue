<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { OrderState, orderStateList } from '@/services/constants'
import { getMemberOrderAPI } from '@/services/order'
import type { OrderItem, OrderListParams } from '@/types/order'
import changeOderState from '@/composables/useOrderState'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 定义 porps
const props = defineProps<{
  orderState: number
}>()

// 获取订单列表数据
// 请求参数
const queryParams: OrderListParams = {
  page: 1,
  pageSize: 5,
  orderState: props.orderState,
}

// 结束请求标记
const finish = ref(false)
const orderList = ref<OrderItem[]>([])
const getOrderList = async () => {
  // 调用接口获取订单列表数据
  if (finish.value) {
    return uni.showToast({ icon: 'none', title: '没有更多的数据~' })
  }
  const res = await getMemberOrderAPI(queryParams)
  // 数组追加
  orderList.value.push(...res.result.items)
  // 分页条件
  if (queryParams.page! < res.result.pages) {
    // 页数累加
    queryParams.page!++
  } else {
    finish.value = true
  }
}

onMounted(() => {
  getOrderList()
})

// 滚动到底部触发
const onScrolltolower = () => {
  getOrderList()
}

// 支付
const { orderId, onOrderPay } = changeOderState()
// 去支付处理事件
const goPay = (id: string) => {
  orderId.value = id
  onOrderPay()
}
</script>

<template>
  <!-- 订单列表 -->
  <scroll-view scroll-y class="orders" @scrolltolower="onScrolltolower">
    <view class="card" v-for="item in orderList" :key="item.id">
      <!-- 订单信息 -->
      <view class="status">
        <text class="date">{{ item.createTime }}</text>
        <!-- 订单状态文字 -->
        <text>{{ orderStateList[item.orderState].text }}</text>
        <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
        <text class="icon-delete" v-if="item.orderState >= OrderState.DaiPingJia"></text>
      </view>
      <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
      <navigator
        v-for="sku in item.skus"
        :key="sku.spuId"
        class="goods"
        :url="`/pagesOrder/detail/index?id=${item.id}`"
        hover-class="none"
      >
        <view class="cover">
          <image mode="aspectFit" :src="sku.image"></image>
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ sku.name }}</view>
          <view class="type">{{ sku.attrsText }}</view>
        </view>
      </navigator>
      <!-- 支付信息 -->
      <view class="payment">
        <text class="quantity">共{{ item.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount"> <text class="symbol">¥</text>{{ item.totalMoney }}</text>
      </view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <!-- 待付款状态：显示去支付按钮 -->
        <template v-if="item.orderState === OrderState.DaiFuKuan">
          <view class="button primary" @tap="goPay(item.id)">去支付</view>
        </template>
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/index?orderId=${item.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待收货状态: 展示确认收货 -->
          <view v-if="item.orderState === OrderState.DaiShouHuo" class="button primary"
            >确认收货</view
          >
        </template>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      {{ finish ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped></style>
