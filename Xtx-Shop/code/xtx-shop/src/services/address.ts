import { request } from '@/utils/request'
import type { AddressParams } from '@/types/address'

/**
 * 添加收货地址
 * @param data 请求参数
 */
export const postMemberAddress = (data: AddressParams) => {
  return request({
    method: 'POST',
    url: '/member/address',
    data,
  })
}
