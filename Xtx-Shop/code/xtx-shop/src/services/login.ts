import { request } from '@/utils/request'
import type { LoginResult } from '@/types/member'
export type LoginParams_wx = {
  /** 登录凭证=>code 通过 wx.login() 获取 */
  code: string
  /** 通过 getphonenumber 事件回调中获取 */
  encryptedData: string
  /** 通过 getphonenumber 事件回调中获取 */
  iv: string
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMin = (data: LoginParams_wx) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 小程序登录-内测版
 * @param phoneNumber 请求参数
 */
export const postLoginwxMinSimple = (phoneNumber: string) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: { phoneNumber },
  })
}

export type LoginParams = {
  account: string
  password: string
}
/**
 * 传统登录方式
 * @param data 请求参数
 */
export const postLogin = (data: LoginParams) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/login',
    data,
  })
}
