<template>
  <div class="app">
    <button @click="isShow = true">退出按钮</button>
    <!-- 注意： :属性名.sync 中的属性名为自定义，不过我们不能乱取名，要把属性名和实现功能关联上。 -->
    <!-- <BaseDialog :hide.sync="isShow"></BaseDialog> -->
    <!-- 上面.sync的全写的写法 -->
    <BaseDialog :hide="isShow" @update:hide="isShow = $event"></BaseDialog>
  </div>
</template>

<script>
import BaseDialog from "./components/BaseDialog.vue";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    hide($event) {
      this.isShow = $event;
    },
  },
  components: {
    BaseDialog,
  },
};
</script>

<style>
</style>