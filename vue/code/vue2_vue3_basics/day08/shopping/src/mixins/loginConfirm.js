export default {
  // 此处编写的就是 Vue组件实例的配置项，通过一定的语法，可以直接混入组件内部
  // data methods computed 生命周期函数 ...
  // 注意点：
  // 1.如果此处 和 组件内，提供了同名的 data 或 methods，则组件内优先级更高
  // 2.如果编写了生命周期函数，则mixins中的生命周期函数 和 页面的生命周期函数，会用数组管理
  // 会用数组管理，统一执行
  methods: {
    isLogin () {
      // 判断token是否存在
      // 1.如果token不存在，弹确认框
      // 2.如果token存在，继续请求操作
      if (!this.$store.getters.getToken) {
        // 弹确认框
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '此时需要先登录才能继续操作哦',
            confirmButtonText: '去登陆',
            cancelButtonText: '再逛逛'
          })
          .then(() => {
            // 跳转到登录页面，若登录成功，则回跳到当前页面
            // 为了保证登录后能够正常回跳到当前页面，我们需要在跳转时携带一个参数(当前页面路径)
            // this.$route.fullPath (带参数)
            this.$router.push({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // 不作为
          })
        return true
      }
      return false
    }
  }
}
