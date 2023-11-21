<script setup>
import { storeToRefs } from 'pinia';
import Son1Com from './components/Son1Com.vue';
import Son2Com from './components/Son2Com.vue';
import { useCountStore } from '@/store/counter'
import { useChannelStore } from './store/channel';

const counterStore = useCountStore()
const channelStore = useChannelStore()

// 结构将不再具有响应式，原因：响应式是基于原始对象的，结构是重新创建变量并进行赋值，并不具备响应式功能
// const {count ,msg} = counterStore
// 解决：利用 storeToRefs()函数进行响应式处理。原理：将对象中属性的引用赋值给结构变量
const {count,msg } = storeToRefs(counterStore)

</script>

<template>
  <h3>App.vue根组件 - {{ count }} - {{ msg }}</h3>
  <Son1Com></Son1Com>
  <Son2Com></Son2Com>
  <hr>
  <button @click="channelStore.getList">获取频道数据</button>
  <ul>
    <li v-for="item in channelStore.channelList" :key="item.id">{{item.name}}</li>
  </ul>
</template>

<style scoped>

</style>
