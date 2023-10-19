<template>
  <div class="home">
    <div class="logo-box"></div>
    <div class="search-box">
      <input type="text" v-model="inputValue" />
      <button @click="handleSearch">搜索一下</button>
    </div>
    <div class="hot-link">
      热门搜索：
      <router-link to="/search/黑马程序员">黑马程序员</router-link>
      <router-link to="/search/前端培训">前端培训</router-link>
      <router-link to="/search/如何成为前端大牛">如何成为前端大牛</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindMusic",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    handleSearch() {
      //  1.path路径跳转传参——query查询参数传参法
      // 第一种【简写】：直接通过通过path进行传参
      // this.$router.push(`/search?key=${this.inputValue}`);
      // 第二种【完整写法】：传递对象方式
      // this.$router.push({
      //   path: "/search",
      //   query: {
      //     // 传递多个参数时，建议用完整写法
      //     key: this.inputValue,
      //   },
      // });
      // 2.path路径跳转传参——动态路由传参(单个参数时建议使用动态传参)
      // this.$router.push(`/search/${this.inputValue}`);
      // 或者下面是一样的方式
      // this.$router.push({
      //   path: `/search/${this.inputValue}`,
      // });
      // 3.name命名跳转传参——query查询传参
      // this.$router.push({
      //   name: "search",
      //   query: {
      //     key: this.inputValue,
      //   },
      // });
      // 4.name命名跳转传参——动态传参
      this.$router.push({
        name: "search",
        params: {
          words: this.inputValue,
        },
      });
    },
  },
};
</script>

<style>
.logo-box {
  height: 150px;
}
.search-box {
  display: flex;
  justify-content: center;
}
.search-box input {
  width: 400px;
  height: 30px;
  line-height: 30px;
  border: 2px solid #c4c7ce;
  border-radius: 4px 0 0 4px;
  outline: none;
}
.search-box input:focus {
  border: 2px solid #ad2a26;
}
.search-box button {
  width: 100px;
  height: 36px;
  border: none;
  background-color: #ad2a26;
  color: #fff;
  position: relative;
  left: -2px;
  border-radius: 0 4px 4px 0;
}
.hot-link {
  width: 508px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
}
.hot-link a {
  margin: 0 5px;
}
</style>