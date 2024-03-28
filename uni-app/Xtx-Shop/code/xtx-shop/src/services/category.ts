// 分类列表-小程序

import { request } from '@/utils/request'
import type { CategoryTopItem } from '@/types/category'

/**
 * 获取分类数据
 */
export const getCategoryTopAPI = () => {
  return request<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
