import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 1.全局导入
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

// 2.按需导入
import '@/utils/vant-ui'

// 导入样式
import '@/styles/common.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
