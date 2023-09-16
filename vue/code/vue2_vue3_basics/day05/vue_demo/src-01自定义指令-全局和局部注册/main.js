import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 1.全局注册 - 自定义指令
// 所有组件都可使用
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  },
})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
