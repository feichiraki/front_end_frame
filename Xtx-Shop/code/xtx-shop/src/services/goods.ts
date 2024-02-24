// 商品详情——接口封装

import { request } from '@/utils/request'
import type { GoodsResult } from '@/types/goods'

/**
 * 获取商品详情
 * @param id 商品id
 */
export const getGoodsAPI = (id: string) => {
  return request<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
