// 此处用来封装跟首页相关的请求
import request from '@/utils/request'

// 获取首页数据
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: '0'
    }
  })
}
