// App.js
import React from 'react'

// 函数组件绑定事件
function App() {
  function handleClick(e) {
    console.log('事件对象', e)
  }
  return <button onClick={handleClick}>点我</button>
}

// 类组件绑定事件
// class App extends React.Component {
//   handleClick(e) {
//     console.log('事件对象', e)
//   }
//   render() {
//     return <button onClick={this.handleClick}>点我</button>
//   }
// }
// 导出App组件
export default App
