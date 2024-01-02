import React from 'react'
// import ReactDOM from 'react-dom'  // react16 or 17 需导入
import { createRoot } from 'react-dom/client' // react18

/* 抽离组件到独立的js文件中 */

// 1.创建组件
class App extends React.Component {
  //   constructor() {
  //     super()
  //     // 初始化state
  //     this.state = {
  //       count: 0,
  //     }
  //   }

  // 简化语法(推荐)
  state = {
    count: 0,
  }

  render() {
    return (
      <div>
        <h1>计数器:{this.state.count}</h1>
      </div>
    )
  }
}
// 获取根节点
const root = document.querySelector('#root')

//************ React18之前(Before) 16 or 17 ***************

// 2.渲染组件
// ReactDOM.render(<App></App>, root)
//******************************************************

//************ React18(After) **************************
// 1.设置容器
const container = createRoot(root)
// 2.渲染内容
container.render(<App />)
//******************************************************
