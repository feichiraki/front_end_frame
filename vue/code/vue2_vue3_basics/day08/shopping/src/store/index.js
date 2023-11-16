import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import cart from '@/store/modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {
    getToken (state) {
      return state.user.UserInfo.token
    }
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    cart
  }
})
