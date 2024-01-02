import React from 'react'
import { createRoot } from 'react-dom/client'

const root = document.querySelector('#root')
const container = createRoot(root)

/**
 * 虚拟DOM-Diff算法
 */
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

  // render方法调用并不意味着浏览器中重新渲染
  render() {
    const el = (
      <div>
        <h1>随机数：</h1>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
    console.log(el)
    return el
  }
}
// 渲染到页面
container.render(<App />)
