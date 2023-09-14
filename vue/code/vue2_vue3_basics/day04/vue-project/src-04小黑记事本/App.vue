<template>
  <!-- 主体区域 -->
  <div id="app">
    <ToDoHeaderVue></ToDoHeaderVue>
    <ToDoMainVue :list="list"></ToDoMainVue>
    <!-- <ToDoFooterVue></ToDoFooterVue> -->
  </div>
</template>

<script>
import ToDoHeaderVue from "./components/ToDoHeader.vue";
import ToDoMainVue from "./components/ToDoMain.vue";
// import ToDoFooterVue from "./components/ToDoFooter.vue";

/**
 * 1.渲染功能
 *    (1) 提供数据 => 提供在公共的父组件 App.vue
 *    (2) 通过父传子 ，将数据传递给 ToDoMain.vue
 *    (3) 利用 v-for 渲染数据
 * 2.添加功能
 *    (1) 拿到输入框内容 => v-model
 *    (2) 进行监听事件(回车+点击 都要进行添加)
 *    (3) 子传父 => this.$emit,将任务名称传递给父组件
 *    (4) 进行添加 unshift (自己的数据自己负责)
 * 3.删除功能
 *    (1) 监听事件(监听删除点击) 携带id
 *    (2) 子传父,将删除的id传给父组件
 *    (3) 进行删除 filter(自己的数据自己负责)
 * 4.底部合计
 *    (1) 父传子 list => 渲染
 * 5.清空功能
 *    (1) 子传父,通知父组件清空数组
 *    (2) 父组件清空数组
 * 6.持久化
 *    (1) watch深度监视 list => 一旦发生变化保持到本地缓存中
 *    (2) 一进页面就读取本地缓存
 */
export default {
  name: "App",
  data() {
    return {
      list: [
        { id: 1, title: "跑步1公里" },
        { id: 2, title: "敲代码1小时" },
      ],
    };
  },
  methods: {},
  components: {
    ToDoHeaderVue,
    ToDoMainVue,
    // ToDoFooterVue,
  },
};
</script>

<style>
.app {
  font-size: 20px;
}
</style>
