// channel模块
import { devtools } from 'zustand/middleware'
const URL = 'http://geek.itheima.net/v1_0/channels'

// const createChannelStore = (set) => {
//     return {
//         channelList: [],
//         getChannelList: async () => {
//             const res = await fetch(URL)
//             const jsonData = await res.json()
//             set({ channelList: jsonData.data.channels })
//         }
//     }
// }

// 单独将一个分离的切片添加到调试器中
const createChannelStore = devtools((set) => {
    return {
        channelList: [],
        getChannelList: async () => {
            const res = await fetch(URL)
            const jsonData = await res.json()
            set({ channelList: jsonData.data.channels },false,{
                type:'channelStore/getChannelList'
            })
        }
    }
},{
    name:'channelStore',
    enabled:true
})


export default createChannelStore