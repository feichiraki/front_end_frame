import request from "@/utils/request";

// home - 获取轮播图数据
export const getHomeBannerDataService = (distributionSite = '1') => request.get('/home/banner',{
    params:{
        distributionSite
    }
})

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewService = () => {
  return request({
    url:'/home/new'
  })
}


/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotDataService = () =>  request.get('home/hot')


/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsListService = () => {
  return request({
    url: '/home/goods'
  })
}