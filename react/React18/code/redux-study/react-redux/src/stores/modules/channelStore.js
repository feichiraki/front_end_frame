import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const channelStore = createSlice({
    name: 'channel',
    // 初始化状态
    initialState: {
        channelList: []
    },

    // action
    reducers: {
        // 修改状态
        changeChannelList(state, action) {
            state.channelList = action.payload
        }
    }
})

// 异步请求结构
const { changeChannelList } = channelStore.actions
const url = 'http://geek.itheima.net/v1_0/channels'

const fetchChannelList = () => {
    return async (dispatch) => {
        const res = await axios.get(url)
        dispatch(changeChannelList(res.data.data.channels))
    }
}
export { fetchChannelList }
export default channelStore.reducer