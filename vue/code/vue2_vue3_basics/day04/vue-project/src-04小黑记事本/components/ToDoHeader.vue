<template>
  <!-- 输入框 -->
  <header class="header">
    <h1>小黑记事本</h1>
    <input
      @keyup.enter="add"
      placeholder="请输入任务"
      class="new-todo"
      v-model.trim="todoName"
    />
    <button class="add" @click="add">添加任务</button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    add() {
      if (this.todoName === "") {
        return alert("任务名称不能为空!");
      }
      this.$emit("add", this.todoName);
      this.todoName = "";
    },
  },
};
</script>

<style>
</style>