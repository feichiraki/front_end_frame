<template>
  <div>
    <h5>{{ title }}</h5>
    <button @click="changeFn">修改title</button>
  </div>
</template>

<script>
export default {
  // 2.子组件通过 props 接收父组件传递过来的数据
  // props 第一种接收方式:数组接收
  // 格式: ['属性名']
  props: ["title"],
  methods: {
    changeFn() {
      //   1.通过 $emit,向父组件发送消息通知
      this.$emit("changeTitle", "Vue-子传父");
    },
  },
};
</script>

<style>
</style>