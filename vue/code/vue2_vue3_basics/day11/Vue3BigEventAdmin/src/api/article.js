import request from '@/utils/request'

// 分类：获取文章分类列表
export const artGetChannelService = () => request.get('/my/cate/list')

// 分类：添加文章分类列表
export const artAddChannelService = ({ cate_name, cate_alias }) =>
  request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })

// 分类：更新文章分类(编辑)
export const artEditChannelService = ({ id, cate_name, cate_alias }) =>
  request.put('/my/cate/info', {
    id,
    cate_name,
    cate_alias
  })

// 分类：删除文章分类
export const artDelChannelService = (id) =>
  request.delete(`/my/cate/del?id=${id}`)

// ---------------------------------------------------

// 文章：获取文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', {
    params
  })

// 文章：发布文章
// 注意：data需要是一个formData格式对象
export const artPublishService = (data) => {
  return request.post('/my/article/add', data)
}

// 文章：获取文章详情
export const artGetDetailService = (id) =>
  request.get('/my/article/info', {
    params: { id }
  })

// 文章：文章编辑更新
export const artEditService = (data) => request.put('/my/article/info', data)

// 文章：删除文章
export const artDelService = (id) =>
  request.delete('/my/article/info', { params: { id } })
