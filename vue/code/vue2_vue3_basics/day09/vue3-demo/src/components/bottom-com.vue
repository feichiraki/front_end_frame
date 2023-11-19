<script setup>
import { inject } from 'vue';

const themeColor = inject('theme-color')
const count = inject('count')
const changeNum = inject('changeNum')
const change = () => {
    changeNum(300)
}

</script>

<template>
    <h3>我是底层组件</h3>
    <div class="box">
        接收数据：{{ themeColor }} - {{ count }}
        <button @click="change">修改数据</button>
    </div>
</template>

<style scoped>
.box {
    margin-left: 20px;
}
</style>