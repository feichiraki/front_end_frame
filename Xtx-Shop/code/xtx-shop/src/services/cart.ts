import type { CartItem } from '@/types/cart'
import { request } from '@/utils/request'

/**
 * 加入购物车
 * @param data 请求体参数
 */
export const postMemberCart = (data: { skuId: string; count: number }) => {
  return request({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

/**
 * 获取购物车列表
 */
export const getMemberCartAPI = () => {
  return request<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}
