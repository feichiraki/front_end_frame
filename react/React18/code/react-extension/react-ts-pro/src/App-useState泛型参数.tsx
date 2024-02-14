// useState-自动推导
// useState在初始化时会自行对数据进行推导，得出它的类型

import { useState } from 'react'

type User = {
  name:string
  age:number
}
function App() {
  // const [user,setUser] = useState<User>({
  //   name:'jack',
  //   age:18
  // })

  // const [user,setUser] = useState<User>(()=>{
  //   return {
  //     name:'jack',
  //     age:18
  //   }
  // })

  const [user,setUser] = useState<User>({
    name:'jack',
    age:18
  })

  const changeUser = ()=>{
    setUser({
      name:'john',
      age:28
    })
  }
  return (
    <>
      <div>
        this is App {user.name}.
      </div>
    </>
  )
}

export default App
