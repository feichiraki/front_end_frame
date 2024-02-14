import { useState } from 'react'
// 兄弟组件通信
// 1.通过子传父 A->App
// 2.通过父传子 App -> B

function A({ getAName }) {
  const name = 'Lily'
  return (
    <div>
      this is A component
      <button onClick={()=>getAName(name)}>send</button>
    </div>
  )
}

function B({name}) {
  return (
    <div> 
      this is B component<br/>
      A component data:{name}
    </div>
  )
}

function App() {
  const [name, setName] = useState('')
  const getAName = (name) => {
    setName(name)
  }
  return (
    <div className="App">
      this is App
      <A getAName={getAName}/>
      <B name={name}/>
    </div>
  );
}

export default App;
