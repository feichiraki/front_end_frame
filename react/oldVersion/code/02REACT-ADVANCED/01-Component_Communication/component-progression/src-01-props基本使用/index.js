import React from 'react'
import ReactDOM from 'react-dom'
// import { createRoot } from 'react-dom/client'

/**
 * props：父传子传递数据
 * 1.在子组件标签中以属性方式传入数据
 * 2.在函数组件或类组件中通过props接受父组件中传递过来的数据
 */

// 2.接受数据(通过形参props接受数据)
// const Hello = (props) => {
//   return (
//     <div>
//       <h1>props:{props.name}</h1>
//     </div>
//   )
// }

class Hello extends React.Component {
  render(props) {
    console.log(this.props)
    return (
      <div>
        <h1>props:{this.props.name}</h1>
      </div>
    )
  }
}

const root = document.getElementById('root')

/* react18 渲染页面方式 */
// const container = createRoot(root)
// container.render(<Hello name="jack" />)

/* react16 or react17 => render HTMLElement */
ReactDOM.render(<Hello name="jack" />, root)
