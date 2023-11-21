<script setup>
import { useCountStore } from '@/store/counter'
const counterStore = useCountStore()
</script>

<template>
    <div>
        我是Son1.vue - {{counterStore.count}} - <button @click="counterStore.addCount">+</button> - {{ counterStore.double }}
    </div>
</template>

<style scoped></style>