<script setup>
import { provide,ref } from 'vue';
import CenterCom from '@/components/center-com.vue'

// 1.跨层传递普通数据
provide('theme-color', 'blue')
// 2.跨层传递响应式数据
const count = ref(100)
provide('count',count)


setTimeout(()=>{
    count.value = 500
},2000)

// 3.跨层级传递函数 => 给子孙级传递可以修改数据的方法
provide('changeNum', (newValue) => {
    count.value = newValue
}) 
</script>

<template>
    <h1>我是顶层组件</h1>
    <CenterCom></CenterCom>
</template>