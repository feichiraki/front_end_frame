//************ React18之前(Before) ***************
// 1.导入react-dom
// import React from 'react' (这个引入可以不用,React.createElement()不再使用)
// import ReactDOM from 'react-dom'
// 2.使用JSX语法创建react元素
/*
    JSX注意点：
*/
// const sayHi = (
//   <div>
//     <h1 className="title">Hello,React!</h1>
//     <div>Hello,JSX</div>
//   </div>
// )
// // 3.渲染react元素到页面上
// ReactDOM.render(sayHi, document.querySelector('#root'))

//******************************************************

//************ React18(After) **************************
// 1.导入创建根节点(容器)函数
import { createRoot } from 'react-dom/client'
// 2.设置根节点
const container = createRoot(document.querySelector('#root'))
// 3.使用JSX语法创建react元素
const sayHi = (
  <div>
    <h1 className="title">Hello,React!</h1>
    <div>Hello,JSX</div>
  </div>
)
// 4.将react元素渲染到根节点(容器)中
container.render(sayHi)
