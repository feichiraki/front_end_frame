import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * 编程式导航
 *
 */

// 2.导入三个核心组件

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

// 准备组件
class Login extends React.Component {
  handleLogin = () => {
    // 使用编程式导航实现路由跳转
    // ... 省略其他功能代码
    this.props.history.push('/home')
  }
  render() {
    return (
      <div>
        <p>登录页面：</p>
        <button onClick={this.handleLogin}>登录</button>
      </div>
    )
  }
}

const Home = (props) => {
  const handleBack = () => {
    // 返回上一个页面
    props.history.go(-1)
  }

  return (
    <div>
      <h2>我是后台首页</h2>
      <button onClick={handleBack}>返回登录页面</button>
    </div>
  )
}

// 3.使用Router组件包裹整个应用
const App = () => (
  <Router>
    <div>
      <h1>编程式导航</h1>
      {/* 配置路由入口 */}
      <Link to="/login">登录页面</Link>

      {/* 配置路由出口 */}
      <Route path="/login" component={Login}></Route>
      <Route path="/home" component={Home}></Route>
    </div>
  </Router>
)

root.render(<App />)
