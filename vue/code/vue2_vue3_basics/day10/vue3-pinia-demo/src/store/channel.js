import {defineStore} from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

export const useChannelStore = defineStore('channel',()=>{
    // 声明数据
    const channelList = ref([])
    // 声明操作数据的方法
    const getList = async () =>{
        // 支持异步
        const {data:{data:{channels}}} = await axios.get("http://geek.itheima.net/v1_0/channels")
        console.log(channels)
        channelList.value = channels
    }
    // 声明getters相关

    return{
        channelList,
        getList
    }
},{
    persist:true
})