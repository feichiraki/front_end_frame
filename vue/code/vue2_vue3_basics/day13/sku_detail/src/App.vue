<script setup>
import { ref, onMounted } from 'vue'
import SkusIndex from '@/components/SkusIndex.vue'
import axios from 'axios'

const goods = ref({})

const getGoods = async () => {
  const res = await axios.get(
    'http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074'
  )
  goods.value = res.data.result
}
const getSkus = (sku) => {
  console.log(sku)
}
onMounted(() => getGoods())
</script>

<template>
  <SkusIndex @change="getSkus" :goods="goods"></SkusIndex>
</template>
