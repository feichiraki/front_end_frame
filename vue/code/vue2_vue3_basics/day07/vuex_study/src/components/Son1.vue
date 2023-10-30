<template>
  <div class="son1">
    <h2>Son1 子组件</h2>
    <p>从vuex中获取的值为：{{ $store.state.count }}</p>
    <button @click="add(1)">值+1</button>
    <button @click="add(5)">值+5</button>
    <button @click="add(10)">值+10</button>
    <button @click="handleChange(666)">一秒后变成666</button>
    <button @click="$store.commit('changeTitle', '仓库标题')">改标题</button>
    <hr />
    <p></p>
    <!-- 访问模块中的state --- 原生 -->
    <div>
      <div>姓名：{{ $store.state.user.userInfo.name }}</div>
      &nbsp;
      <button>更新个人信息</button>
      <div>主题：{{ $store.state.setting.theme }}</div>
      <button>更新主题</button>
    </div>

    <!-- 访问模块中的Getters -->
    <hr />
    {{ "名字大写-" + $store.getters["user/UpperCaseName"] }}

    <!-- 访问模块中的 Mutation -->
    <button @click="changeName">修改名字</button>

    <!-- 调用模块中的Action -->
    <hr>
     <div>
      <button @click="$store.dispatch('user/setNameAction','wangwu')">一秒后修改名字</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SonOne",
  data() {
    return {};
  },
  methods: {
    changeName() {
      this.$store.commit("user/setName", "lisi");
    },
    add(n) {
      this.$store.commit("addCount", n);
    },
    handleChange() {
      this.$store.dispatch("changeCountAsync", 666);
    },
  },
};
</script>

<style scoped>
.son1 {
  width: 400px;
  /* height: 150px; */
  margin: 20px 0 0 0;
  padding: 20px;
  border: 2px solid #ccc;
}
</style>