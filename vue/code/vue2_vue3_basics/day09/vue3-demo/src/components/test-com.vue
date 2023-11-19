<script setup>
const count =100
const sayHi = ()=>{
    console.log('Hi')
}

defineExpose({
    count,
    sayHi
})
</script>

<template>
    <div>
        我是用于测试的一个组件
    </div>
</template>