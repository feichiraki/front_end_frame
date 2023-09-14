<template>
  <div id="app">
    <baseone></baseone>
    <basetwo></basetwo>
  </div>
</template>

<script>
import baseone from "./components/BaseOne";
import basetwo from "./components/BaseTwo";

export default {
  name: "App",
  components: {
    baseone,
    basetwo,
  },
};
</script>

<style>
</style>
