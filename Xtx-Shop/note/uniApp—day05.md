## uni-app—小兔鲜微信小程序实战

> uni-app官网：https://uniapp.dcloud.net.cn/
>
> 小兔鲜-小程序官网：https://megasu.gitee.io/uni-app-shop-note/



### 订单模块—填写订单页

订单模块页面较多，建议用新的分包文件夹独立管理订单模块页面：填写订单页，支付订单页，订单详情页，订单列表页。

#### 1、填写订单页—渲染基本数据

参考效果：

<img src="uniApp—day05.assets/image-20240304132828968.png" alt="image-20240304132828968" style="zoom:67%;" />

点击购物车的`结算`按钮，跳转到详情页。详情页中根据选中商品`生成预订单`。

##### 1.1 静态结构(分包)

`src\pageOrder\create\index.vue`

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

// 货取屏幕边界到安全区域距离
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
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 收货地址 -->
    <navigator
      v-if="false"
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/address?from=order"
    >
      <view class="user"> 张三 13333333333 </view>
      <view class="address"> 广东省 广州市 天河区 黑马程序员3 </view>
      <text class="icon icon-right"></text>
    </navigator>
    <navigator
      v-else
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/address?from=order"
    >
      <view class="address"> 请选择收货地址 </view>
      <text class="icon icon-right"></text>
    </navigator>

    <!-- 商品信息 -->
    <view class="goods">
      <navigator
        v-for="item in 2"
        :key="item"
        :url="`/pages/goods/goods?id=1`"
        class="item"
        hover-class="none"
      >
        <image
          class="picture"
          src="https://yanxuan-item.nosdn.127.net/c07edde1047fa1bd0b795bed136c2bb2.jpg"
        />
        <view class="meta">
          <view class="name ellipsis"> ins风小碎花泡泡袖衬110-160cm </view>
          <view class="attrs">藏青小花 130</view>
          <view class="prices">
            <view class="pay-price symbol">99.00</view>
            <view class="price symbol">99.00</view>
          </view>
          <view class="count">x5</view>
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
        <text class="number symbol">495.00</text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">5.00</text>
      </view>
    </view>
  </scroll-view>
  <!-- 吸底工具栏 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="total-pay symbol">
      <text class="number">99.00</text>
    </view>
    <view class="button" :class="{ disabled: true }"> 提交订单 </view>
  </view>
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
  background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png)
    20rpx center / 50rpx no-repeat #fff;
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
    background-color: #27ba9b;
  }

  .disabled {
    opacity: 0.6;
  }
}
</style>
```



##### 1.2  类型声明

`src/types/order.d.ts`

```ts
import type { AddressItem } from './address'

/** 货取预付订单 返回信息 */
export type OrderPreResult = {
  /** 商品集合 [ 商品信息 ] */
  goods: OrderPreGoods[]
  /** 结算信息 */
  summary: {
    /** 商品总价 */
    totalPrice: number
    /** 邮费 */
    postFee: number
    /** 应付金额 */
    totalPayPrice: number
  }
  /** 用户地址列表 [ 地址信息 ] */
  userAddresses: AddressItem[]
}

/** 商品信息 */
export type OrderPreGoods = {
  /** 属性文字，例如“颜色:瓷白色 尺寸：8寸” */
  attrsText: string
  /** 数量 */
  count: number
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 实付单价 */
  payPrice: string
  /** 图片 */
  picture: string
  /** 原单价 */
  price: string
  /** SKUID */
  skuId: string
  /** 实付价格小计 */
  totalPayPrice: string
  /** 小计总价 */
  totalPrice: string
}
```



##### 1.3封装请求API

`services/order.ts`

```ts
import type { OrderPreResult } from '@/types/order'
import { request } from '@/utils/request'

/**
 * 填写订单-货取预付订单
 */
export const getMemberOrderPreAPI = () => {
  return request<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre',
  })
}
```



##### 1.4 初始化调用

`pagesOrder/create`

```ts
// 货取预订单数据
const orderPreData = ref<OrderPreResult>({} as OrderPreResult)
const getOrderPreData = async () => {
  const res = await getMemberOrderPreAPI()
  orderPreData.value = res.result
}
// 页面加载生命钩子
onLoad(() => {
  getOrderPreData()
})
```



##### 1.5 界面渲染

```vue
        <!-- 商品信息 -->
    <view class="goods">
      <navigator
        v-for="item in orderPreData.goods"
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
	...
	<!-- 支付金额 -->
    <view class="settlement">
      <view class="item">
        <text class="text">商品总价: </text>
        <text class="number symbol">{{ orderPreData.summary.totalPrice }}</text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">{{ orderPreData.summary.postFee }}</text>
      </view>
    </view>
  </scroll-view>
  <!-- 吸底工具栏 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="total-pay symbol">
      <text class="number">{{ orderPreData.summary.totalPayPrice }}</text>
    </view>
    <view class="button" :class="{ disabled: false }"> 提交订单 </view>
  </view>
```





#### 2、填写订单页—收货地址

参考效果：

<img src="uniApp—day05.assets/image-20240304142808921.png" alt="image-20240304142808921" style="zoom:67%;" />

单击收货地址选项可以跳转到地址管理页选择订单的地址。

实现步骤：

<img src="uniApp—day05.assets/image-20240304142952134.png" alt="image-20240304142952134" style="zoom:67%;" />

> 收货地址在地址管理页面中选择，为了更好管理选中收货地址，使用`pinia`创建独立 Store 维护。



##### 2.1 新建Store

`stores/modules/address.ts`

```ts
import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  // state
  const selectedAddress = ref<AddressItem>()

  //action
  const changeAddress = (address: AddressItem) => {
    selectedAddress.value = address
  }
  //returns
  return {
    selectedAddress,
    changeAddress,
  }
})
```



##### 2.2 地址管理页选中地址

`pagesMember/address/index.vue`

```ts
// 选择收货地址 <= 填写订单页
const changeSelectAddress = (address: AddressItem) => {
  // 修改选中收货地址数据
  const addressStore = useAddressStore()
  addressStore.changeAddress(address)
  // 返回上一页
  uni.navigateBack()
}
```

绑定上述处理事件函数：

```vue
<view class="item-content" @tap="changeSelectAddress(item)">
	...
</view>
```



##### 2.3 解决bug

<img src="uniApp—day05.assets/image-20240304145855191.png" alt="image-20240304145855191" style="zoom:67%;" />

实现上述的代码逻辑后，我们在`地址管理页`单击修改将一直停在当前页，而不会跳转到`修改页`中。这是因为事件`冒泡`导致的bug，调用了父级同类型事件，执行了代码`  uni.navigateBack()`。

解决：组织冒泡。

```vue
<navigator
           class="edit"
           hover-class="none"
           :url="`/pagesMember/address-form/index?id=${item.id}`"
           @tap.stop="() => {}"
           >
    修改
</navigator>
```

`@tap.stop="() => {}"`实现了阻止事件冒泡功能。





#### 3、填写订单页—立即购买

从商品详情页的 `SKU` 组件直接点击【立即购买按钮】跳转到填写订单页，需要传递页面参数。

参考效果：

<img src="uniApp—day05.assets/image-20240304150631642.png" alt="image-20240304150631642" style="zoom:67%;" />

实现步骤：

<img src="uniApp—day05.assets/image-20240304150609263.png" alt="image-20240304150609263" style="zoom:67%;" />

##### 3.1 封装请求API

`services/order.ts`

```ts
/**
 * 填写订单-货取立即购买订单
 * @param data 查询参数
 */
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return request<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}
```



##### 3.2 Sku购买事件

`pages/goods/index.vue` = > 跳转页面时传参

```ts
// 立即购买事件 => 填写订单页
const onBuyNow = (ev: SkuPopupEvent) => {
  // 从商品详情页的【立即购买事件】中收集两个必要参数，跳转填写订单页并传递页面参数。
  uni.navigateTo({ url: `/pagesOrder/create/create?skuId=${ev._id}&count=${ev.buy_num}` })
  // 关闭 SKU 组件
  isShowSku.value = false
}
```

```vue
  <!-- SKU弹窗组件 -->
  <vk-data-goods-sku-popup
    v-model="isShowSku"
    :localdata="localdata"
    @add-cart="onAddCart"
    ...
    @buy-now="onBuyNow"
  />
```



##### 3.3 根据页面参数返回对应结果

如果有页面参数，则为立即购买，否则为预付订单。

`pagesOrder/create`

```vue
<script setup lang="ts">
import { getMemberOrderPreAPI, getMemberOrderPreNowAPI } from '@/services/order'

// 页面参数
const query = defineProps<{
  skuId?: string
  count?: string
}>()

// 货取订单信息
const orderPre = ref<OrderPreResult>()
const getMemberOrderPreData = async () => {
  // 是否有立即购买参数
  if (query.count && query.skuId) {
    // 调用立即购买 API
    const res = await getMemberOrderPreNowAPI({
      count: query.count,
      skuId: query.skuId,
    })
    orderPre.value = res.result
  } else {
    // 调用预付订单 API
    const res = await getMemberOrderPreAPI()
    orderPre.value = res.result
  }
}
</script>
```





#### 4、填写订单页—提交订单

收集填写订单页的数据，点击页面底部的提交订单按钮，创建一个新的订单。

参考效果:

<img src="uniApp—day05.assets/image-20240304212824210.png" alt="image-20240304212824210" style="zoom:67%;" />

实现步骤：

<img src="uniApp—day05.assets/image-20240304212840883.png" alt="image-20240304212840883" style="zoom:67%;" />



##### 4.1 类型声明 & 封装API

类型声明

```ts
/** 提交订单 请求参数 */
export type OrderCreateParams = {
  /** 所选地址Id */
  addressId: string
  /** 配送时间类型，1为不限，2为工作日，3为双休或假日 */
  deliveryTimeType: number
  /** 订单备注 */
  buyerMessage: string
  /** 商品集合[ 商品信息 ] */
  goods: {
    /** 数量 */
    count: number
    /** skuId */
    skuId: string
  }[]
  /** 支付渠道：支付渠道，1支付宝、2微信--支付方式为在线支付时，传值，为货到付款时，不传值 */
  payChannel: 1 | 2
  /** 支付方式，1为在线支付，2为货到付款 */
  payType: 1 | 2
}

/** 提交订单 返回信息 */
export type OrderCreateResult = {
  /** 订单Id */
  id: string
}
```

接口封装

```ts
/**
 * 提交订单
 * @param data 请求参数
 */
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return request<{ id: string }>({
    method: 'POST',
    url: '/member/order',
    data,
  })
}
```



##### 4.2 调用接口跳转订单详情

```vue
<script setup lang="ts">
// 提交订单
const onOrderSubmit = async () => {
  // 没有收货地址提醒
  if (!selecteAddress.value?.id) {
    return uni.showToast({ icon: 'none', title: '请选择收货地址' })
  }
  // 发送请求
  const res = await postMemberOrderAPI({
    addressId: selecteAddress.value?.id,
    buyerMessage: buyerMessage.value,
    deliveryTimeType: activeDelivery.value.type,
    goods: orderPre.value!.goods.map((v) => ({ count: v.count, skuId: v.skuId })),
    payChannel: 2,
    payType: 1,
  })
  // 关闭当前页面，跳转到订单详情，传递订单id
  uni.redirectTo({ url: `/pagesOrder/detail/detail?id=${res.result.id}` })
}
</script>

<template>
  <view class="button" :class="{ disabled: !selecteAddress?.id }" @tap="onOrderSubmit">
    提交订单
  </view>
</template>
```







### 订单模块—订单详情页

需要展示**多种订单状态** 并实现不同订单状态对应的业务。

#### 1、静态结构

```vue
<script setup lang="ts">
import { useGuessList } from '@/composables'
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 猜你喜欢
const { guessRef, onScrolltolower } = useGuessList()
// 弹出层组件
const popup = ref<UniHelper.UniPopupInstance>()
// 取消原因列表
const reasonList = ref([
  '商品无货',
  '不想要了',
  '商品信息填错了',
  '地址信息填写错误',
  '商品降价',
  '其它',
])
// 订单取消原因
const reason = ref('')
// 复制内容
const onCopy = (id: string) => {
  // 设置系统剪贴板的内容
  uni.setClipboardData({ data: id })
}
// 获取页面参数
const query = defineProps<{
  id: string
}>()
</script>

<template>
  <!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="wrap">
      <navigator v-if="true" open-type="navigateBack" class="back icon-left"></navigator>
      <navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home">
      </navigator>
      <view class="title">订单详情</view>
    </view>
  </view>
  <scroll-view scroll-y class="viewport" id="scroller" @scrolltolower="onScrolltolower">
    <template v-if="true">
      <!-- 订单状态 -->
      <view class="overview" :style="{ paddingTop: safeAreaInsets!.top + 20 + 'px' }">
        <!-- 待付款状态:展示去支付按钮和倒计时 -->
        <template v-if="true">
          <view class="status icon-clock">等待付款</view>
          <view class="tips">
            <text class="money">应付金额: ¥ 99.00</text>
            <text class="time">支付剩余</text>
            00 时 29 分 59 秒
          </view>
          <view class="button">去支付</view>
        </template>
        <!-- 其他订单状态:展示再次购买按钮 -->
        <template v-else>
          <!-- 订单状态文字 -->
          <view class="status"> 待付款 </view>
          <view class="button-group">
            <navigator
              class="button"
              :url="`/pagesOrder/create/create?orderId=${query.id}`"
              hover-class="none"
            >
              再次购买
            </navigator>
            <!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
            <view v-if="false" class="button"> 模拟发货 </view>
          </view>
        </template>
      </view>
      <!-- 配送状态 -->
      <view class="shipment">
        <!-- 订单物流信息 -->
        <view v-for="item in 1" :key="item" class="item">
          <view class="message">
            您已在广州市天河区黑马程序员完成取件，感谢使用菜鸟驿站，期待再次为您服务。
          </view>
          <view class="date"> 2023-04-14 13:14:20 </view>
        </view>
        <!-- 用户收货地址 -->
        <view class="locate">
          <view class="user"> 张三 13333333333 </view>
          <view class="address"> 广东省 广州市 天河区 黑马程序员 </view>
        </view>
      </view>

      <!-- 商品信息 -->
      <view class="goods">
        <view class="item">
          <navigator
            class="navigator"
            v-for="item in 2"
            :key="item"
            :url="`/pages/goods/goods?id=${item}`"
            hover-class="none"
          >
            <image
              class="cover"
              src="https://yanxuan-item.nosdn.127.net/c07edde1047fa1bd0b795bed136c2bb2.jpg"
            ></image>
            <view class="meta">
              <view class="name ellipsis">ins风小碎花泡泡袖衬110-160cm</view>
              <view class="type">藏青小花， 130</view>
              <view class="price">
                <view class="actual">
                  <text class="symbol">¥</text>
                  <text>99.00</text>
                </view>
              </view>
              <view class="quantity">x1</view>
            </view>
          </navigator>
          <!-- 待评价状态:展示按钮 -->
          <view class="action" v-if="true">
            <view class="button primary">申请售后</view>
            <navigator url="" class="button"> 去评价 </navigator>
          </view>
        </view>
        <!-- 合计 -->
        <view class="total">
          <view class="row">
            <view class="text">商品总价: </view>
            <view class="symbol">99.00</view>
          </view>
          <view class="row">
            <view class="text">运费: </view>
            <view class="symbol">10.00</view>
          </view>
          <view class="row">
            <view class="text">应付金额: </view>
            <view class="symbol primary">109.00</view>
          </view>
        </view>
      </view>

      <!-- 订单信息 -->
      <view class="detail">
        <view class="title">订单信息</view>
        <view class="row">
          <view class="item">
            订单编号: {{ query.id }} <text class="copy" @tap="onCopy(query.id)">复制</text>
          </view>
          <view class="item">下单时间: 2023-04-14 13:14:20</view>
        </view>
      </view>

      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />

      <!-- 底部操作栏 -->
      <view class="toolbar-height" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"></view>
      <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
        <!-- 待付款状态:展示支付按钮 -->
        <template v-if="true">
          <view class="button primary"> 去支付 </view>
          <view class="button" @tap="popup?.open?.()"> 取消订单 </view>
        </template>
        <!-- 其他订单状态:按需展示按钮 -->
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=${query.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待收货状态: 展示确认收货 -->
          <view class="button primary"> 确认收货 </view>
          <!-- 待评价状态: 展示去评价 -->
          <view class="button"> 去评价 </view>
          <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
          <view class="button delete"> 删除订单 </view>
        </template>
      </view>
    </template>
    <template v-else>
      <!-- 骨架屏组件 -->
      <PageSkeleton />
    </template>
  </scroll-view>
  <!-- 取消订单弹窗 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view class="popup-root">
      <view class="title">订单取消</view>
      <view class="description">
        <view class="tips">请选择取消订单的原因：</view>
        <view class="cell" v-for="item in reasonList" :key="item" @tap="reason = item">
          <text class="text">{{ item }}</text>
          <text class="icon" :class="{ checked: item === reason }"></text>
        </view>
      </view>
      <view class="footer">
        <view class="button" @tap="popup?.close?.()">取消</view>
        <view class="button primary">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.navbar {
  width: 750rpx;
  color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  /* background-color: #f8f8f8; */
  background-color: transparent;

  .wrap {
    position: relative;

    .title {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32rpx;
      /* color: #000; */
      color: transparent;
    }

    .back {
      position: absolute;
      left: 0;
      height: 44px;
      width: 44px;
      font-size: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      /* color: #000; */
      color: #fff;
    }
  }
}

.viewport {
  background-color: #f7f7f8;
}

.overview {
  display: flex;
  flex-direction: column;
  align-items: center;

  line-height: 1;
  padding-bottom: 30rpx;
  color: #fff;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: cover;

  .status {
    font-size: 36rpx;
  }

  .status::before {
    margin-right: 6rpx;
    font-weight: 500;
  }

  .tips {
    margin: 30rpx 0;
    display: flex;
    font-size: 14px;
    align-items: center;

    .money {
      margin-right: 30rpx;
    }
  }

  .button-group {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    width: 260rpx;
    height: 64rpx;
    margin: 0 10rpx;
    text-align: center;
    line-height: 64rpx;
    font-size: 28rpx;
    color: #27ba9b;
    border-radius: 68rpx;
    background-color: #fff;
  }
}

.shipment {
  line-height: 1.4;
  padding: 0 20rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;

  .locate,
  .item {
    min-height: 120rpx;
    padding: 30rpx 30rpx 25rpx 75rpx;
    background-size: 50rpx;
    background-repeat: no-repeat;
    background-position: 6rpx center;
  }

  .locate {
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);

    .user {
      font-size: 26rpx;
      color: #444;
    }

    .address {
      font-size: 24rpx;
      color: #666;
    }
  }

  .item {
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/car.png);
    border-bottom: 1rpx solid #eee;
    position: relative;

    .message {
      font-size: 26rpx;
      color: #444;
    }

    .date {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.goods {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    padding: 30rpx 0;
    border-bottom: 1rpx solid #eee;

    .navigator {
      display: flex;
      margin: 20rpx 0;
    }

    .cover {
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

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .price {
      display: flex;
      margin-top: 6rpx;
      font-size: 24rpx;
    }

    .symbol {
      font-size: 20rpx;
    }

    .original {
      color: #999;
      text-decoration: line-through;
    }

    .actual {
      margin-left: 10rpx;
      color: #444;
    }

    .text {
      font-size: 22rpx;
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 24rpx;
      color: #444;
    }

    .action {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-start;
      padding: 30rpx 0 0;

      .button {
        width: 200rpx;
        height: 60rpx;
        text-align: center;
        justify-content: center;
        line-height: 60rpx;
        margin-left: 20rpx;
        border-radius: 60rpx;
        border: 1rpx solid #ccc;
        font-size: 26rpx;
        color: #444;
      }

      .primary {
        color: #27ba9b;
        border-color: #27ba9b;
      }
    }
  }

  .total {
    line-height: 1;
    font-size: 26rpx;
    padding: 20rpx 0;
    color: #666;

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10rpx 0;
    }

    .symbol::before {
      content: '¥';
      font-size: 80%;
      margin-right: 3rpx;
    }

    .primary {
      color: #cf4444;
      font-size: 36rpx;
    }
  }
}

.detail {
  line-height: 1;
  padding: 30rpx 20rpx 0;
  margin: 20rpx 20rpx 0;
  font-size: 26rpx;
  color: #666;
  border-radius: 10rpx;
  background-color: #fff;

  .title {
    font-size: 30rpx;
    color: #444;
  }

  .row {
    padding: 20rpx 0;

    .item {
      padding: 10rpx 0;
      display: flex;
      align-items: center;
    }

    .copy {
      border-radius: 20rpx;
      font-size: 20rpx;
      border: 1px solid #ccc;
      padding: 5rpx 10rpx;
      margin-left: 10rpx;
    }
  }
}

.toolbar-height {
  height: 100rpx;
  box-sizing: content-box;
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;

  .button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200rpx;
    height: 72rpx;
    margin-left: 15rpx;
    font-size: 26rpx;
    border-radius: 72rpx;
    border: 1rpx solid #ccc;
    color: #444;
  }

  .delete {
    order: 4;
  }

  .button {
    order: 3;
  }

  .secondary {
    order: 2;
    color: #27ba9b;
    border-color: #27ba9b;
  }

  .primary {
    order: 1;
    color: #fff;
    background-color: #27ba9b;
  }
}

.popup-root {
  padding: 30rpx 30rpx 0;
  border-radius: 10rpx 10rpx 0 0;
  overflow: hidden;

  .title {
    font-size: 30rpx;
    text-align: center;
    margin-bottom: 30rpx;
  }

  .description {
    font-size: 28rpx;
    padding: 0 20rpx;

    .tips {
      color: #444;
      margin-bottom: 12rpx;
    }

    .cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15rpx 0;
      color: #666;
    }

    .icon::before {
      content: '\e6cd';
      font-family: 'erabbit' !important;
      font-size: 38rpx;
      color: #999;
    }

    .icon.checked::before {
      content: '\e6cc';
      font-size: 38rpx;
      color: #27ba9b;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 0 40rpx;
    font-size: 28rpx;
    color: #444;

    .button {
      flex: 1;
      height: 72rpx;
      text-align: center;
      line-height: 72rpx;
      margin: 0 20rpx;
      color: #444;
      border-radius: 72rpx;
      border: 1rpx solid #ccc;
    }

    .primary {
      color: #fff;
      background-color: #27ba9b;
      border: none;
    }
  }
}
</style>
```



#### 2、自定义导航栏交互

> [文档链接](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#%E6%BB%9A%E5%8A%A8%E9%A9%B1%E5%8A%A8%E7%9A%84%E5%8A%A8%E7%94%BB)

参考效果：

<img src="uniApp—day05.assets/order_picture_2.12a65db4.gif" alt="img" style="zoom:67%;" />

实现步骤：

<img src="uniApp—day05.assets/image-20240304225737978.png" alt="image-20240304225737978" style="zoom:67%;" />



1. 导航栏左上角按钮：[获取当前页面栈](https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html)，如果不能返回上一页，按钮变成返回首页。
2. 导航栏动画效果：[滚动驱动的动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#滚动驱动的动画)，根据滚动位置而不断改变动画的进度。

> 注意事项
>
> 滚动驱动的动画目前**仅支持微信小程序端**，暂不支持 H5 端、App 端，多端兼容时添加条件编译。

实现代码

```vue
<script setup lang="ts">
// 获取页面栈
const pages = getCurrentPages()
// 获取当前页面实例，数组最后一项
const pageInstance = pages.at(-1) as any

// 页面渲染完毕，绑定动画效果
onReady(() => {
  // 动画效果,导航栏背景色
  pageInstance.animate(
    '.navbar', // 选择器
    [{ backgroundColor: 'transparent' }, { backgroundColor: '#f8f8f8' }], // 关键帧信息
    1000, // 动画持续时长
    {
      scrollSource: '#scroller', // scroll-view 的选择器
      startScrollOffset: 0, // 开始滚动偏移量
      endScrollOffset: 50, // 停止滚动偏移量
      timeRange: 1000, // 时间长度
    },
  )
  // 动画效果,导航栏标题
  pageInstance.animate('.navbar .title', [{ color: 'transparent' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50,
  })
  // 动画效果,导航栏返回按钮
  pageInstance.animate('.navbar .back', [{ color: '#fff' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50,
  })
})
</script>

<template>
  <!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="wrap">
      <navigator
        v-if="pages.length > 1"
        open-type="navigateBack"
        class="back icon-left"
      ></navigator>
      <navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home">
      </navigator>
      <view class="title">订单详情</view>
    </view>
  </view>
  <scroll-view class="viewport" scroll-y enable-back-to-top id="scroller">
    ...滚动容器
  </scroll-view>
</template>
```



#### 3、获取订单详情

##### 3.1类型声明

```ts
/** 订单详情 返回信息 */
export type OrderResult = {
  /** 订单编号 */
  id: string
  /** 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消 */
  orderState: number
  /** 倒计时--剩余的秒数 -1 表示已经超时，正数表示倒计时未结束 */
  countdown: number
  /** 商品集合 [ 商品信息 ] */
  skus: OrderSkuItem[]
  /** 收货人 */
  receiverContact: string
  /** 收货人手机 */
  receiverMobile: string
  /** 收货人完整地址 */
  receiverAddress: string
  /** 下单时间 */
  createTime: string
  /** 商品总价 */
  totalMoney: number
  /** 运费 */
  postFee: number
  /** 应付金额 */
  payMoney: number
}

/** 商品信息 */
export type OrderSkuItem = {
  /** sku id */
  id: string
  /** 商品 id */
  spuId: string
  /** 商品名称 */
  name: string
  /** 商品属性文字 */
  attrsText: string
  /** 数量 */
  quantity: number
  /** 购买时单价 */
  curPrice: number
  /** 图片地址 */
  image: string
}
```



##### 3.2 封装请求

```ts
/**
 * 获取订单详情
 * @param id 订单id
 */
export const getMemberOrderByIdAPI = (id: string) => {
  return request<OrderResult>({
    method: 'GET',
    url: `/member/order/${id}`,
  })
}
```



##### 3.3 订单渲染

和前面渲染同理，根据后端返回数据通过vue的`{{}}`语法插值即可。





#### 4、订单状态渲染

参考效果：

<img src="uniApp—day05.assets/image-20240304234240709.png" alt="image-20240304234240709" style="zoom:67%;" />

在订单详情中除了展示订单信息外，还需要根据不同**订单状态**展示不同的内容。

| 订单状态（orderState） | 含义   |
| :--------------------- | :----- |
| 1                      | 待付款 |
| 2                      | 待发货 |
| 3                      | 待收货 |
| 4                      | 待评价 |
| 5                      | 已完成 |
| 6                      | 已取消 |

##### 4.1 订单状态常量

枚举的作用：通过枚举来替代无意义的**订单状态**数字，提高程序的可读性。

`src/services/constants.ts`

```ts
/** 订单状态枚举 */
export enum OrderState {
  /** 待付款 */
  DaiFuKuan = 1,
  /** 待发货 */
  DaiFaHuo = 2,
  /** 待收货 */
  DaiShouHuo = 3,
  /** 待评价 */
  DaiPingJia = 4,
  /** 已完成 */
  YiWanCheng = 5,
  /** 已取消 */
  YiQuXiao = 6,
}

/** 订单状态列表 */
export const orderStateList = [
  { id: 0, text: '' },
  { id: 1, text: '待付款' },
  { id: 2, text: '待发货' },
  { id: 3, text: '待收货' },
  { id: 4, text: '待评价' },
  { id: 5, text: '已完成' },
  { id: 6, text: '已取消' },
]
```

根据后端返回的数据渲染订单详情。

```vue
<script setup lang="ts">
import { OrderState, orderStateList } from '@/services/constants'

// 获取订单详情
const order = ref<OrderResult>()
const getMemberOrderByIdData = async () => {
  const res = await getMemberOrderByIdAPI(query.id)
  order.value = res.result
}

onLoad(() => {
  getMemberOrderByIdData()
})
</script>

<template>
  <!-- 订单状态 -->
  <view class="overview">
    <!-- 待付款状态:展示去支付按钮和倒计时 -->
    <template v-if="order.orderState === OrderState.DaiFuKuan">
      <view class="status icon-clock">等待付款</view>
      <view class="tips">
        <text class="money">应付金额: ¥ 99.00</text>
        <text class="time">支付剩余</text>
        00 时 29 分 59 秒
      </view>
      <view class="button">去支付</view>
    </template>
    <!-- 其他订单状态:展示再次购买按钮 -->
    <template v-else>
      <!-- 订单状态文字 -->
      <view class="status"> {{ orderStateList[order.orderState].text }} </view>
      <navigator
        class="button"
        :url="`/pagesOrder/create/create?orderId=${query.id}`"
        hover-class="none"
      >
        再次购买
      </navigator>
      <!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
      <view v-if="false" class="button"> 模拟发货 </view>
    </template>
  </view>
</template>
```





#### 5、待付款 - 倒计时

通过 uni-ui 组件库的 [uni-countdown](https://uniapp.dcloud.net.cn/component/uniui/uni-countdown.html) 实现倒计时。

实现步骤：

<img src="uniApp—day05.assets/image-20240304235941242.png" alt="image-20240304235941242" style="zoom:67%;" />

实现代码：

```vue
<script setup lang="ts">
// 倒计时结束事件
const onTimeup = () => {
  // 修改订单状态为已取消
  order.value!.orderState = OrderState.YiQuXiao
}
</script>

<template>
  <!-- 待付款状态:展示去支付按钮和倒计时 -->
  <template v-if="order.orderState === OrderState.DaiFuKuan">
    <view class="status icon-clock">等待付款</view>
    <view class="tips">
      <text class="money">应付金额: ¥ 99.00</text>
      <text class="time">支付剩余</text>
      <!-- 倒计时组件 -->
      <uni-countdown
        :second="order.countdown"
        color="#fff"
        splitor-color="#fff"
        :show-day="false"
        :show-colon="false"
        @timeup="onTimeup"
      />
    </view>
    <view class="button">去支付</view>
  </template>
</template>
```





#### 6、订单支付

订单支付其实就是根据订单号查询到支付信息，在小程序中调用微信支付的 API 而已。

##### 6.1 [微信支付说明](https://megasu.gitee.io/uni-app-shop-note/rabbit-shop/order.html#微信支付说明)

1. 由于微信支付的限制，仅 **appid** 为 `wx26729f20b9efae3a` 的开发者才能调用该接口。此外，开发者还需要微信授权登录。
2. 对于其他开发者，可以使用**模拟支付接口**进行开发测试，调用后，订单状态将自动更新为`已支付` 。

###### **调用接口**

- 生产环境：调用正式接口，获取微信支付参数 + 发起微信支付
- 开发环境：调用模拟接口，通过模拟支付，修改订单状态为已支付

> 注意事项：开发环境的模拟订单支付，更新订单状态为待发货，仅开发和学习使用。

<img src="uniApp—day05.assets/image-20240305000932580.png" alt="image-20240305000932580" style="zoom:67%;" />

`services/pay.ts`

```ts
import { request } from '@/utils/request'

/**
 * 获取微信支付参数
 * @param data orderId 订单id
 */
export const getPayWxPayMiniPayAPI = (data: { orderId: string }) => {
  return request<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data,
  })
}

/**
 * 模拟支付-内测版
 * @param data orderId 订单id
 */
export const getPayMockAPI = (data: { orderId: string }) => {
  return request({
    method: 'GET',
    url: '/pay/mock',
    data,
  })
}
```



##### 6.2 支付成功页

主要用于展示支付结果。

###### 静态结构

`src/pagesOrder/payment/index.vue`

```vue
<script setup lang="ts">
import { useGuessList } from '@/composables/index'

// 获取页面参数
const query = defineProps<{
  id: string
}>()

// 猜你喜欢
const { guessRef, onScrolltolower } = useGuessList()
</script>

<template>
  <scroll-view class="viewport" scroll-y @scrolltolower="onScrolltolower">
    <!-- 订单状态 -->
    <view class="overview">
      <view class="status icon-checked">支付成功</view>
      <view class="buttons">
        <navigator
          hover-class="none"
          class="button navigator"
          url="/pages/index/index"
          open-type="switchTab"
        >
          返回首页
        </navigator>
        <navigator
          hover-class="none"
          class="button navigator"
          :url="`/pagesOrder/detail/detail?id=${query.id}`"
          open-type="redirect"
        >
          查看订单
        </navigator>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.viewport {
  background-color: #f7f7f8;
}

.overview {
  line-height: 1;
  padding: 50rpx 0;
  color: #fff;
  background-color: #27ba9b;

  .status {
    font-size: 36rpx;
    font-weight: 500;
    text-align: center;
  }

  .status::before {
    display: block;
    font-size: 110rpx;
    margin-bottom: 20rpx;
  }

  .buttons {
    height: 60rpx;
    line-height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60rpx;
  }

  .button {
    text-align: center;
    margin: 0 10rpx;
    font-size: 28rpx;
    color: #fff;

    &:first-child {
      width: 200rpx;
      border-radius: 64rpx;
      border: 1rpx solid #fff;
    }
  }
}
</style>
```





#### 7、待发货—模拟发货

仅在订单状态为待发货时，可模拟发货，调用后订单状态修改为待收货，包含模拟物流。

**仅在开发期间使用**，项目上线后应该是由商家发货。

参考效果：

<img src="uniApp—day05.assets/image-20240305213441401.png" alt="image-20240305213441401" style="zoom:67%;" />

实现步骤：

<img src="uniApp—day05.assets/image-20240305213513113.png" alt="image-20240305213513113" style="zoom:80%;" />

##### 7.1 封装请求API

```ts
// order.ts
/**
 * 模拟发货-内测版
 * @description 在DEV环境下使用，仅在订单状态为待发货时，可模拟发货，调用后订单状态修改为待收货，包含模拟物流。
 * @param id 订单id
 */
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
  return request({
    method: 'GET',
    url: `/member/order/consignment/${id}`,
  })
}
```



##### 7.2 实现代码

```vue
<script setup lang="ts">
// 是否为开发环境
const isDev = import.meta.env.DEV
// 模拟发货
const onOrderSend = async () => {
  if (isDev) {
    await getMemberOrderConsignmentByIdAPI(query.id)
    uni.showToast({ icon: 'success', title: '模拟发货完成' })
    // 主动更新订单状态
    order.value!.orderState = OrderState.DaiShouHuo
  }
}
</script>

<template>
  <!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
  <view v-if="isDev && order.orderState == OrderState.DaiFaHuo" @tap="onOrderSend" class="button">
    模拟发货
  </view>
</template>
```





#### 8、待收货—确认收货

点击确认收货时需二次确认，提示文案：**为保障您的权益，请收到货并确认无误后，再确认收货**。

参考效果：

<img src="uniApp—day05.assets/image-20240305214012198.png" alt="image-20240305214012198" style="zoom:67%;" />

实现步骤：

<img src="uniApp—day05.assets/image-20240305214059195.png" alt="image-20240305214059195" style="zoom:67%;" />

##### 8.1 封装请求API

```ts
// order.ts
/**
 * 确认收货
 * @description 仅在订单状态为待收货时，可确认收货。
 * @param id 订单id
 */
export const putMemberOrderReceiptByIdAPI = (id: string) => {
  return request<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/receipt`,
  })
}
```



##### 8.2 实现代码

```vue
<script setup lang="ts">
// 确认收货
const onOrderConfirm = () => {
  // 二次确认弹窗
  uni.showModal({
    content: '为保障您的权益，请收到货并确认无误后，再确认收货',
    success: async (success) => {
      if (success.confirm) {
        const res = await putMemberOrderReceiptByIdAPI(query.id)
        // 更新订单状态
        order.value = res.result
      }
    },
  })
}
</script>

<template>
  <!-- 待收货状态: 展示确认收货按钮 -->
  <view v-if="order.orderState === OrderState.DaiShouHuo" @tap="onOrderConfirm" class="button">
    确认收货
  </view>
</template>
```





#### 9、订单物流

仅在订单状态为**待收货，待评价，已完成**时，可获取物流信息。

参考效果：

<img src="uniApp—day05.assets/image-20240305220600717.png" alt="image-20240305220600717" style="zoom:67%;" />

实现步骤：

<img src="uniApp—day05.assets/image-20240305220615802.png" alt="image-20240305220615802" style="zoom:67%;" />

##### 9.1 封装请求API

类型声明 `order.d.ts`

```ts
/** 物流信息 返回值类型 */
export type OrderLogisticResult = {
  /** 快递公司 */
  company: {
    /** 公司名称 */
    name: string
    /** 快递编号 */
    number: string
    /** 联系电话 */
    tel: string
  }
  /** 商品件数 */
  count: number
  /** 物流日志 */
  list: LogisticItem[]
}

/** 物流日志 */
export type LogisticItem = {
  /** 信息ID */
  id: string
  /** 信息文字 */
  text: string
  /** 时间 */
  time: string
}
```

封装API `order.ts`

```ts
/**
 * 获取订单物流
 * @description 仅在订单状态为待收货，待评价，已完成时，可获取物流信息。
 * @param id 订单id
 */
export const getMemberOrderLogisticsByIdAPI = (id: string) => {
  return request<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`,
  })
}
```



##### 9.2 实现代码

```vue
<script setup lang="ts">
    // 获取订单详情
    const orderDetail = ref<OrderResult>()
    const getOrderDetail = async () => {
        const res = await getMemberOrderByIdAPI(query.id)
        orderDetail.value = res.result
        // 判断订单状态，如果是待收货，待评价，已完成时获取 【物流信息】
        if (
            [OrderState.DaiShouHuo, OrderState.DaiPingJia, OrderState.YiWanCheng].includes(
                orderDetail.value!.orderState,
            )
        ) {
            getLogisticList()
        }
    }
    ...
    // 获取物流信息
    const logisticList = ref<LogisticItem[]>([])
    const getLogisticList = async () => {
        const res = await getMemberOrderLogisticsByIdAPI(query.id)
        logisticList.value = res.result.list
    }
</script>
<template>
    <!-- 订单物流信息 -->
    <view v-for="item in logisticList" :key="item.id" class="item">
        <view class="message">
            {{ item.text }}
        </view>
        <view class="date"> {{ item.time }} </view>
    </view>
</template>
```



#### 10、删除订单

仅在订单状态为**待评价，已完成，已取消**时，可删除订单。

参考效果：

<img src="uniApp—day05.assets/image-20240306003346388.png" alt="image-20240306003346388" style="zoom:67%;" />

实现步骤：

<img src="uniApp—day05.assets/image-20240306003324953.png" alt="image-20240306003324953" style="zoom:67%;" />



##### 10.1 封装请求API

```ts
/**
 * 删除订单
 * @description 仅在订单状态为待评价，已完成，已取消时，可删除订单。
 * @param data ids 订单集合
 */
export const deleteMemberOrderAPI = (data: { ids: string[] }) => {
  return request({
    method: 'DELETE',
    url: `/member/order`,
    data,
  })
}
```



##### 10.2 实现代码

```vue
<script setup lang="ts">
    // 删除订单
    const onDeleteOrder = () => {
        // 点击删除时需要二次确认
        uni.showModal({
            content: '确定删除该订单吗？',
            success: async (success) => {
                if (success.confirm) {
                    await deleteMemberOrderAPI({ ids: [query.id] })
                    // 删除成功后，跳转到订单列表页
                    uni.redirectTo({ url: '/pagesOrder/list/index' })
                }
            },
        })
    }
</script>
<template>
<!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
<view
      class="button delete"
      @tap="onDeleteOrder"
      v-if="orderDetail.orderState >= OrderState.DaiPingJia"
      >
    删除订单
    </view>
</template>
```





#### 11、取消订单

仅在订单状态为**待付款**时，可取消订单。

实现步骤：

1. 封装请求API。
2. 调用请求接口，返回到订单列表页。

##### 11.1 封装请求API

```ts
// order.ts
/**
 * 取消订单
 * @description 仅在订单状态为待付款时，可取消订单。
 * @param id 订单id
 * @param data cancelReason 取消理由
 */
export const getMemberOrderCancelByIdAPI = (id: string, data: { cancelReason: string }) => {
  return request<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/cancel`,
    data,
  })
}
```



##### 11.2 实现代码

```vue
<script setup lang="ts">
    // 取消订单
    const onCancelOrder = async () => {
        // 调用接口
        await getMemberOrderCancelByIdAPI(query.id, { cancelReason: reason.value })
        uni.showToast({ icon: 'success', title: '取消订单成功' })
        setTimeout(() => {
            // 跳转到订单列表页
            uni.redirectTo({ url: '/pagesOrder/list/index' })
        }, 500)
    }
</script>
<template>
  <!-- 取消订单弹窗 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view class="popup-root">
      <view class="title">订单取消</view>
      <view class="description">
        <view class="tips">请选择取消订单的原因：</view>
        <view class="cell" v-for="item in reasonList" :key="item" @tap="reason = item">
          <text class="text">{{ item }}</text>
          <text class="icon" :class="{ checked: item === reason }"></text>
        </view>
      </view>
      <view class="footer">
        <view class="button" @tap="popup?.close?.()">取消</view>
        <view class="button primary" @tap="onCancelOrder">确认</view>
      </view>
    </view>
  </uni-popup>
</template>
```





```vue
<script setup lang="ts">
	
</script>
<template>

</template>
```

