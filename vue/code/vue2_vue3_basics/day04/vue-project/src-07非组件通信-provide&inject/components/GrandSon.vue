<template>
  <div>
    我是GrandSon组件
    <p>{{ color }} - {{ userInfo.name }} - {{ userInfo.age }}</p>
  </div>
</template>

<script>
export default {
  inject: ["color", "userInfo"],
};
</script>

<style>
</style>