<template>
  <div class="app">
    <h1>自定义指令</h1>
    <input type="text" v-focus ref="inp" />
  </div>
</template>

<script>
export default {
  // mounted() {
  //   this.$refs.inp.focus();
  // },
  // 1.局部注册
  // directives: {
  //   focus: {
  //     inserted(el) {
  //       // 可以对 el 标签，扩展额外功能
  //       el.focus();
  //     },
  //   },
  // },
};
</script>

<style>
.base-chart-box {
  width: 200px;
  height: 100px;
}
</style>