// 封装和用户相关的接口
import request from '@/utils/request'

export const getLikeService = (limit = 4) => {
  return request({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}

