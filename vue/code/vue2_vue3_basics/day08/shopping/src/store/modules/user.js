import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 用户权证相关
      UserInfo: getInfo()
    }
  },
  mutations: {
    // mutations所有的第一个参数都是state
    setUserInfo (state, userInfo) {
      state.UserInfo = userInfo
      setInfo(userInfo)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
