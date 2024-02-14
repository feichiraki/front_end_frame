// 项目根组件
// App => index.js => public/index.html(root)
import './css/demo.css'

function App() {

  return (
    <div className="App">
      {/* 行内样式 */}
      <h1 style={{color: 'red'}}>Hello, world!</h1>
      {/* 类样式 */}
      <h2 className="foo">Hello，react！</h2>
    </div>
  )
}

export default App;
