// zustand-切片
import { useEffect } from 'react'
import store from './store/index.js'

// // 1.拆分子模块，再组合起来(可以根据自己的需求，以一个文件为一个模块拆分)
// const createCouterStore = (set)=>{
//   return {
//     // 状态数据
//     count: 0,
//     //  修改状态的方法
//     inc: () => {
//       set((state) => ({ count: state.count + 1 }))
//       set({ count: 100 })
//     },
//   }
// }





// 2.绑定到组件
function App() {
  const { count, inc, channelList, getChannelList } = store()
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
