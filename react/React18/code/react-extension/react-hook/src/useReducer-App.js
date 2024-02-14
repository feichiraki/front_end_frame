// useReducer
import { useReducer } from 'react'

// 1.定义reducer函数 根据不同的action 返回不同状态
function reducer(state, action) {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'SET':
      return action.playload
    default:
      return state
  }
}

// 2.组件中调用 useReducer(reducer,0) => [state,dispatch]


// 3.调用dispatch({type：'INC'}) => 通知reducer产生一个新的状态

function App() {
  const [state, dispatch] = useReducer(reducer, 0)

  return (
    <div>
      this is App
      {state}
      <button onClick={() => dispatch({ type: 'INC' })}>+</button>
      <button onClick={() => dispatch({ type: 'DEC' })}>-</button>
      <button onClick={() => dispatch({ type: 'SET', playload: 100 })}>update</button>

    </div>
  )
}

export default App