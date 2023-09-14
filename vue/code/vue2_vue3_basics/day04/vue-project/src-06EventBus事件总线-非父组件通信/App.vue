<template>
  <!-- 主体区域 -->
  <div id="app">
    <BaseA></BaseA>
    <BaseB></BaseB>
  </div>
</template>

<script>
import BaseA from "./components/BaseA.vue";
import BaseB from "./components/BaseB.vue";
// import ToDoFooterVue from "./components/ToDoFooter.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  components: {
    BaseA,
    BaseB,
  },
};
</script>

<style>
.app {
  font-size: 20px;
}
</style>
