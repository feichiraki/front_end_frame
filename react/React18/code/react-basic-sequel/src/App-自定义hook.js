// 封装自定义Hook
// 存在问题：布尔切换逻辑，当前组件耦合在一起的，不方便复用

// 解决思路：自定义Hook

import { useState } from 'react'

function useToggle(){
  // 可复用的逻辑代码
  const [value, setValue] = useState(true)
  const toggle = () => setValue(!value)

  // 哪些状态和回调函数需要在其他组件中使用 return
  return {
    value,
    toggle
  }
}

// 封装自定义hook思路
// 1.声明一个以use打头的函数
// 2.在函数体内封装可复用的逻辑(只要是可复用的逻辑)
// 3.把组件中用到的状态或者回调return出去(以对象或者数组)
// 4.在哪个组件中要用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用

function App() {
  const {value,toggle} =  useToggle() // 调用自定义Hook
  return (
    <div className="App">
      {value && <div>this is div</div>}
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

export default App;
