// 1.导入模块
import Vue from 'vue'
import Vuex from 'vuex'
// 导入模块
import user from '@/store/modules/user'
import setting from '@/store/modules/setting'

// 2.安装插件
Vue.use(Vuex)

// 3.创建仓库
const store = new Vuex.Store({
  // 开启严格模式(有利于初学者检测代码)
  strict: true,
  // 1.通过state可以通过数据(所有组件共享的数据)
  state: {
    title: '仓库大标题',
    count: 100,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  // 2.通过 mutations 可以提供修改数据的方法
  mutations: {
    // 所有mutation函数，第一个参数，都是state
    addCount(state, n) {
      // 修改数据
      state.count += n
    },
    subCount(state, n) {
      state.count -= n
    },
    changeCount(state, newCount) {
      // console.log(newCount)
      state.count = newCount
    },
    changeTitle(state, newTitle) {
      state.title = newTitle
    },
  },

  // 3.actions 处理异步
  // 注意：不能直接操作 state . 操作state 还是需要 commit mutation
  actions: {
    changeCountAsync(context, num) {
      // context 上下文 ，此处未分模块，可以当成store仓库
      // 这里是通过setTimeout模拟异步，以后大部分场景都是发请求
      setTimeout(() => {
        context.commit('changeCount', num)
      }, 1000)
    },
    changeCountAction(context, num) {
      setTimeout(() => {
        context.commit('changeCount', num)
      }, 1000)
    },
  },

  // 4. getters 类似于计算属性
  // 注意点：
  // 1.形参的第一个参数，就是state
  // 2.必须有返回值，返回值就是getters的值
  getters: {
    filterList(state) {
      return state.list.filter((item) => item > 5)
    },
  },

  // 5. modules 模块
  modules: {
    user,
    setting
  },
})

// 4.导出模块
export default store
