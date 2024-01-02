// App.js
import React from 'react'

// 函数组件绑定事件
// function App() {
//   function handleClick() {
//     console.log('单击事件触发了')
//   }
//   return <button onClick={handleClick}>点我</button>
// }

// 类组件绑定事件
class App extends React.Component {
  handleClick() {
    console.log('单击事件触发了')
  }
  render() {
    return <button onClick={this.handleClick}>点我</button>
  }
}
// 导出App组件
export default App
