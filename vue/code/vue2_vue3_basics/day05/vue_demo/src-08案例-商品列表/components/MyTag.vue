<template>
  <div class="my-tag">
    <input
      v-focus
      ref="inp"
      v-if="isEdit"
      class="input"
      type="text"
      :value="value"
      placeholder="输入标签"
      @blur="isEdit = false"
      @keyup.enter="handleEnter"
    />
    <div @dblclick="handleClick" v-else class="text">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    handleClick() {
      // 双击后，切换到显示状态
      this.isEdit = true;
      //   // 等dom更新完毕后，在获取焦点
      //   this.$nextTick(() => {
      //     this.$refs.inp.focus();
      //   });
    },
    handleEnter(e) {
      if (e.target.value === "") return alert("标签内容不能为空");
      // 子传父 ，将回车时，[输入框的内容 ]提交给父组件更新
      // 由于父组件是v-model，所以我们需要触发input事件
      // 拿到输入框的内容 e.target.value
      this.$emit("input", e.target.value);
      this.isEdit = false;
    },
  },
};
</script>

<style lang="less" scope>
.my-tag {
  cursor: pointer;
  .input {
    appearance: none;
    outline: none;
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    color: #666;
    &::placeholder {
      color: #666;
    }
  }
}
</style>