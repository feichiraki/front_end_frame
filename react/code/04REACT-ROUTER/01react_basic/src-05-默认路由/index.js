import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * 默认路由:进入页面就显示
 *    Route中 path = "/"
 *
 */

// 2.导入三个核心组件

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

// 准备组件
const Home = () => <p>进入页面的时候，你能看到我吗？</p>

const App = () => {
  return (
    <Router>
      <div>
        <h1>默认路由</h1>
        <Route path="/" component={Home}></Route>
      </div>
    </Router>
  )
}

root.render(<App />)
