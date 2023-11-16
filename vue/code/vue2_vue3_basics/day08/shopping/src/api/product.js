// 此模块用于封装与商品有关的接口
import request from '@/utils/request'

// 根据查询字符或分类id查询商品列表
export const getProList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取商品详情
export const getGoodsDetail = (id) => {
  return request.get('/goods/detail', {
    params: {
      goodsId: id
    }
  })
}

// 获取商品评论
export const getComments = (obj) => {
  const { goodsId, limit } = obj
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
