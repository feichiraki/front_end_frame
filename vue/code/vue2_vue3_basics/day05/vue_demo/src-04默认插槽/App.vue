<template>
  <div>
    <MyDialog>
      <!-- 2.使用组件时，组件标签中填入内容 -->
      确定要删除吗？
    </MyDialog>
    <MyDialog>
      <!-- 2.使用组件时，组件标签中填入内容 -->
      确定要退出吗？
    </MyDialog>
  </div>
</template>

<script>
import MyDialog from "./components/MyDialog.vue";
export default {
  data() {
    return {};
  },
  components: {
    MyDialog,
  },
};
</script>

<style>
body {
  background-color: #b3b3b3;
}
</style>