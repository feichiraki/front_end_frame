const React = require('react')
const { createRoot } = require('react-dom/client')
// const PropTypes = require('prop-types')

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

/*
  render props模式

*/
class Mouse extends React.Component {
  // 鼠标位置 state
  state = {
    x: 0,
    y: 0,
  }
  handMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handMouseMove)
  }

  render() {
    // return null
    return this.props.render(this.state)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    // 初始化state
    this.state = {
      count: 0,
    }
  }

  render() {
    console.warn('生命周期函数：render')
    return (
      <div>
        <h1>render props 模式</h1>
        <Mouse
          render={(mouse) => {
            return (
              <p>
                鼠标位置:{mouse.x} {mouse.y}
              </p>
            )
          }}
        ></Mouse>
      </div>
    )
  }
}

// 渲染到页面上
container.render(<App></App>)
