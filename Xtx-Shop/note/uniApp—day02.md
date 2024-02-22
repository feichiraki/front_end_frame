## uni-app—小兔鲜微信小程序实战

> uni-app官网：https://uniapp.dcloud.net.cn/
>
> 小兔鲜-小程序官网：https://megasu.gitee.io/uni-app-shop-note/

### 推荐模块

#### 1、准备组件

实现步骤：

<img src="uniApp—day02.assets/image-20240221134017854.png" alt="image-20240221134017854" style="zoom:67%;" />

推荐模块的布局结构是相同的，因此我们可以复用相同的页面及交互，只是所展示的数据不同。

<img src="uniApp—day02.assets/image-20240221134518504.png" alt="image-20240221134518504" style="zoom:67%;" />

##### 1.1 静态结构

新建热门推荐页面文件，并在 `pages.json` 中添加路由（VS Code 插件自动完成）。

```vue
<script setup lang="ts">
// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image
        src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-20/84abb5b1-8344-49ae-afc1-9cb932f3d593.jpg"
      ></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text class="text active">抢先尝鲜</text>
      <text class="text">新品预告</text>
    </view>
    <!-- 推荐列表 -->
    <scroll-view scroll-y class="scroll-view">
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in 10"
          :key="goods"
          :url="`/pages/goods/goods?id=`"
        >
          <image
            class="thumb"
            src="https://yanxuan-item.nosdn.127.net/5e7864647286c7447eeee7f0025f8c11.png"
          ></image>
          <view class="name ellipsis">不含酒精，使用安心爽肤清洁湿巾</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">29.90</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">正在加载...</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}

.scroll-view {
  flex: 1;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;

  .text {
    margin: 0 20rpx;
    position: relative;
  }

  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;

  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    height: 88rpx;
    font-size: 26rpx;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .symbol {
    font-size: 70%;
  }

  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>

```



##### 1.2 修改热门推荐的跳转路由

热门推荐页要根据页面参数区分需要获取的是哪种类型的推荐列表，然后再去调用相应的接口，来获取不同的数据，再渲染到页面当中。

项目首页（传递参数）

```tsx
// src/pages/index/components/HotPanel.vue
<navigator :url="`/pages/hot/hot?type=${item.type}`">
  …省略  
</navigator>
```



##### 1.3 推荐详情模块获取参数

在`uni-app`中，`.vue`文件分为**页面文件**和**组件文件**。`defineProps`既可以用于接收父传子参数，也可用于页面传参参数。

```vue
// src/pages/hot/hot.vue
<script setup lang="ts">
// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
// uniapp 获取页面参数
const query = defineProps<{
  type: string
}>()
// console.log(query)
const currHot = hotMap.find((v) => v.type === query.type)
// 动态设置标题
uni.setNavigationBarTitle({ title: currHot!.title })
</script>
```





#### 2、获取数据

封装API接口，typescript类型，调用API获取数据

##### 2.1 根据文档封装接口

###### 地址参数

不同类型的推荐，需要调用不同的 API 接口：

| type | 推荐类型 | 接口路径        |
| :--- | :------- | :-------------- |
| 1    | 特惠推荐 | /hot/preference |
| 2    | 爆款推荐 | /hot/inVogue    |
| 3    | 一站买全 | /hot/oneStop    |
| 4    | 新鲜好物 | /hot/new        |

###### **Query:**

| 字段名称 | 是否必须 | 默认值 | 备注                 |
| :------- | :------- | :----- | :------------------- |
| subType  | 否       | 无     | 推荐列表 Tab 项的 id |
| page     | 否       | 1      | 页码                 |
| pageSize | 否       | 10     | 每页商品数量         |

###### 定义类型

由上述请求参数可知，我们需要定义一个类型。其中`page`和`pageSize`在分页的时候已经定义过了，我们只需要拿来用即可：

```ts
// types/hot.d.ts
import type { PageParams } from './global'

/** 推荐模块-请求参数类型 */
export type HotParams = PageParams & {
  /**Tab 项的 id，默认查询全部 Tab 项的第 1 页数据 */
  subType?: string
}
```

###### 封装API

```ts
// src/service/hot.ts

/**
 * 推荐-小程序
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommend = (url: string, data?: HotParams) => {
  return request({
    method: 'GET',
    url,
    data,
  })
}
```



##### 2.2 接口调用

推荐组件：`pages/hot/index.vue`

```vue
<script setup lang="ts">
    import { getHotRecommend } from '@/services/hot'
    import { onLoad } from '@dcloudio/uni-app'

    // 热门推荐页 标题和url
    const hotMap = [
       ...
    ]
        
	// ...省略

    // 获取数据
    const getHotRecommandData = async () => {
        const res = await getHotRecommend(currentHotMap!.url)
        console.log(res)
    }

    // 页面加载时调用API
    onLoad(() => {
        getHotRecommandData()
    })
</script>
```





#### 3、页面渲染&Tab交互

##### 3.1 页面渲染

###### 类型声明

电商项目较为常见商品展示，商品的类型是可复用的，封装到 `src/types/global.d.ts` 文件中：

```ts
// src/types/global.d.ts
/** 通用商品类型 */
export type GoodsItem = {
  /** 商品描述 */
  desc: string
  /** 商品折扣 */
  discount: number
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品已下单数量 */
  orderNum: number
  /** 商品图片 */
  picture: string
  /** 商品价格 */
  price: number
}
```

其实猜你喜欢的商品类型也相同，可复用通用商品类型，封装到 `src/services/home.ts` 文件中：

```ts
// src/services/home.ts
import type { GoodsItem } from '@/types/global'

// GuessItem 和 GoodsItem 类型相同
export type GuessItem = GoodsItem
```

热门推荐类型如下，新建 `src/types/hot.d.ts` 文件：

```ts
import type { PageResult, GoodsItem } from './global'

/** 热门推荐 */
export type HotResult = {
  /** id信息 */
  id: string
  /** 活动图片 */
  bannerPicture: string
  /** 活动标题 */
  title: string
  /** 子类选项 */
  subTypes: SubTypeItem[]
}

/** 热门推荐-子类选项 */
export type SubTypeItem = {
  /** 子类id */
  id: string
  /** 子类标题 */
  title: string
  /** 子类对应的商品集合 */
  goodsItems: PageResult<GoodsItem>
}
```

###### 升级API

```ts
// src/services/hot.ts
import type { HotParams, HotResult } from '@/types/hot'

export const getHotRecommend = (url: string, data?: HotParams) => {
  return request<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
```

###### 页面渲染

```vue
<script setup lang="ts">
import { getHotRecommend } from '@/services/hot'
import type { SubType } from '@/types/hot'
import { ref } from 'vue'

// 省略...

// 推荐封面图
const bannerImage = ref('')
// 推荐选项
const subTypes = ref<SubType[]>([])
// 高亮的下标
const activeIndex = ref(0)
// 调用接口获取数据
const getHotRecommandData = async () => {
  const res = await getHotRecommend(currentHotMap!.url)
  // 保存封面
  bannerImage.value = res.result.bannerPicture
  // 保存列表
  subTypes.value = res.result.subTypes
}

// 页面加载时...
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerImage"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        class="text"
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in subTypes"
        :key="item.id"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      scroll-y
      class="scroll-view"
      v-for="(item, index) in subTypes"
      v-show="activeIndex === index"
      :key="item.id"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="good in item.goodsItems.items"
          :key="good.id"
          :url="`/pages/goods/goods?id=${good.id}`"
        >
          <image class="thumb" :src="good.picture"></image>
          <view class="name ellipsis">{{ good.desc }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ good.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">正在加载...</view>
    </scroll-view>
  </view>
</template>
```



##### 3.2 Tab交互

<img src="uniApp—day02.assets/image-20240221222204365.png" alt="image-20240221222204365" style="zoom:67%;" />

实际上就是点击对应Tab项，显示对应的内容。据后端返回的数据，得到`subTypes`数组有多少条，代表着有多少个Tab项。

<img src="uniApp—day02.assets/image-20240221222452945.png" alt="image-20240221222452945" style="zoom:67%;" />

在上面的渲染中，其实该做的已经做了，我们只需要在点击的时候变化`activeIndex`的值为当前所选择的Tab项的`index`值即可。

给Tab项加上`tap`事件：

```vue
<text
      class="text"
      :class="{ active: activeIndex === index }"
      v-for="(item, index) in subTypes"
      :key="item.id"
      @tap="activeIndex = index"
      >{{ item.title }}</text
    >

<scroll-view
             scroll-y
             class="scroll-view"
             v-for="(item, index) in subTypes"
             v-show="activeIndex === index"
             :key="item.id"
             >
    //... 省略
</scroll-view>
```

最后通过`v-show`和`activeIndex`将选中Tab项的容器显示出来，其他项容器则隐藏。





#### 4、分页加载

<img src="uniApp—day02.assets/image-20240222000614179.png" alt="image-20240222000614179" style="zoom:67%;" />

这里实现的分页加载和前面在`XtxGuess`实现的方式是同理的。

* 给`scroll-view`绑定`scrolltolower`事件。
* 当容器下拉到底部时，发送数据请求。
* 将最新的数据追加到旧数据的后面 => 数组追加。

```vue
<script setup lang="ts">
// ...

// 下拉刷新
const onScrolltolower = async () => {
  // 获取当前项
  const currSubTypes = subTypes.value[activeIndex.value]
  // 页码累加
  currSubTypes.goodsItems.page++
  // 调用API
  const res = await getHotRecommend(currentHotMap!.url, {
    page: currSubTypes.goodsItems.page,
    pageSize: currSubTypes.goodsItems.pageSize,
    subType: currSubTypes.id,
  })
  // 获取最新数据
  const newCurrSubTypes = res.result.subTypes[activeIndex.value]
  // 追加到数组
  currSubTypes.goodsItems.items.push(...newCurrSubTypes.goodsItems.items)
}
</script>

<!-- 推荐列表 -->
<scroll-view
             scroll-y
             class="scroll-view"
             v-for="(item, index) in subTypes"
             v-show="activeIndex === index"
             :key="item.id"
             @scrolltolower="onScrolltolower"
             >
    <!-- ... 省略代码 -->
</scroll-view>
```









#### 5、分页条件

当请求的**分页页码**超出**后端返回页码**时，将返回空的数组。遇到这样的情况，我们应该停止请求，避免浪费不必要的性能。

实现步骤：

<img src="uniApp—day02.assets/image-20240222000634827.png" alt="image-20240222000634827" style="zoom:67%;" />

```ts
// 下拉刷新
const onScrolltolower = async () => {
    // 获取当前项
    const currSubTypes = subTypes.value[activeIndex.value]
    // 分页条件
    if (currSubTypes.goodsItems.page < currSubTypes.goodsItems.pages) {
        currSubTypes.goodsItems.page++
    } else {
        // 标记已结束
        currSubTypes.finished = true
        return uni.showToast({ icon: 'none', title: '没有更多数据了~' })
    }
    // 页码累加
    currSubTypes.goodsItems.page++
    // 调用API
    const res = await getHotRecommend(currentHotMap!.url, {
        page: currSubTypes.goodsItems.page,
        pageSize: currSubTypes.goodsItems.pageSize,
        subType: currSubTypes.id,
    })
    // 获取最新数据
    const newCurrSubTypes = res.result.subTypes[activeIndex.value]
    // 追加到数组
    currSubTypes.goodsItems.items.push(...newCurrSubTypes.goodsItems.items)
}
```

```tsx
<view class="loading-text"> {{ item.finished ? '没有更多数据了~' : '正在加载...' }}</view>
```







### 分类模块

#### 1、准备组件

商品分类页中的广告位，可复用之前定义的轮播图组件 `XtxSwiper`。

<img src="uniApp—day02.assets/image-20240222153705997.png" alt="image-20240222153705997" style="zoom:67%;" />

##### 1.1 静态结构

商品分类页静态结构： `src/pages/category/category.vue`：

```vue
<script setup lang="ts">
//
</script>

<template>
  <view class="viewport">
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
        <view v-for="(item, index) in 10" :key="item" class="item" :class="{ active: index === 0 }">
          <text class="name"> 居家 </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view class="secondary" scroll-y>
        <!-- 焦点图 -->
        <XtxSwiper class="banner" :list="[]" />
        <!-- 内容区域 -->
        <view class="panel" v-for="item in 3" :key="item">
          <view class="title">
            <text class="name">宠物用品</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <view class="section">
            <navigator
              v-for="goods in 4"
              :key="goods"
              class="goods"
              hover-class="none"
              :url="`/pages/goods/goods?id=`"
            >
              <image
                class="image"
                src="https://yanxuan-item.nosdn.127.net/674ec7a88de58a026304983dd049ea69.jpg"
              ></image>
              <view class="name ellipsis">木天蓼逗猫棍</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">16.00</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
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
.search {
  padding: 0 30rpx 20rpx;
  background-color: #fff;
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64rpx;
    padding-left: 26rpx;
    color: #8b8b8b;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: #f3f4f4;
  }
}
.icon-search {
  &::before {
    margin-right: 10rpx;
  }
}
/* 分类 */
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
}
/* 一级分类 */
.primary {
  overflow: hidden;
  width: 180rpx;
  flex: none;
  background-color: #f6f6f6;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96rpx;
    font-size: 26rpx;
    color: #595c63;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 42rpx;
      bottom: 0;
      width: 96rpx;
      border-top: 1rpx solid #e3e4e7;
    }
  }
  .active {
    background-color: #fff;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 8rpx;
      height: 100%;
      background-color: #27ba9b;
    }
  }
}
.primary .item:last-child::after,
.primary .active::after {
  display: none;
}
/* 二级分类 */
.secondary {
  background-color: #fff;
  .carousel {
    height: 200rpx;
    margin: 0 30rpx 20rpx;
    border-radius: 4rpx;
    overflow: hidden;
  }
  .panel {
    margin: 0 30rpx 0rpx;
  }
  .title {
    height: 60rpx;
    line-height: 60rpx;
    color: #333;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f7f7f8;
    .more {
      float: right;
      padding-left: 20rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
  .more {
    &::after {
      font-family: 'erabbit' !important;
      content: '\e6c2';
    }
  }
  .section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0;
    .goods {
      width: 150rpx;
      margin: 0rpx 30rpx 20rpx 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
      image {
        width: 150rpx;
        height: 150rpx;
      }
      .name {
        padding: 5rpx;
        font-size: 22rpx;
        color: #333;
      }
      .price {
        padding: 5rpx;
        font-size: 18rpx;
        color: #cf4444;
      }
      .number {
        font-size: 24rpx;
        margin-left: 2rpx;
      }
    }
  }
}
</style>
```



##### 1.2 渲染轮播图

**接口调用**

渲染轮播图数据业务功能对于前端来说比较简单，只需调用后端提供的接口将获得的数据展现。

> 注意：传递参数 `2` 标识获取商品分类页广告。

```vue
<script setup lang="ts">
import { getHomeBannerAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'

// 获取轮播图数据
const categoryBannerList = ref<BannerItem[]>([])
const getBannerData = async () => {
  // 传递参数2,标识获取商品分类页广告
  const res = await getHomeBannerAPI(2)
  // 存放轮播图数据
  categoryBannerList.value = res.result
}

// 加载时调用接口
onLoad(() => {
  getBannerData()
})
</script>

<!-- 焦点图 -->
<XtxSwiper class="banner" :list="categoryBannerList" />
```





#### 2、渲染一级分类和Tab交互

##### 2.1 封装API接口

```ts
/**
 * 获取分类数据
 */
export const getCategoryTopAPI = () => {
    return request({
        method: 'GET',
        url: '/category/top',
    })
}
```



##### 2.2 初始化调用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// ...
import { getCategoryTopAPI } from '@/services/category'

// 获取轮播图数据...
    
// 获取分类数据
const getCategoryData = async () => {
  const res = await getCategoryTopAPI()
  console.log(res)
}

// 加载时调用接口
onLoad(() => {
  getBannerData()
  getCategoryData()
})
</script>
```



##### 2.3 定义类型

```ts
// src/types/category.d.ts
import { GoodsItem } from './global'
/**
 * 一级分类项
 */
export interface CategoryTopItem {
  /**
   * 二级分类集合
   */
  children: CategoryChildItem[]
  /**
   * 一级分类id
   */
  id: string
  /**
   * 一级分类图片集
   */
  imageBanners: string[]
  /**
   * 一级分类名称
   */
  name: string
  /**
   * 一级分类图片
   */
  picture: string
}

/**
 * 二级分类项
 */
export interface CategoryChildItem {
  /**
   * 商品集合
   */
  goods: GoodsItem[]
  /**
   * 二级分类id
   */
  id: string
  /**
   * 二级分类名称
   */
  name: string
  /**
   * 二级分类图片
   */
  picture: string
}
```

接口添加类型规范：

```ts
/**
 * 获取分类数据
 */
export const getCategoryTopAPI = () => {
  return request<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
```

商品分页模块需要更改几处代码：

```ts
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import type { CategoryTopItem } from '@/types/category'
import { getCategoryTopAPI } from '@/services/category'

// 获取分类数据 => 添加类型规范
const categoryTopData = ref<CategoryTopItem[]>([])
const getCategoryData = async () => {
  const res = await getCategoryTopAPI()
  categoryTopData.value = res.result
}
```



##### 2.4 渲染一级分类

```vue
<!-- 左侧：一级分类 -->
<scroll-view class="primary" scroll-y>
    <view
          v-for="(item, index) in categoryTopData"
          :key="item.id"
          class="item"
          :class="{ active: index === 0 }"
          >
        <text class="name"> {{ item.name }} </text>
    </view>
</scroll-view>
```



##### 2.5 一级分类Tab交互

当用户点击一级分类时，需要高亮显示，即给它添加 `.active` 类名即可。

1. 添加一个`activeIndex`变量来存储tab项的`index`。
2. vue语法绑定类样式判断条件：`activeIndex === index`。
3. 给Tab绑定`tap`监听事件，点击哪一项，将`index`值赋值给`activeIndex`。

```tsx
// 创建tab项选中索引存储 , 默认选中第一项
const activeIndex = ref(0)


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
```





#### 3、二级分类和商品渲染

##### 3.1 提取二级分类数据

> 主要难点是如何从一级分类中提取出二级分类。

商品二级分类是从属于某个一级分类的，通过 `computed` 配合**高亮下标**提取当前二级分类数据。

```ts
// 提取二级分类数据
const subCategoryList = computed(() => {
  return categoryTopData.value[activeIndex.value]?.children || []
})
```



##### 3.2 渲染二级分类

```tsx
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
                :url="`/pages/goods/goods?id=${good.id}`"
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
```





#### 4、骨架屏

实现步骤参考首页的骨架屏。

**参考效果**

<img src="uniApp—day02.assets/image-20240222224534562.png" alt="image-20240222224534562" style="zoom:67%;" />

商品分类页代码(总)：

```vue
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
              :url="`/pages/goods/goods?id=${good.id}`"
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
```





### 详情模块

#### 1、准备组件





#### 2、页面渲染





#### 3、轮播图交互





#### 4、骨架屏





#### 5、弹出层





#### 6、弹出层交互







