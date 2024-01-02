import React from 'react'
import { createRoot } from 'react-dom/client'

const root = document.querySelector('#root')
const container = createRoot(root)

/**
 * 纯组件基本使用——浅对比解析
 */
// 值类型比较两个值是否相同（直接赋值即可，没有坑）。
// 引用类型
// const obj = { number: 0 }
// const newObj = obj
// newObj.number = 2
// console.log(newObj === obj)

class App extends React.PureComponent {
  state = {
    obj: {
      number: 0,
    },
  }
  handleClick = () => {
    // 错误演示：直接修改原始对象中属性的值
    const newObj = this.state.obj
    newObj.number = Math.floor(Math.random() * 3)
    this.setState(() => {
      return {
        obj: newObj,
      }
    })

    // 正确做法
    // const newObj = { ...this.state.obj, number: Math.floor(Math.random() * 3) }
    // this.setState(() => {
    //   return {
    //     obj: newObj,
    //   }
    // })
  }

  render() {
    console.log('render')
    return (
      <div>
        {/* <NumberBox number={this.state.obj.number}></NumberBox> */}
        <h1>计数器：{this.state.obj.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

// 渲染到页面
container.render(<App />)
