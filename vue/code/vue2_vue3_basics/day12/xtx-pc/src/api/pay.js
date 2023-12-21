// 封装支付相关的接口
import request from '@/utils/request'

export const getPayInfoService = (id) => request.get(`/member/order/${id}`)