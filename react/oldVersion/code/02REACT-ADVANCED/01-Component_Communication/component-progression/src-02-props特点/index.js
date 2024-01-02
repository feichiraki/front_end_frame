import React from 'react'
import ReactDOM from 'react-dom'
// import { createRoot } from 'react-dom/client'

/**
 * props特点：
 *  1.可以传递任意类型数据 函数、JSX、number等
 *  2.props是只读的，无法修改其属性的值
 *  3.使用类组件时，如果有构造函数，推荐将props传给super() ，这样也方便我们在构造函数中使用props
 */

// 2.接受数据(通过形参props接受数据)
// const Hello = (props) => {
//   props.fn()
//   // 不能修改props属性：错误演示，props是只读
//   // props.name = 'tom'

//   return (
//     <div>
//       <h1>props:{props.name}</h1>
//       {props.tag}
//     </div>
//   )
// }

class Hello extends React.Component {
  // 如果类组件写了构造函数，应该将props传递给super(),否则在构造函数中获取不到props!
  // 推荐
  constructor(props) {
    super(props)
    // 注：在构造函数中传props，是为了在构造函数中能够用props，如果没传 this.props 则为undefined
    // console.log(this.props)
    console.log(props) // props作为形参传递过来，不传入super() props也是可以正常使用props的数据的。
    // 但是，如果有构造函数，还是建议将props传给super()，否则它就会有这样一个小的问题 ↑
  }

  // 不管构造函数中是否传递了props，render函数中的props不受影响
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
// 1.props可以传递任意类型的数据
ReactDOM.render(<Hello name="jack" age={19} color={['red', 'green', 'blue']} fn={() => console.log('这是一个函数')} tag={<p>这是一个p标签</p>} />, root)
