import { createContext, useContext } from 'react'
// 跨层级组件通信
// 嵌套层级 => App>A>B
// 传递数据： App => B

// 实现步骤：
// 1.createContext方法创建一个上下文对象
const MsgContext = createContext()

// 2.在顶层组件 通过Provider组件提供数据
// 3.在底层组件 通过useContext钩子函数使用数据


function A() {
  return (
    <div>
      this is A component
      <B/>
    </div>
  )
}

function B() {
  const msg = useContext(MsgContext)
  return (
    <div> 
      this is B component<br/>
      {msg}
    </div>
  )
}

function App() {
  const msg = 'this is App'
  return (
    <div className="App">
      <MsgContext.Provider value={msg}>
        this is App
        <A />
      </MsgContext.Provider>
    </div>
  );
}

export default App;
