<script setup lang="ts">
import { getMemberOrderPreAPI, getMemberOrderPreNowAPI, postMemberOrderAPI } from '@/services/order'
import { useAddressStore } from '@/stores'
import type { AddressItem } from '@/types/address'
import type { OrderPreResult } from '@/types/order'
import { getMemberAddressAPI } from '@/services/address'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 订单备注
const buyerMessage = ref('')
// 配送时间
const deliveryList = ref([
  { type: 1, text: '时间不限 (周一至周日)' },
  { type: 2, text: '工作日送 (周一至周五)' },
  { type: 3, text: '周末配送 (周六至周日)' },
])
// 当前配送时间下标
const activeIndex = ref(0)
// 当前配送时间
const activeDelivery = computed(() => deliveryList.value[activeIndex.value])
// 修改配送时间
const onChangeDelivery: UniHelper.SelectorPickerOnChange = (ev) => {
  activeIndex.value = ev.detail.value
}

// 立即购买产生的预订单
const query = defineProps<{
  skuId?: string
  count?: string
  addressId?: string // 在商品详情页选了地址
}>()

// 获取预订单数据
const orderPreData = ref<OrderPreResult>({} as OrderPreResult)
const getOrderPreData = async () => {
  // 是否有立即购买参数
  if (query.skuId && query.count) {
    // 调用立即购买 API
    const { result } = await getMemberOrderPreNowAPI({
      count: query.count,
      skuId: query.skuId,
      addressId: query.addressId,
    })
    orderPreData.value = result
    if (result.userAddresses.length === 0) {
      getAddressList()
    }
  } else {
    // 调用预付订单 API
    console.log(1)
    const { result } = await getMemberOrderPreAPI()
    orderPreData.value = result
    if (result.userAddresses.length === 0) {
      getAddressList()
    }
  }
}

// 页面加载生命钩子
onLoad(() => {
  getOrderPreData()
})

// 计算收获地址
const addressStore = useAddressStore()
const addressList = ref<AddressItem[]>()
const getAddressList = async () => {
  const { result } = await getMemberAddressAPI()
  addressList.value = result
}
const seletedAddress = computed(() => {
  // 这里需要判断一下，因为有两种途径创建预订单，所以地址也会出现不是默认地址情况
  if (query.addressId && addressStore.selectedAddress) {
    return addressStore.selectedAddress
  } else {
    if (
      Array.isArray(orderPreData.value.userAddresses) &&
      orderPreData?.value.userAddresses.length === 0
    ) {
      return addressList.value?.find((v) => v.isDefault)
    }
    return orderPreData.value.userAddresses?.find((v) => v.isDefault)
  }
})

// 提交订单
const onOrderSubmit = async () => {
  // 没有收货地址提醒
  if (!seletedAddress.value?.id) {
    return uni.showToast({ icon: 'none', title: '请选择收货地址' })
  }
  // 发送请求
  const res = await postMemberOrderAPI({
    addressId: seletedAddress.value?.id,
    buyerMessage: buyerMessage.value,
    deliveryTimeType: activeDelivery.value.type,
    goods: orderPreData.value!.goods.map((v) => ({ count: v.count, skuId: v.skuId })),
    payChannel: 2,
    payType: 1,
  })
  // 关闭当前页,跳转订单详情页,并传递订单id
  uni.redirectTo({ url: `/pagesOrder/detail/index?id=${res.result.id}` })
}
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 收货地址 -->
    <navigator
      v-if="seletedAddress?.id"
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/index?from=order"
    >
      <view class="user"> {{ seletedAddress.receiver }} {{ seletedAddress.contact }} </view>
      <view class="address"> {{ seletedAddress.fullLocation }} {{ seletedAddress.address }}</view>
      <text class="icon icon-right"></text>
    </navigator>
    <navigator
      v-else
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/index?from=order"
    >
      <view class="address"> 请选择收货地址 </view>
      <text class="icon icon-right"></text>
    </navigator>

    <!-- 商品信息 -->
    <view class="goods">
      <navigator
        v-for="item in orderPreData!.goods"
        :key="item.skuId"
        :url="`/pages/goods/index?id=${item.id}`"
        class="item"
        hover-class="none"
      >
        <image class="picture" :src="item.picture" />
        <view class="meta">
          <view class="name ellipsis"> {{ item.name }} </view>
          <view class="attrs">{{ item.attrsText }}</view>
          <view class="prices">
            <view class="pay-price symbol">{{ item.payPrice }}</view>
            <view class="price symbol">{{ item.price }}</view>
          </view>
          <view class="count">x{{ item.count }}</view>
        </view>
      </navigator>
    </view>

    <!-- 配送及支付方式 -->
    <view class="related">
      <view class="item">
        <text class="text">配送时间</text>
        <picker :range="deliveryList" range-key="text" @change="onChangeDelivery">
          <view class="icon-fonts picker">{{ activeDelivery.text }}</view>
        </picker>
      </view>
      <view class="item">
        <text class="text">订单备注</text>
        <input
          class="input"
          :cursor-spacing="30"
          placeholder="选题，建议留言前先与商家沟通确认"
          v-model="buyerMessage"
        />
      </view>
    </view>

    <!-- 支付金额 -->
    <view class="settlement">
      <view class="item">
        <text class="text">商品总价: </text>
        <text class="number symbol">{{ orderPreData.summary?.totalPrice }}</text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">{{ orderPreData.summary?.postFee }}</text>
      </view>
    </view>

    <!-- 吸底工具栏 -->
    <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      <view class="total-pay symbol">
        <text class="number">{{ orderPreData?.summary?.totalPayPrice }}</text>
      </view>
      <view class="button" :class="{ disabled: false }" @tap="onOrderSubmit"> 提交订单 </view>
    </view>
  </scroll-view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.symbol::before {
  content: '¥';
  font-size: 80%;
  margin-right: 5rpx;
}

.shipment {
  margin: 20rpx;
  padding: 30rpx 30rpx 30rpx 84rpx;
  font-size: 26rpx;
  border-radius: 10rpx;
  background: url(@/static/images/address.png) 20rpx center / 50rpx no-repeat #fff;
  position: relative;

  .icon {
    font-size: 36rpx;
    color: #333;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20rpx;
  }

  .user {
    color: #333;
    margin-bottom: 5rpx;
  }

  .address {
    color: #666;
  }
}

.goods {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    padding: 30rpx 0;
    border-top: 1rpx solid #eee;

    &:first-child {
      border-top: none;
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrs {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .prices {
      display: flex;
      align-items: baseline;
      margin-top: 6rpx;
      font-size: 28rpx;

      .pay-price {
        margin-right: 10rpx;
        color: #cf4444;
      }

      .price {
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
    }

    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 26rpx;
      color: #444;
    }
  }
}

.related {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .input {
    flex: 1;
    text-align: right;
    margin: 20rpx 0;
    padding-right: 20rpx;
    font-size: 26rpx;
    color: #999;
  }

  .item .text {
    width: 125rpx;
  }

  .picker {
    color: #666;
  }

  .picker::after {
    content: '\e6c2';
  }
}

/* 结算清单 */
.settlement {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .danger {
    color: #cf4444;
  }
}

/* 吸底工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .total-pay {
    font-size: 40rpx;
    color: #cf4444;

    .decimal {
      font-size: 75%;
    }
  }

  .button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 72rpx;
    // background-color: #27ba9b;
    background-color: #ff8a34;
  }

  .disabled {
    opacity: 0.6;
  }
}
</style>
