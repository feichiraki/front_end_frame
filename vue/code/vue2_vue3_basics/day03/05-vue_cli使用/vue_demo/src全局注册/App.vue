<template>
  <div class="App">
    <!-- 头部组件 -->
    <frHeader></frHeader>
    <!-- 主体组件 -->
    <frMain></frMain>
    <!-- 底部组件 -->
    <frFooter></frFooter>

    <!-- 
      关于vue文件中的标签，如果 标签名 + tab 出不来 => 需要配置 vscode
     -->
  </div>
</template>

<script>
// 导入组件
import frHeader from "./components/frHeader.vue";
import frMain from "./components/frMain.vue";
import frFooter from "./components/frFooter.vue";

export default {
  components: {
    // 组件名:组件对象
    // 组件名和组件对象同名，可以简写
    frHeader,
    frMain,
    frFooter,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.App {
  width: 600px;
  height: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #87ceeb;
}
</style>
