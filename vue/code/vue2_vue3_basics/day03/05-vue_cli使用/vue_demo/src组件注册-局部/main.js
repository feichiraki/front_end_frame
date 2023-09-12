// 作用：导入App.vue ，基于App.vue创建结构渲染index.html

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  // el: '#app', 作用：和$mount('选择器')作用一致，用于指定vue所管理容器
  // render: (h) => h(App),
  render: (createElement) => {
    // 基于App 创建元素结构
    return createElement(App)
  },
}).$mount('#app')
