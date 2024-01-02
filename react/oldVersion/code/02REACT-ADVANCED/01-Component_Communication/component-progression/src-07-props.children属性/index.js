const React = require('react')
const { createRoot } = require('react-dom/client')

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

/* children属性 */

const App = (props) => {
  props.children()
  return (
    <div>
      <h1>组件标签子节点：</h1>
    </div>
  )
}
// 渲染到页面上
container.render(<App>{() => console.log('这是一个函数子节点')}</App>)

// children属性：jsx和组件
// const Test = () => <button>我是button组件</button>
// const App = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <h1>组件标签子节点：</h1>
//       {props.children}
//     </div>
//   )
// }
// // 渲染到页面上
// container.render(
//   <App>
//     {/* <p>我是子节点，是一个p标签</p> */}
//     <Test></Test>
//   </App>
// )

// children属性：文本节点
// const App = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <h1>组件标签子节点：</h1>
//       {props.children}
//     </div>
//   )
// }
// // 渲染到页面上
// container.render(<App>我是一个子节点</App>)
