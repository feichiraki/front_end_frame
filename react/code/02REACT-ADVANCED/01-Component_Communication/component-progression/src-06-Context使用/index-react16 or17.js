import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
/* 
  Context 
    react16 or react17 用法
    1.调用React.createContext() 创建Provider(提供数据)和Consumer(消费数据)两个组件。
      createContext()方法在React中
    2.给组件Provider设置value属性，表示要传递的数据。
    3.调用Consumer组件接受数据
*/
// 创建context得到两个组件
// Provider 数据提供者
// Consumer 数据消费者(使用者)
const { Provider, Consumer } = React.createContext()

export default class App extends React.Component {
  render() {
    return (
      // 给Provider设置value
      <Provider value="pink">
        <div className="app">
          <Node />
        </div>
      </Provider>
    )
  }
}

const Node = (props) => {
  return (
    <div className="node">
      <SubNode />
    </div>
  )
}

const SubNode = (props) => {
  return (
    <div className="subnode">
      <Child />
    </div>
  )
}

const Child = (props) => {
  return (
    <div className="child">
      {/* 调用Consumer组件接受数据 */}
      <Consumer>{(data) => <span>我是子节点 == {data}</span>}</Consumer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
