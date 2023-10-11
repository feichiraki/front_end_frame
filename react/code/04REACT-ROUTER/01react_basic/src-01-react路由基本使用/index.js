import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * react 18.x
 * react-router-dom的基本使用
 * 1.安装 react-router-dom
 *    npm i react-router-dom
 *    yarn add react-router-dom
 */
// 2.导入三个核心组件
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
const First = () => <p>页面一的内容</p>

// class App extends React.Component {
//   render() {
//     return (
//       <Router>
//         <div>
//           <h1>React路由基础</h1>
//           {/* 4.指定路由入口 */}
//           <Link to="/first">页面一</Link>

//           {/* 5.指定路由出口 */}
//           <Route path="/first" component={First}></Route>
//         </div>
//       </Router>
//     )
//   }
// }
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

// 注意：在将组件渲染到页面上时，尽量不要像下面这样写。
// 原因：导致路由跳转的组件不会渲染出来，需要F5刷新页面后才会显示出来
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

// 正确写法
root.render(<App />)

/**
 * react 16.x
 */
// import React from 'react'
// import ReactDOM from 'react-dom'

// /*
//   react-router-dom 的基本使用：
//   1 安装： yarn add react-router-dom
// */

// // 2 导入组件：
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// const First = () => <p>页面一的内容</p>

// // 3 使用Router组件包裹整个应用
// const App = () => (
//   <Router>
//     <div>
//       <h1>React路由基础</h1>
//       {/* 4 指定路由入口 */}
//       <Link to="/first">页面一</Link>

//       {/* 5 指定路由出口 */}
//       <Route path="/first" component={First} />
//     </div>
//   </Router>
// )

// ReactDOM.render(<App />, document.getElementById('root'))
