import request from '@/utils/request'

export const getAddress = () => {
  return request.get('/address/list')
}
