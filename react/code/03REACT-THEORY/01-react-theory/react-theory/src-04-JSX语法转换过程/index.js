// CommonJS模块化
const React = require('react')
const ReactDOM = require('react-dom')

/**
 * JSX语法转化过程
 *
 */

// 这里我们使用 react16 的渲染方式
const root = document.querySelector('#root')

// const element = <h1 className="greeting">Hello JSX!</h1>
// console.log(element)

const element = React.createElement(
  'h1',
  {
    className: 'greeting',
  },
  'Hello,JSX！'
)
console.log(element)

ReactDOM.render(element, root)
