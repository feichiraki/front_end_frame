// 获取个人信息

import { request } from '@/utils/request'
import type { ProfileDetail, ProfileParams } from '@/types/member'

/**
 * 获取个人信息
 */
export const getMemberProfileAPI = () => {
  return request<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}

/**
 * 修改个人信息
 * @param data 请求参数
 */
export const putMemberProfileAPI = (data: ProfileParams) => {
  return request<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data: { ...data },
  })
}
