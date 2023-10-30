// user子模块
const state = {
  userInfo: {
    name: 'zs',
    age: 18,
  },
  score: 80,
}
const mutations = {
  setName(state,newName){
    state.userInfo.name = newName
  }
}
const actions = {
  setNameAction(context,newName){
    // context为当前模块的上下文
    setTimeout(()=>{
      context.commit('setName',newName)
    },1000)
  }
}
const getters = {
  UpperCaseName(state){
    return state.userInfo.name.toUpperCase()
  }
}

// 导出模块
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
