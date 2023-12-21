import React from 'react'
import { createRoot } from 'react-dom/client'
import PropTypes from 'prop-types'

// 导入图片资源
import img from './images/cat.png'

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

/*
  render props模式 (children属性代替 render)
  优化 => 添加props校验
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

  // 组件卸载时移除鼠标移动事件
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handMouseMove)
  }

  render() {
    // return null
    // return this.props.render(this.state)

    // children替换 render
    return this.props.children(this.state)
  }
}
// 添加校验
Mouse.propTypes = {
  children: PropTypes.func.isRequired,
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
        <Mouse>
          {(mouse) => {
            return (
              <p>
                鼠标位置:{mouse.x} {mouse.y}
              </p>
            )
          }}
        </Mouse>

        {/* 猫捉老鼠功能 */}
        {/* <Mouse
          render={(mouse) => {
            return (
              <img
                src={img}
                alt="猫"
                style={{
                  position: 'absolute',
                  top: mouse.y - 64,
                  left: mouse.x - 64,
                }}
              />
            )
          }}
        ></Mouse> */}

        <Mouse>
          {(mouse) => {
            return (
              <img
                src={img}
                alt="猫"
                style={{
                  position: 'absolute',
                  top: mouse.y - 64,
                  left: mouse.x - 64,
                }}
              />
            )
          }}
        </Mouse>
      </div>
    )
  }
}

// 渲染到页面上
container.render(<App></App>)
