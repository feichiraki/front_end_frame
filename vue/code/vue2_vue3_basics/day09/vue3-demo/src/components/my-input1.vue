<script setup>
defineProps({
    modelValue:String
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <input 
    type="text" 
    :value="modelValue"
    @input="e => emit('update:modelValue',e.target.value)"
    >
</template>