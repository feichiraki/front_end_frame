<template>
  <!-- 主体区域 -->
  <div id="app">
    <input type="text" v-model="msg1" />
    <!-- 模板中获取事件的形参 => $event获取 -->
    <input type="text" :value="msg2" @input="msg2 = $event.target.value" />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      msg1: "",
      msg2: "",
    };
  },
  methods: {},
  components: {},
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
