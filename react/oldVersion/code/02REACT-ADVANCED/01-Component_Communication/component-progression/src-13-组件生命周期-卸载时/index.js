const React = require('react')
const { createRoot } = require('react-dom/client')
// const PropTypes = require('prop-types')

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

/*
  组件生命周期--- 卸载阶段

*/
class App extends React.Component {
  constructor(props) {
    super(props)
    // 初始化state
    this.state = {
      count: 0,
    }
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    })

    // 演示强制更新
    // this.forceUpdate()
  }

  render() {
    console.warn('生命周期函数：render')
    return (
      <div>
        {this.state.count > 3 ? <p>豆豆被打死了~~~</p> : <Counter count={this.state.count} />}
        <button id="btn" onClick={this.handleClick}>
          打豆豆
        </button>
      </div>
    )
  }
}

class Counter extends React.Component {
  componentDidMount() {
    // 开启定时器
    this.timerId = setInterval(() => {
      console.log('定时器正在执行~')
    }, 500)
  }

  render() {
    console.warn('----子组件----生命周期函数：render')
    return <h1 id="title">统计豆豆被打的次数：{this.props.count}</h1>
  }
  componentWillUnmount() {
    console.warn('生命周期函数：componentWillUnmount')

    // 清理定时器
    clearInterval(this.timerId)
  }
}

// 渲染到页面上
container.render(<App></App>)
