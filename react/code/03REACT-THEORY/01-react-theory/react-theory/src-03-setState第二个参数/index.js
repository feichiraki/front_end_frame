import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root'))

class App extends React.Component {
  state = {
    count: 1,
  }

  handleClick = () => {
    // 推荐语法
    // 注意：这种语法也是异步更新state的！
    this.setState(
      (state, props) => {
        return {
          count: state.count + 1,
        }
      },
      // state状态更新完毕后的操作
      () => {
        console.log('状态更新完成：', this.state.count)
        console.log(document.querySelector('#title').innerHTML)
        document.title = `更新后的count为:${this.state.count}`
      }
    )
    console.log(this.state.count)
  }

  render() {
    return (
      <div>
        <h1 id="title">计数器:{this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

root.render(<App></App>)
