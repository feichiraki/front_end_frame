import React from 'react'
import ReactDOM from 'react-dom'
// import { createRoot } from 'react-dom/client'

// 导入样式
import './index.css'

/** 父传子：props */
class Father extends React.Component {
  render() {
    return (
      <div className="father">
        父组件
        <Son msg="今天去钓鱼？" />
      </div>
    )
  }
}

class Son extends React.Component {
  render() {
    console.log('收到父组件传来的数据:' + this.props.msg)
    return <div className="son">子组件</div>
  }
}

const root = document.getElementById('root')

/* react18 渲染页面方式 */
// const container = createRoot(root)
// container.render()

/* react16 or react17 => render HTMLElement */
// 1.props可以传递任意类型的数据
ReactDOM.render(<Father />, root)
