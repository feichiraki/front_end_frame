import React from 'react'
import ReactDOM from 'react-dom'
// import { createRoot } from 'react-dom/client'

// 导入样式
import './index.css'

/** 子传父：通过父组件的回调函数进行传递数据给父组件 */
class Father extends React.Component {
  handleMsg = (msg) => {
    console.log(msg)
  }
  render() {
    return (
      <div className="father">
        父组件
        <Son msg="今天去钓鱼？" hMsg={this.handleMsg} />
      </div>
    )
  }
}

class Son extends React.Component {
  handleClick = () => {
    this.props.hMsg('刷抖音')
  }
  render() {
    return (
      <div className="son">
        子组件
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}

const root = document.getElementById('root')

/* react18 渲染页面方式 */
// const container = createRoot(root)
// container.render()

/* react16 or react17 => render HTMLElement */
// 1.props可以传递任意类型的数据
ReactDOM.render(<Father />, root)
