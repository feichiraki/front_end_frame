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

  // // 如果两次生产随机数相同，则不需要进行渲染
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.number !== nextState.number
  // }

  render() {
    // console.log('render')
    return (
      <div>
        <NumberBox number={this.state.number}></NumberBox>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

class NumberBox extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log('当前props:', this.props, '最新的props:', nextProps)
    return nextProps.number !== this.props.number
  }

  render() {
    console.log('子组件中的render')
    return <h1>计数器：{this.props.number}</h1>
  }
}

// 渲染到页面
container.render(<App></App>)
