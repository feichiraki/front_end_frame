import React from 'react'
// import ReactDOM from 'react-dom'  // react16 or 17 需导入
import { createRoot } from 'react-dom/client' // react18

// 1.创建组件
class App extends React.Component {
  // 简化语法(推荐)
  state = {
    txt: '',
    content: '',
    city: 'bj',
    isChecked: true,
  }
  handleChange = (e) => {
    // 获取当前DOM对象
    const target = e.target
    // 根据类型赋值
    const value = target.type === 'checkbox' ? target.checked : target.value
    // 获取name
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <div>
        {/* 文本框 */}
        <input type="text" name="txt" onChange={this.handleChange} value={this.state.txt} />
        <br />

        {/* 富文本框 */}
        <textarea name="content" value={this.state.content} onChange={this.handleChange}></textarea>
        <br />

        {/* 下拉框 */}
        <select name="city" value={this.state.city} onChange={this.handleChange}>
          <option value="sh">上海</option>
          <option value="bj">北京</option>
          <option value="gz">广州</option>
        </select>

        {/* 复选框 */}
        <input name="isChecked" type="checkbox" checked={this.state.isChecked} onChange={this.handleChange} />
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
