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

/**
 * 删除/清空购物车单品
 * @param ids 请求体参数 ids:Skuid集合
 */
export const deleteMemberCartAPI = (ids: string[]) => {
  return request({
    method: 'DELETE',
    url: '/member/cart',
    data: { ids },
  })
}

/**
 * 修改购物车单品
 * @param skuId SKUID
 * @param data selected 选中状态 count 商品数量
 */
export const putMemberCartBySkuIdAPI = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return request({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}
