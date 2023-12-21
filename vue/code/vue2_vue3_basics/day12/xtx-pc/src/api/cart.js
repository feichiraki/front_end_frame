// 封装购物车相关的接口

import request from "@/utils/request"

/**
 * @description:加入-购物车
 * @data {
      skuId:string,
      count:integer
  }
*  @return {*}
 */
export const addCartService = ({skuId, count}) => request.post('/member/cart', {skuId, count})


/**
 * @description:删除-购物车商品
 * @data {
      ids:Array[string] -商品sku的id集合
  }
*  @return {*}
 */
export const delCartService = (ids) => request({
    url:'/member/cart',
    method:'delete',
    data:{ids}
})


/**
 * @description:合并购物车
 * @data {
      skuId:string,
      selected:string
      count:integer,
  }
*  @return {*}
 */
export const mergerCartService = (data) => request({
    url:'/member/cart/merge',
    method:'post',
    data
})


/**
 * @description:获取购物车列表
*  @return {*}
 */
export const getCartListService = ()=>request({
    url:'/member/cart',
    method:'get'
})
