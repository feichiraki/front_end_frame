import React from 'react'
// import ReactDOM from 'react-dom'  // react16 or 17 需导入
import { createRoot } from 'react-dom/client' // react18

// 1.创建组件
class App extends React.Component {
  constructor() {
    super()

    // 创建ref
    this.txtRef = React.createRef()
  }
  // 简化语法(推荐)
  state = {
    txt: '',
    content: '',
    city: 'bj',
    isChecked: true,
  }
  getText = () => {
    console.log(this.txtRef)
    console.log('文本框的值为：' + this.txtRef.current.value)
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.txtRef} />
        <button onClick={this.getText}>获取文本框的值</button>
      </div>
    )
  }
}
// 获取根节点
const root = document.querySelector('#root')

//************ React18之前(Before) 16 or 17 ***************

// 2.渲染组件
// ReactDOM.render(<App></App>, root)
//******************************************************

//************ React18(After) **************************
// 1.设置容器
const container = createRoot(root)
// 2.渲染内容
container.render(<App />)
//******************************************************
