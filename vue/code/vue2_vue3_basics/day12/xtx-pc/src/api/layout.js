import request from '@/utils/request'

export function getCategoryListService(){
    return request({
        url: '/home/category/head',
    })
}

