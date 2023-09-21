//************ React18之前(Before) ***************
// 1.导入react-dom
// import ReactDOM from 'react-dom'
// 2.使用JSX语法创建react元素
// let name = 'Jack'
// const sayHi = (
//   <div>
//     <h1>Introduce Myself</h1>
//     <div>Hello,My name is {name}</div>
//   </div>
// )
// 3.渲染react元素到页面上
// ReactDOM.render(sayHi, document.querySelector('#root'))

//******************************************************

//************ React18(After) **************************
// 1.导入创建根节点(容器)函数
import { createRoot } from 'react-dom/client'
// 2.设置根节点
const container = createRoot(document.querySelector('#root'))
// 3.使用JSX语法创建react元素
let name = 'Jack'
let age = 19
const sayHi = (
  <div>
    <h1>Introduce Myself</h1>
    <p>Hello,My name is {name}.</p>
    <p>I 'm {age} years old.</p>
    <p>{age > 18 ? "I'm an adult" : "I'm not an adult"}.</p>
  </div>
)
// 4.将react元素渲染到根节点(容器)中
container.render(sayHi)
//******************************************************
