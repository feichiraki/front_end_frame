import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    updateList (state, newList) {
      state.list = newList
    },
    updateCount (state, Obj) {
      // 通过 id 找到更新Count的那一项，并重新进行赋值
      const goods = state.list.find(item => item.id === Obj.id)
      goods.count = Obj.newCount
    }
  },
  actions: {
    // 请求方式：get
    // 请求地址： http://localhost:3000/cart
    async getList (context) {
      const res = await axios.get('http://localhost:3000/cart')
      context.commit('updateList', res.data)
    },
    async changeCountAsync (context, newObj) {
      // 将修改更新同步到后台服务器
      const res = await axios.patch(`http://localhost:3000/cart/${newObj.id}`, {
        count: newObj.newCount
      })
      // 如果后台更新成功，我们则把最新的数据更新给状态state
      if (res.status === 200) {
        context.commit('updateCount', newObj)
      }
    }
  },
  getters: {
    totalCount (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    totalPrice (state) {
      return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
    }
  }
}
