// useRef + TS
import { useEffect, useRef } from 'react'
// 2. 引用稳定的存储器 （定时器管理）



function App() {
  const domRef = useRef<HTMLInputElement>(null)

  const timerId = useRef<number | undefined>(undefined)

  useEffect(()=>{
    // 可选链，前面的值不为 null/undefined 执行点运算
    // 类型守卫 防止出现空值点运算错误
    domRef.current?.focus()

    timerId.current = setInterval(()=>{
      console.log('123')
    },1000)
    
    return ()=> clearInterval(timerId.current)
  },[])

  return (
    <>
      <input ref={domRef} />
    </>
  )
}

export default App
