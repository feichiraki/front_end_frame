// 引入css
import './css/index.css'

//************ React18之前(Before) 16 or 17 ***************
// 1.导入react-dom
// import ReactDOM from 'react-dom'
// 2.使用JSX语法创建react元素
// style-样式处理
// className—样式处理
// const title = (
//   <h1 className="title" style={{ color: 'red', backgroundColor: 'skyblue' }}>
//     JSX样式处理——style
//   </h1>
// )

// 3.渲染react元素到页面上
// ReactDOM.render(title, document.querySelector('#root'))

//******************************************************

//************ React18(After) **************************

/*
  JSX注意点：
    1.单括号中可以使用任意JS表达式(例如三元运算符等)
    2.JSX自身也是JS表达式 (可以将一个用JSX创建的react元素，写到{}中)
    3.JS中的对象是一个例外(`JSX是不能直接通过{}去使用一个对象的`)，一般只会出现在style属性中。
    4.注意：`不能在{}中出现语句`(比如：if/for等)。
*/

// 1.导入创建根节点(容器)函数
import { createRoot } from 'react-dom/client'
// 2.设置根节点
const container = createRoot(document.querySelector('#root'))
// 3.使用JSX语法创建react元素
const title = (
  <h1 className="title" style={{ color: 'red', backgroundColor: 'skyblue' }}>
    JSX样式处理——style
  </h1>
)
// // 4.将react元素渲染到根节点(容器)中
container.render(title)
//******************************************************
