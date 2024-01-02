import React from 'react'
import { createRoot } from 'react-dom/client'
import PropTypes from 'prop-types'
// 导入图片
import img from './images/cat.png'

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

/*
  高阶组件——设置displayname
*/

// 创建高阶组件
function withMouse(WrappedComponent) {
  class Mouse extends React.Component {
    // 鼠标位置 state
    state = {
      x: 0,
      y: 0,
    }

    // 控制鼠标移动逻辑
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
      return <WrappedComponent {...this.state}></WrappedComponent>
    }
  }
  // 设置组件名称
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`
  return Mouse
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// 用于测试高阶组件
const Position = (props) => (
  <p>
    鼠标当前位置：(x:{props.x},y:{props.y})
  </p>
)
// 获取增强后的组件
const MousePosition = withMouse(Position)
// 猫捉老鼠的组件
const Cat = (props) => (
  <img
    src={img}
    alt="猫"
    style={{
      position: 'absolute',
      top: props.y - 64,
      left: props.x - 64,
    }}
  />
)
// 调用高阶组件来增强猫组件
const MouseCat = withMouse(Cat)

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
        <h1>高阶组件</h1>
        {/* 渲染增强后的组件 */}
        <MousePosition></MousePosition>
        <MouseCat />
      </div>
    )
  }
}

// 渲染到页面上
container.render(<App></App>)
