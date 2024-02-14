import { request } from '@/utils'
import type { ResType } from './shared'


// 2.定义具体接口类型
export type ChannelItem = {
    id: number
    name: string
}

type ChannelRes = {
    channels: ChannelItem[]
}


// 请求频道列表

export function fetchChannelAPI() {
    return request<ResType<ChannelRes>>({
        url: '/channels'
    })
}


// 请求文章列表
type ListItem = {
    art_id:string,
    title:string,
    aut_id:string,
    pubdate:string,
    aut_name:string,
    is_top:number,
    cover:{
        type:number,
        images:string[]
    }
}

export type ListRes = {
    results:ListItem[]
    pre_timestamp:string
}

type ReqParams = {
    channel_id:string
    timestamp:string
}

export function fetchListAPI(params:ReqParams){
    return request<ListRes>({
        url:'/articles',
        params
    })
}