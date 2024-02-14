// React获取DOM
import { useRef } from 'react'

// 1.使用 useRef 创建ref对象，并与jsx绑定
// 2.dom可用时，ref.current获取dom
// 渲染完毕之后，dom生成之后才可用

function App() {
  const inputRef = useRef(null)
  const showDom = () => {
    console.dir(inputRef.current)
  }
  return (
    <div className="App">
      <input type="text" ref={inputRef} />
      <button onClick={showDom}>获取dom</button>
    </div>
  );
}

export default App;
