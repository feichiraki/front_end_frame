import React from 'react'
import { createRoot } from 'react-dom/client'

const root = document.querySelector('#root')
const container = createRoot(root)

/**
 * 纯组件基本使用——React.PureComponent
 */
// class App extends React.PureComponent {
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

class NumberBox extends React.PureComponent {
  render() {
    console.log('子组件中的render')
    return <h1>计数器：{this.props.number}</h1>
  }
}

// 渲染到页面
container.render(<App></App>)
