const React = require('react')
const { createRoot } = require('react-dom/client')
const PropTypes = require('prop-types')

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)

const App = (props) => {
  return (
    <div>
      <h1>此处展示props的默认值：{props.pageSize}</h1>
    </div>
  )
}

// 添加props的默认值
App.defaultProps = {
  pageSize: 10,
}

// 渲染到页面上
container.render(<App pageSize={20}></App>)
