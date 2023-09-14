<template>
  <div class="app">
    我是App组件
    <!-- 1.给组件标签,以添加属性的方式,传值 -->
    <SonOne :title="myTitle" @changeTitle="changeFn"></SonOne>
  </div>
</template>

<script>
import SonOne from "./components/SonOne";

export default {
  name: "App",
  data() {
    return {
      myTitle: "大儿子",
    };
  },
  methods: {
    changeFn(newTitle) {
      this.myTitle = newTitle;
    },
  },
  components: {
    SonOne,
  },
};
</script>

<style>
.app {
  font-size: 20px;
}
</style>
