/** 推荐模块 */
import { request } from '@/utils/request'
import type { HotParams, HotResult } from '@/types/hot'

/**
 * 推荐-小程序
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommend = (url: string, data?: HotParams) => {
  return request<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
