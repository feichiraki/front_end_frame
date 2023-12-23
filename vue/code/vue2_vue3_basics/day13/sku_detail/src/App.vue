<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import powerSet from '@/composables/power_set'

const goods = ref({})
let pathMap = {}

// 同规格选中功能
// 1. 同规格只能有一个是选中状态，其他的则是未选中状态
// 2. 选中了其中一个，另一个应该取消选中状态
// 3. val.selected 默认是 false（默认val对象是没有selected属性的，
// const onChange = (val, id) => {
//   console.log(val, id)
//   val.selected = true
//   // 遍历goods.specs，找到id对应的specs中的子对象，然后通过子对象遍历找到val对象
//   goods.value.specs.forEach((item) => {
//     // item.id === id 才继续进行操作
//     if (item.id === id) {
//       // 遍历item.values，排除掉val对象，其他对象设置selected为false
//       item.values.forEach((i) => {
//         if (val.name !== i.name) {
//           i.selected = false
//         }
//       })
//     }
//   })
// }
const onChange = (val, item) => {
  // 如果val.disabled为true，则不执行任何操作
  if (val.disabled) return

  // 当val.selected为true时，设置为false，否则设置为true
  // 这样的效果是：当你已经选择了该规格时，再次点击该规格，则取消选择
  if (val.selected) {
    val.selected = false
  } else {
    // 遍历item.values，将所有对象的selected设置为false
    item.values.forEach((valItem) => (valItem.selected = false))
    val.selected = true
  }
  // 改变选中状态
  updateState(goods.value.specs, pathMap)

  // 产出SKU对象数据
  const isExists = getSelectedArr(goods.value.specs).includes(undefined)
  if (isExists) {
    console.log('找到了，信息不完整')
  } else {
    // 信息完整，可以产出
    // console.log(pathMap)
    // 获取产出的key
    const key = getSelectedArr(goods.value.specs).join('-')
    // 通过key在pathMap中找到对应的id
    const skuId = pathMap[key]
    // console.log(skuId)
    // 以skuId作为匹配项去goods.value.skus数组中找
    const skuObj = goods.value.skus.find((item) => item.id === skuId[0])
    console.log(skuObj)
  }

  // const index = getSelectedArr(goods.value.specs).findIndex(
  //   (item) => item === undefined
  // )
  // if (index > -1) {
  //   console.log('找到了，信息不完整')
  // } else {
  //   console.log('没有找到，信息完整，可以产出')
  //   // 获取sku对象
  //   const key = getSelectedArr(goods.value.specs).join('*')
  //   const skuIds = pathMap[key]
  //   console.log(skuIds)
  //   // 以skuId作为匹配项去goods.value.skus数组中找
  //   const skuObj = goods.value.skus.find((item) => item.id === skuIds[0])
  //   console.log('sku对象为', skuObj)
  // }
}

// 规格禁用功能实现
// 为什么会有这种需求？
// 因为规格值是动态的，在某些情况下，商品可能没有该规格值，那么该规格值就应该被禁用
// 另一种情况，商品被卖断货了，所以导致库存不足，所以禁用当前商品
// 创建生成路径字典对象函数
const getPathMap = (goods) => {
  const pathMap = {}
  // 1.得到所有有效集合
  const effectiveSkus = goods.skus.filter((item) => item.inventory > 0)
  // 2.根据有效的Sku集合使用powerSet算法得到所有子集 [1,2] => {[1],[2],[1,2]}
  effectiveSkus.forEach((sku) => {
    // 2.1 获取可选规格数组
    const selectedValArr = sku.specs.map((val) => val.valueName)
    // 2.2 获取可选值数组的子集
    const subSelectedArr = powerSet(selectedValArr)
    // 3.根据子集生成路径字典对象
    // 3.1 遍历子集，向pathMap中添加子集对应的sku对象
    subSelectedArr.forEach((arr) => {
      // 根据Arr得到字符串的key，约定使用-分割 ['蓝色','美国'] => '蓝色-美国'
      const key = arr.join('-')
      // 向pathMap中插入数据
      if (pathMap[key]) {
        pathMap[key].push(sku.id)
      } else {
        pathMap[key] = [sku.id]
      }
    })
  })
  // 4.返回pathMap 路径字典对象
  return pathMap
}

// 根据路径字典设置初始化状态
// specs：商品源数据(后端传递数据) pathMap:路径字典(根据后端数据前端算法生产)
const setInitState = (specs, pathMap) => {
  // console.log(specs, pathMap)
  // 约定：每一个按钮的状态都由自身的disabled属性控制
  specs.forEach((item) => {
    item.values.forEach((val) => {
      // 路径字典中查找是否有该数据 有->可以点击 无->禁用
      val.disabled = !pathMap[val.name]
    })
  })
}

// 获取选中匹配数组['黑色',undefined,undefined]
const getSelectedArr = (specs) => {
  const arr = []
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((value) => value.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}

const updateState = (specs, pathMap) => {
  // 约定：每一个按钮的状态都由自身的disabled属性控制
  specs.forEach((spec, index) => {
    const selectedValues = getSelectedArr(specs)
    spec.values.forEach((val) => {
      if (val.selected) return
      selectedValues[index] = val.name
      // 路径字典中查找是否有该数据 有->可以点击 无->禁用
      const key = selectedValues.filter((value) => value).join('-')
      if (pathMap[key]) {
        val.disabled = false
      } else {
        val.disabled = true
      }
    })
  })
}

const getGoods = async () => {
  const res = await axios.get(
    'http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074'
  )
  goods.value = res.data.result
  // 初始化时获取路径字典对象
  pathMap = getPathMap(goods.value)
  // 初始化时更新按钮状态
  setInitState(goods.value.specs, pathMap)
}
onMounted(() => getGoods())
</script>

<template>
  <div class="good-skus">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-if="val.picture"
            :src="val.picture"
            :alt="val.name"
            @click="onChange(val, item)"
          />
          <!-- 文字类型规格 -->
          <span
            @click="onChange(val, item)"
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin goods-sku-style {
  margin-bottom: 4px;
  margin-right: 10px;
  border: 1px solid #e4e4e4;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.good-skus {
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        @include goods-sku-style;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        @include goods-sku-style;
      }
    }
  }
}
</style>
