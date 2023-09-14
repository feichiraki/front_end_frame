<template>
  <div class="app">
    <BaseForm ref="baseForm"></BaseForm>
    <button @click="handleGet">获取数据</button>
    <button @click="handleReset">重置数据</button>
  </div>
</template>

<script>
import BaseForm from "./components/BaseForm.vue";
export default {
  components: {
    BaseForm,
  },
  methods: {
    handleGet() {
      this.$refs.baseForm.getFormData();
    },
    handleReset() {
      this.$refs.baseForm.resetFormData();
    },
  },
};
</script>

<style>
</style>