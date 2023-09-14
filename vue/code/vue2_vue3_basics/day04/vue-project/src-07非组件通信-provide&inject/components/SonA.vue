<template>
  <div class="baseA">
    BaseA
    <GrandSonVue></GrandSonVue>
  </div>
</template>

<script>
import GrandSonVue from "./GrandSon.vue";

export default {
  components: {
    GrandSonVue,
  },
};
</script>

<style>
.baseA {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border: 3px solid #000;
}
</style>