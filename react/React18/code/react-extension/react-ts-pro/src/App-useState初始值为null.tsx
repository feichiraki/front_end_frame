// useState-自动推导
// useState在初始化时会自行对数据进行推导，得出它的类型

import { useState } from 'react'

type User = {
  name:string
  age:number
}
function App() {

  const [user,setUser] = useState<User | null>(null)

  const changeUser = ()=>{
    setUser(null)
    setUser({
      name:'john',
      age:28
    })
  }

  // 为了类型安全 可选链做类型守卫
  // 只有user不为null （不为空值）的时候才进行点运算。
  
  return (
    <>
      <div>
        this is App {user?.name}.
      </div>
    </>
  )
}

export default App
