<template>
  <!-- 主体区域 -->
  <div id="app">
    我是App组件 <button @click="change">修改数据</button>
    <SonA></SonA>
    <SonB></SonB>
  </div>
</template>

<script>
import SonA from "./components/SonA.vue";
import SonB from "./components/SonB.vue";
// import ToDoFooterVue from "./components/ToDoFooter.vue";

export default {
  name: "App",
  provide() {
    return {
      color: this.color,
      // 复杂类型【响应式】
      userInfo: this.userInfo,
    };
  },
  data() {
    return {
      color: "pink",
      userInfo: {
        name: "zs",
        age: 20,
      },
    };
  },
  methods: {
    change() {
      this.color = "green";
      this.userInfo.name = "lisi";
    },
  },
  components: {
    SonA,
    SonB,
  },
};
</script>

<style>
#app {
  width: 200px;
  padding: 20px;
  margin: 30px auto;

  border: 3px solid #000;
}
</style>
