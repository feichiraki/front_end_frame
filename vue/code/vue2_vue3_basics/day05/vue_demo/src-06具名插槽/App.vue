<template>
  <div>
    <MyDialog>
      <!-- 给组件具名插槽分发内容 -->
      <!-- 使用template标签给具名插槽分发定制内容 -->
      <template #head>
        <div>我是大标签</div>
      </template>
      <template #content>
        <div>我是内容</div>
      </template>
      <template #footer>
        <div>
          <button>确认</button>
          <button>取消</button>
        </div>
      </template>
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