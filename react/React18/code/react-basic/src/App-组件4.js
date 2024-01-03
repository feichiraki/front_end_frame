// 项目根组件
// App => index.js => public/index.html(root)

// 1.定义组件
const Button = ()=>{
  return <button>click me</button>
}

function App() {
  // 2.使用组件
  return (
    <div className="App">
      {/* 自闭和 */}
      <Button />
      {/* 成对标签 */}
      <Button></Button>
    </div>
  )
}

export default App;
