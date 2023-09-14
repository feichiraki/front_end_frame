<template>
  <div class="app">
    <!-- 是否编辑状态 -->
    <div v-if="isShowEdit">
      <input ref="inp" type="text" v-model="editValue" />
      <button>确认</button>
    </div>
    <!-- 默认状态 -->
    <div v-else>
      <span>{{ title }}</span>
      <button @click="handleEdit">编辑</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "大标题",
      isShowEdit: false,
      editValue: "",
    };
  },
  methods: {
    handleEdit() {
      // 1.显示输入框(异步dom更新)
      this.isShowEdit = true;
      // 2.让输入框获取聚焦
      // console.log(this.$refs.inp); //undefined
      // 为什么为undefined：因此Vue是异步DOM更新，此时页面上还没有 this.$refs.inp这个元素
      // 因此，下面这行代码相当于无效
      // 如何解决？ =>  $nextTick
      // 作用：等 DOM 更新后, 才会触发执行此方法里的函数体
      this.$nextTick(() => {
        this.$refs.inp.focus();
      });
    },
  },
};
</script>

<style>
</style>