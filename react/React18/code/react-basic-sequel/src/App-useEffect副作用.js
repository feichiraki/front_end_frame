import { useEffect,useState } from 'react'
// useEffect-副作用

function App() {
  const [count,setCount] = useState(0)
  // 1.没有任何依赖项  初始+组件更新
  // useEffect(()=>{
  //   console.log('副作用函数执行了')
  // })

  // 2.空数组依赖   初始
  // useEffect(() => {
  //   console.log('副作用函数执行了')
  // },[])

  // 3.传入特定依赖项  初始+依赖项变化时
  useEffect(() => {
    console.log('副作用函数执行了')
  }, [count])
  return (
    <div className="App">
      this is App
      <button onClick={()=>setCount(count+1)}>{count}</button>
    </div>
  );
}

export default App;
