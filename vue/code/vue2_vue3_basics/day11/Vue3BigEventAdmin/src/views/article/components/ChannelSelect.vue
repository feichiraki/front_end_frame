<script setup>
import { useArticleStore } from '@/stores'
import { onMounted } from 'vue'

defineProps({
  modeValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modeValue'])

const articleStore = useArticleStore()
onMounted(() => {
  articleStore.getChannel()
})
</script>
<template>
  <el-select
    :style="{ width }"
    :modelValue="modeValue"
    @update:modelValue="emit('update:modeValue', $event)"
  >
    <el-option
      v-for="channel in articleStore.channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
