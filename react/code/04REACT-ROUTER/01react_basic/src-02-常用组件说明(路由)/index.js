import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * 常用组件说明
 */

// 2.导入三个核心组件
// import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
const First = () => <p>页面一的内容</p>

// 3.使用Router组件包裹整个应用
const App = () => (
  <Router>
    <div>
      <h1>React路由基础</h1>
      {/* 4.指定路由入口 */}
      <Link to="/first">页面一</Link>

      {/* 5.指定路由出口 */}
      <Route path="/first" component={First}></Route>
    </div>
  </Router>
)

root.render(<App />)
