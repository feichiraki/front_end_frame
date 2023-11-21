<script setup>
import { useCountStore } from '@/store/counter'
const counterStore = useCountStore()
</script>

<template>
    我是Son2.vue - {{ counterStore.count }} - <button @click="counterStore.subCount">-</button>
</template>

<style scoped></style>