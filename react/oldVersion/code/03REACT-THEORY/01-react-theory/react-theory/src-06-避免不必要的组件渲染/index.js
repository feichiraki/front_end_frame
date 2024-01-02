import React from 'react'
import { createRoot } from 'react-dom/client'

const root = document.querySelector('#root')
const container = createRoot(root)

class App extends React.Component {
  state = {
    count: 0,
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  // 钩子函数
  shouldComponentUpdate(nextProps, nextState) {
    //  返回false阻止组件渲染
    // return false

    // 最新的状态：
    console.log('最新状态:', nextState)
    // 更新前的状态：
    console.log('this.state：', this.state)
    return true
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

// 渲染到页面
container.render(<App></App>)
