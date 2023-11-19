<script setup>
import {ref,computed} from 'vue'

// const 计算属性 = computed(()=>{return 计算返回的结果})
// 声明数据
const list = ref([1,2,3,4,5,6,7,8])

// 基于list派生出一个计算属性，从list中进行过滤出 >2
const computedList = computed(()=>{
  return list.value.filter(item => item>2)
})

// 定义一个修改数组的方法
const addFn = ()=>{
  list.value.push(666)
}
</script>

<template>
<div>原始数据：{{list }}</div>
<div>计算之后的数据:{{ computedList }}</div>
<button type="button" @click="addFn">修改</button>
</template>