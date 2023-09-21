import React from 'react'
// import ReactDOM from 'react-dom'  // react16 or 17 需导入
import { createRoot } from 'react-dom/client' // react18
import './index.css'

/* 
  评论列表案例（5-发表评论-2边界情况）
*/

// 1.创建组件
class App extends React.Component {
  // 初始化状态
  state = {
    comments: [
      { id: 1, name: 'jack', content: '沙发！！！' },
      { id: 2, name: 'rose', content: '板凳~' },
      { id: 3, name: 'tom', content: '楼主好人' },
    ],
    // 评论人
    userName: '',
    // 评论信息
    userContent: '',
  }
  // 渲染评论列表
  renderList() {
    const { comments } = this.state
    return comments.length === 0 ? (
      <div className="no-comment">暂无评论，快去评论吧~</div>
    ) : (
      <ul>
        {comments.map((item) => (
          <li key={item.id}>
            <h3>评论人：{item.name}</h3>
            <p>评论内容：{item.content}</p>
          </li>
        ))}
      </ul>
    )
  }
  // 处理表单元素
  handleForm = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }
  // 发表评论
  addComment = () => {
    // 获取输入的内容
    const { comments, userName, userContent } = this.state
    // 边界判空
    if (!userName.trim() || !userContent.trim()) {
      return alert('输入内容不能为空!')
    }

    // 添加评论
    // 1.展开运算符添加
    // const newComments = [
    //   {
    //     id: +new Date(),
    //     name: userName,
    //     content: userContent,
    //   },
    //   ...comments,
    // ]
    // this.setState({
    //   comments: newComments,
    // })

    // 2.通过数组的unshift()添加
    comments.unshift({
      id: +new Date(),
      name: userName,
      content: userContent,
    })
    this.setState({
      comments: comments,
      // 3.清空文本框,
      userName: '',
      userContent: '',
    })
  }
  render() {
    const { userName, userContent } = this.state

    return (
      <div className="app">
        <div>
          <input className="user" type="text" placeholder="请输入评论人" autoComplete="off" name="userName" value={userName} onChange={this.handleForm} />
          <br />
          <textarea onChange={this.handleForm} name="userContent" value={userContent} className="content" cols="30" rows="10" placeholder="请输入评论内容" />
          <br />
          <button onClick={this.addComment}>发表评论</button>
        </div>

        {/* 通过条件渲染决定渲染什么内容： */}
        {/* {this.state.comments.length === 0 ? (
          <div className="no-comment">暂无评论，快去评论吧~</div>
        ) : (
          <ul>
            {this.state.comments.map((item) => (
              <li key={item.id}>
                <h3>评论人：{item.name}</h3>
                <p>评论内容：{item.content}</p>
              </li>
            ))}
          </ul>
        )} */}
        {/* 抽离逻辑代码后，直接调用渲染函数 */}
        {this.renderList()}
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
