<script setup>
import { ref } from 'vue'
import MyInput from '@/components/my-input.vue'
const text = ref('12345')
</script>

<template>
    <MyInput v-model="text"></MyInput>
    {{ text }}
</template>