<template>
  <div class="app">
    <h1 v-color="color1">自定义指令1测试</h1>
    <h1 v-color="color2">自定义指令2测试</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color1: "red",
      color2: "green",
    };
  },
  // 1.局部注册
  directives: {
    color: {
      // 1.inserted 元素被添加到页面当中的逻辑
      inserted(el, binding) {
        // binding.value 就是指令的值
        el.style.color = binding.value;
      },
      // 2.update 指令值修改的时候触发，提供值变化后，dom更新的逻辑
      update(el, binding) {
        console.log("指令的值发生了改变");
        el.style.color = binding.value;
      },
    },
  },
};
</script>

<style>
.base-chart-box {
  width: 200px;
  height: 100px;
}
</style>