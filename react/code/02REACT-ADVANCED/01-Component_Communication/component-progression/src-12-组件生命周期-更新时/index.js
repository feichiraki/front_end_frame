const React = require('react')
const { createRoot } = require('react-dom/client')
// const PropTypes = require('prop-types')

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

/*
  组件生命周期--- 更新阶段
  三种导致组件更新的方式：
    1.setState()
    2.forceUpdate() 强制更新
    3.新的props传递过来
  执行顺序：
    ①render()
    ②componentDidUpdate()
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
        <Counter count={this.state.count} />
        <button id="btn" onClick={this.handleClick}>
          打豆豆
        </button>
      </div>
    )
  }
}

class Counter extends React.Component {
  render() {
    console.warn('----子组件----生命周期函数：render')
    return <h1 id="title">统计豆豆被打的次数：{this.props.count}</h1>
  }
  // 注意：如果要调用setState() 要放在一个if条件语句中
  // 因为：如果直接调用setState()，也会导致递归更新
  componentDidUpdate(prevProps) {
    console.warn('生命周期函数：componentDidUpdate')

    // 正确的做法：
    // 做法：比较更新前后的props是否相同，来决定是否重新渲染组件
    console.log('上一次的props：', prevProps, '，当前的props：', this.props)

    if (prevProps.count !== this.props.count) {
      this.setState({})
    }

    // 错误的演示！！！
    // this.setState({})

    // 获取DOM操作
    // const title = document.querySelector('#title')
    // console.log(title)
  }
}

// 渲染到页面上
container.render(<App></App>)
