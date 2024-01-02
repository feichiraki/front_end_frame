// react 18.x 弃用了 react-dom中的render
// 而是改用react-dom/cient下的createRoot创建的React根渲染
// 1.导包
import React from 'react'
import ReactDOM from 'react-dom/client'

// 2.创建React元素根节点
const root = ReactDOM.createRoot(document.getElementById('root'))

// 3.创建组件
class App extends React.Component {
  state = {
    count: 1,
  }

  handleClick = () => {
    // 此处：更新数据
    // 注意：setState是异步的
    this.setState({
      count: this.state.count + 1,
    })
    console.log(this.state.count) // 1
    this.setState({
      count: this.state.count + 1,
    })
    console.log(this.state.count) // 1
  }

  render() {
    // 不管前面setState调用了多少次，render只会执行一次 => 对于性能的考虑
    console.log('render')
    return (
      <div>
        <h1>计数器:{this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

// 4.将组件渲染到页面上去
root.render(<App></App>)
