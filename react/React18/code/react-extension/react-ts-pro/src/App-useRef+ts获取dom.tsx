// useRef + TS
import { useEffect, useRef } from 'react'
// 1.获取dom



function App() {
  const domRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    // 可选链，前面的值不为 null/undefined 执行点运算
    domRef.current?.focus()
  },[])

  return (
    <>
      <input ref={domRef} />
    </>
  )
}

export default App
