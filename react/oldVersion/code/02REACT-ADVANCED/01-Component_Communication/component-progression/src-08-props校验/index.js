const React = require('react')
const { createRoot } = require('react-dom/client')
const PropTypes = require('prop-types')

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

const App = (props) => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item}</li>)
  return <ul>{lis}</ul>
}

// 添加props校验
App.propTypes = {
  colors: PropTypes.array,
}

// 渲染到页面上
container.render(<App colors={['red', 'blue', 'yellow']}></App>)
