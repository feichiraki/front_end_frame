// 项目根组件
// App => index.js => public/index.html(root)
import { useState } from 'react'


function App() {
  // 1.调用useState添加一个状态变量
  // count 状态变量
  // setCount 修改状态变量的方法
  let [count, setCount] = useState(0)
  let [form, setForm] = useState({
    name: 'jack'
  })
  // 2.点击事件回调
  const handleClick = () => {
    // 在React中，状态被认为是只读的，我们应该始终替换它而不是修改它
    // 直接修改状态不能引发视图更新
    // count++  
    // console.log(count)
    // 作用：1.用传入的新值修改count
    // 2.重新使用新的count渲染UI
    setCount(count + 1)
  }

  const handleChangeName = ()=>{
    // 错误写法
    // form.name = 'tom'

    // 正确写法
    setForm({
      ...form,
      name: 'tom'
    })
  }
  return (
    <div className="App">
      <button onClick={handleClick}>{count}</button>
      <button onClick={handleChangeName}>{ form.name }</button>
    </div>
  )
}

export default App;
