// 1.导入react
import React from 'react'
import ReactDOM from 'react-dom'

// 2.创建react元素
const title = React.createElement('h1', null, 'Hello Reacct!!!')

// 3.渲染react元素到页面上
ReactDOM.render(title, document.querySelector('#root'))
