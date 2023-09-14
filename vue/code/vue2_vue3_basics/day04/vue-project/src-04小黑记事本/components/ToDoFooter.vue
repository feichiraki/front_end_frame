<template>
  <!-- 统计和清空 -> 如果没有任务了,底部隐藏掉 -> v-show -->
  <footer class="footer" v-show="list.length > 0">
    <!-- 统计 -->
    <span class="todo-count"
      >合 计:<strong> {{ list.length }} </strong></span
    >
    <!-- 清空 -->
    <button class="clear-completed" @click="clear">清空任务</button>
  </footer>
</template>

<script>
export default {};
</script>

<style>
</style>