<script setup>
import { defineModel } from 'vue';
defineProps({
    modelValue:String
})
const modelValue = defineModel()
</script>

<template>
    <input 
    type="text" 
    :value="modelValue"
    @input="e => modelValue = e.target.value"
    >
</template>