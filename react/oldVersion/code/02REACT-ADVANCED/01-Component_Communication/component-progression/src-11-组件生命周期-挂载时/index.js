const React = require('react')
const { createRoot } = require('react-dom/client')
// const PropTypes = require('prop-types')

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

/*
  组件生命周期
*/
class App extends React.Component {
  constructor(props) {
    super(props)
    console.warn('生命周期函数：constructor')
    // 初始化state
    this.state = {
      count: 0,
    }
  }

  // 1 进行DOM操作
  // 2 发送ajax请求，获取远程数据
  componentDidMount() {
    const title = document.querySelector('#title')
    console.log(title)
    console.warn('生命周期函数：componentDidMount')
  }

  render() {
    // 错误演示！！！ 不要在render中调用setState()
    // this.setState({
    //   count: 1,
    // })

    console.warn('生命周期函数：render')
    return (
      <div>
        <h1 id="title">统计豆豆被打的次数：</h1>
        <button id="btn">打豆豆</button>
      </div>
    )
  }
}

// 渲染到页面上
container.render(<App></App>)
