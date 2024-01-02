import React from 'react'
import { createRoot } from 'react-dom/client'

const root = document.querySelector('#root')
const container = createRoot(root)

class App extends React.Component {
  state = {
    number: 0,
  }
  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 3),
      }
    })
  }

  // 如果两次生产随机数相同，则不需要进行渲染
  shouldComponentUpdate(nextProps, nextState) {
    // if (this.state.number === nextState.number) {
    //   return false
    // }
    // // 最新的状态：
    // console.log('最新状态:', nextState)
    // // 更新前的状态：
    // console.log('this.state：', this.state)
    // return true

    return this.state.number !== nextState.number
  }

  render() {
    console.log('render')
    return (
      <div>
        <h1>计数器：{this.state.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

// 渲染到页面
container.render(<App></App>)
