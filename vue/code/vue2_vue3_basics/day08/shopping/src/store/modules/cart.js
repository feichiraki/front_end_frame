import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    getCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find((item) => item.goods_id === goodsId)
      if (goods) {
        goods.isChecked = !goods.isChecked
      }
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach((item) => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, value }) {
      const obj = state.cartList.find((item) => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    async getCartListAction (context) {
      const { data } = await getCartList()
      // 因为购物车中商品状态为被选中、未选中两种状态，但是在获取的数据中没有该方面的体现
      // 所以我们需要给商品添加此属性
      data.list.forEach((item) => {
        // 设定我们添加到购物车中的商品都是被选中状态
        item.isChecked = true
      })
      // 添加到vuex中
      context.commit('getCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsId, value, skuId } = obj
      context.commit('changeCount', {
        goodsId,
        value
      })
      await changeCount(goodsId, value, skuId)
    },
    // 删除购物车数据
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map((item) => item.id)
      await delSelect(cartIds)
      Toast('删除成功')

      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('getCartListAction')
    }
  },
  getters: {
    isAllChecked (state) {
      return state.cartList.every((item) => item.isChecked)
    },
    cartTotal (state) {
      return state.cartList.reduce(
        (sum, item, index) => sum + item.goods_num,
        0
      )
    },
    selCartList (state) {
      return state.cartList.filter((item) => item.isChecked)
    },
    selCount (state, getters) {
      return getters.selCartList.reduce(
        (sum, item, index) => sum + item.goods_num,
        0
      )
    },
    selPrice (state, getters) {
      return getters.selCartList
        .reduce((sum, item, index) => {
          return sum + item.goods_num * item.goods.goods_price_min
        }, 0)
        .toFixed(2)
    }
  }
}
