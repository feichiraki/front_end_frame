// 此模块封装有关和分类有关的接口
import request from '@/utils/request'

export const getCategoryData = () => {
  return request.get('/category/list')
}
