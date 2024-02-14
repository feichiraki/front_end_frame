// zustand
import { create } from 'zustand'


// 1.创建store
// 语法容易出错
// 1.函数参数必须返回一个对象 对象内部编写状态数据和方法
// 2.set是用来修改状态数据的方法，set方法传入参数方式如下
//    2.1 参数是一个函数，在函数中结合旧的状态数据进行修改
//    2.2 参数是一个对象，以新值覆盖旧值的方式修改状态数据
const useStore = create((set) => {
  return {
    // 状态数据
    count: 0,
    //  修改状态的方法
    inc: () => {
      set((state) => ({ count: state.count + 1 }))
      set({count:100})
    }
  }
})

// 2.绑定到组件
function App() {
  const { count, inc } = useStore()
  return (
    <div className="App">
      <button onClick={inc}>{count}</button>
    </div>
  );
}

export default App;
