import request from '@/utils/request'

// 获取商品全部分类
export const getList = () => 
    request.get('/home/category/head')
