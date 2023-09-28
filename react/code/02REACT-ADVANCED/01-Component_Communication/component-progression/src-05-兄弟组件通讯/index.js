import React from 'react'
import ReactDOM from 'react-dom'
// import { createRoot } from 'react-dom/client'

/** 兄弟组件通讯：父组件提供数据及操作数据的方法 */
class Counter extends React.Component {
  state = {
    count: 0,
  }
  changeCount = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }
  render() {
    return (
      <div className="Counter">
        <Child1 count={this.state.count}></Child1>
        <Child2 changeCount={this.changeCount}></Child2>
      </div>
    )
  }
}
const Child1 = (props) => <h1>计数器：{props.count}</h1>

const Child2 = (props) => <button onClick={props.changeCount}>+1</button>

const root = document.getElementById('root')

/* react18 渲染页面方式 */
// const container = createRoot(root)
// container.render()

/* react16 or react17 => render HTMLElement */
// 1.props可以传递任意类型的数据
ReactDOM.render(<Counter />, root)
