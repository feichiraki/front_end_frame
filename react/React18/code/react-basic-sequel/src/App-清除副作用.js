import { useEffect, useState } from 'react'
// useEffect-清除副作用


function Son() {
  // 1.渲染时开启一个定时器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器执行中...')
    }, 1000)

    return () => {
      // 清除副作用(组件卸载时)
      clearInterval(timer)
    }
  })
  return <div>this is Son</div>
}

function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      {show && <Son />}
      <button onClick={() => setShow(false)}>卸载Song组件</button>
    </div>
  );
}

export default App;
