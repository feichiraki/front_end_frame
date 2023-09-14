<template>
  <div class="base-count">
    <button @click="count--">-</button>
    <span>{{ count }}</span>
    <button @click="count++">+</button>
  </div>
</template>

<script>
export default {
  // data必须是一个函数
  // 原因：保证每个组件实例，维护独立的一份数据对象
  data() {
    return {
      count: 999,
    };
  },
};
</script>

<style>
.base-count {
  margin: 20px;
}
.base-count span {
  margin: 5px;
}
</style>