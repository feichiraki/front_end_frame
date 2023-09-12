// 作用：导入App.vue ，基于App.vue创建结构渲染index.html

import Vue from 'vue'
import App from './App.vue'
// 编写导入的代码，往代码对的顶部编写(规范)
import frButton from './components/frButton'
Vue.config.productionTip = false

// 进行全局注册 => 在所有的组件范围内都能使用
// Vue.component(组件名,组件对象)
Vue.component('frButton', frButton)

new Vue({
  // el: '#app', 作用：和$mount('选择器')作用一致，用于指定vue所管理容器
  // render: (h) => h(App),
  render: (createElement) => {
    // 基于App 创建元素结构
    return createElement(App)
  },
}).$mount('#app')
