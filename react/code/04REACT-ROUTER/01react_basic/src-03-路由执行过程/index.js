import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * 路由执行过程
 * 1.点击Link组件(a标签)，修改了浏览器地址栏中的url。
 * 2.React路由监听到地址栏url的变化 => 得到 pathname。
 * 3.React路由内部遍历所有Route组件，使用路由规则（path）与pathname进行匹配。
 * 4.当路由规则（path）能够匹配地址栏中的pathname时，就展示该Route组件的内容。
 */

// 2.导入三个核心组件

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
const First = () => <p>页面一的内容</p>
const Home = () => <h2>这里是Home页面内容</h2>

// 3.使用Router组件包裹整个应用
const App = () => (
  <Router>
    <div>
      <h1>React路由基础</h1>
      {/* 指定路由出口 */}
      <Route path="/first" component={First}></Route>
      <Route path="/home" component={Home}></Route>

      {/* 指定路由入口 */}
      <Link to="/first">页面一</Link>
      <br />
      <Link to="/home">Home</Link>
    </div>
  </Router>
)

root.render(<App />)
