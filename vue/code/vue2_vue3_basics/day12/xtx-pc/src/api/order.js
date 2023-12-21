// 封装和订单相关的接口
import request from '@/utils/request'

// 生成订单
export const getOrderInfoService = ()=>request.get('/member/order/pre')


// 提交订单-准备支付
export const getPayInfoService = (data)=>request.post('/member/order',data)


// 获取订单信息
export const getUserOrder = (params) => {
  return request({
    url:'/member/order',
    method:'GET',
    params
  })
}