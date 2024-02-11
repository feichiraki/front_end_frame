// zustand
import { create } from 'zustand'
import { useEffect } from 'react'

const URL = 'http://geek.itheima.net/v1_0/channels'
// 1.创建store
const useStore = create((set) => {
  return {
    // 状态数据
    count: 0,
    //  修改状态的方法
    inc: () => {
      set((state) => ({ count: state.count + 1 }))
      set({ count: 100 })
    },

    channelList: [],
    getChannelList: async () => {
      const res = await fetch(URL)
      const jsonData = await res.json()
      set({ channelList: jsonData.data.channels })
    }
  }
})

// 2.绑定到组件
function App() {
  const { count, inc, channelList, getChannelList } = useStore()
  useEffect(()=>{
    getChannelList()
  }, [getChannelList])
  return (
    <div className="App">
      <button onClick={inc}>{count}</button>
      <ul>
        {channelList.map(item=><li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
