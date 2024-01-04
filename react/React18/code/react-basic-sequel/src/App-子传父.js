import { useState } from 'react'
// 组件通信-父子通信
// =>子传父
// 核心：在子组件中调用父组件中的函数来传递数据

// 解构props
function Son({ getMsg }) {
  // 子组件中嵌套的内容都会被放在props.children属性中
  const sonMsg = 'this is son msg'
  const hanldeSendMsg = () => getMsg(sonMsg)
  return (
    <div>
      this is son
      <button onClick={hanldeSendMsg}>sendMsg</button>
    </div>
  )
}

function App() {
  // 父组件通过props传递数据给子组件
  const [msg, setMsg] = useState('')
  const getMsg = (msg) => setMsg(msg)
  return (
    <div className="App">
      {msg}
      <Son getMsg={getMsg}></Son>
    </div>
  );
}

export default App;
