// 订单相关封装API

import type { OrderCreateParams, OrderPreResult, OrderResult } from '@/types/order'
import { request } from '@/utils/request'

/**
 * 填写订单-获取预付订单
 */
export const getMemberOrderPreAPI = () => {
  return request<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre',
  })
}

/**
 * 填写订单-获取立即购买订单
 * @param data 查询参数
 */
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return request<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}

/**
 * 提交订单
 * @param data 请求参数
 */
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return request<{ id: string }>({
    method: 'POST',
    url: '/member/order',
    data,
  })
}

/**
 * 获取订单详情
 * @param id 订单id
 */
export const getMemberOrderByIdAPI = (id: string) => {
  return request<OrderResult>({
    method: 'GET',
    url: `/member/order/${id}`,
  })
}
