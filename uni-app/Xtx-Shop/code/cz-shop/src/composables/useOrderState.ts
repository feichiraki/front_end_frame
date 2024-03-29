import { getPayMockAPI, getPayWxPayMiniPayAPI } from '@/services/pay'
import { ref } from 'vue'

function useChangeOrderState() {
  const orderId = ref('')
  // 订单支付
  const onOrderPay = async () => {
    if (import.meta.env.DEV) {
      // 开发环境微信支付
      await getPayMockAPI({ orderId: orderId.value })
    } else {
      // #ifdef MP-WEIXIN
      // 正式环境微信支付
      const res = await getPayWxPayMiniPayAPI({ orderId: orderId.value })
      wx.requestPayment(res.result)
      // #endif
    }
    // 关闭当前页，再跳转支付结果页
    uni.redirectTo({ url: `/pagesOrder/payment/index?id=${orderId.value}` })
  }

  // 返回结果
  return {
    orderId,
    onOrderPay,
  }
}

export default useChangeOrderState
