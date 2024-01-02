import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * 精确匹配
 *  不希望再显示默认路由的内容
 */

// 2.导入三个核心组件

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

// 准备组件
const Home = () => <p>进入页面的时候，你能看到我吗？</p>
const Login = () => <p>我是Login组件的内容</p>

const App = () => {
  return (
    <Router>
      <div>
        <h1>默认路由</h1>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/login">登录页面</Link>
          </li>
        </ul>
        {/* 默认路由,添加exact属性，就会让当前路由变为精确匹配 */}
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
      </div>
    </Router>
  )
}

root.render(<App />)
