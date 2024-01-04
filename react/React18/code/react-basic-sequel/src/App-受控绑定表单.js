// 受控绑定表单
import { useState } from 'react'

// 1.声明一个react状态 - useState
// 2.通过value属性绑定react状态
// 3.绑定onChange时间，通过事件参数e拿到输入框最新的值，反向修改到react状态

function App() {
  const [value, setValue] = useState('')
  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default App;
