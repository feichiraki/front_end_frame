//************ React18之前(Before) 16 or 17 ***************
// 1.导入react 和 react-dom
// import React from 'react'
// import ReactDOM from 'react-dom'

// 2.创建组件
// 2.1 函数组件
// function Hello() {
//   return <div>这是我的第一个函数组件!</div>
// }

// const Hello = () => <div>这是我的第一个函数组件!</div>

// 2.2 类组件
// class Hello extends React.Component {
//   render() {
//     return <div>这是我们的第一个类组件!</div>
//   }
// }
// 3.渲染react元素到页面上
// const root = document.querySelector('#root')
// 3.1将函数组件渲染到页面上(将函数名作为标签名来渲染)
// ReactDOM.render(<Hello />, root)
// 3.2 将类组件渲染到页面上(将类名作为标签名来渲染)
// ReactDOM.render(<Hello />, root)
//******************************************************

//************ React18(After) **************************
// 1.导入创建根节点(容器)函数
import React from 'react'
import { createRoot } from 'react-dom/client'
// 2.设置根节点
const container = createRoot(document.querySelector('#root'))
// 3.创建组件
// 3.1 创建函数组件
// function Hello() {
//   return <div>这是我的第一个函数组件!</div>
// }
// const Hello = () => <div>这是我的第一个函数组件!</div>

// 3.2 类组件

class Hello extends React.Component {
  render() {
    return <div>这是我们的第一个类组件!</div>
  }
}
// 4.将react元素渲染到根节点(容器)中
// 将函数名或类名作为标签名来进行渲染
container.render(<Hello />)
//******************************************************
