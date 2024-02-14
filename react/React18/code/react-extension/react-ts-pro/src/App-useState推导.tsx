// useState-自动推导
// useState在初始化时会自行对数据进行推导，得出它的类型

import { useState } from 'react'

function App() {
  // 简单类型
  const [count, setCount] = useState(0) // type => number
  const ChangeCount = () => {
    setCount(count + 1)
  }

  // 引用类型 
  const [list,setList] = useState([1,2,3])  // type => number[]
  const getNewData = ()=>{
    // setList(['1']) 报错：不是定义的number类型 => string类型元素
    setList([1,2])
  }
  getNewData()

  return (
    <>
      <div>
        this is App.
        <button onClick={ChangeCount}>{count}</button>
        {list}
      </div>
    </>
  )
}

export default App
