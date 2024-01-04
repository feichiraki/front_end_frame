// React Hooks使用规则
// 只能在组件中或者Hook函数中使用
// 1.不能在组件外使用
// 2.不能在 if for 及内部函数中使用

import { useState } from 'react'

// 错误演示：不能在组件外使用
// const [value,setValue] = useState(0)
function App() {
  // 错误演示：不能在 if for 及内部函数中使用
  // if(Math.random()>0.5){
  //   useState()
  // }
  return (
    <div className="App">
      this is App
    </div>
  );
}

export default App;
