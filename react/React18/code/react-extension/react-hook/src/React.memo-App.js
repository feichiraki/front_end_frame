// React.memo

import { memo, useMemo, useState } from "react"

// 1.验证默认的渲染机制，子跟着父一起渲染

// 2.memo进行缓存
// 2.1 传递的是一个简单类型的props  props发生变化时重新渲染组件
// 2.2 传递的是一个引用类型的prop 比较的是新值和旧值的引用是否相等
//     父组件重新渲染时，引用类型的指向会变化，数组会形成新的引用
// 2.3 为了保证引用稳定 => useMemo 组件渲染过程中缓存一个值

const MemoSon = memo(function Son({ count }) {
    console.log('我是子组件，我重新渲染了。')
    return <div>this is son. {count}</div>
}
)

// function Son() {
//     console.log('我是子组件，我重新渲染了。')
//     return <div>this is son.</div>
// }


function App() {
    const [count, setCount] = useState(0)

    // const num = 100
    // const list = [1,2,3]

    const list = useMemo(() => {
        return [1, 2, 3]
    }, [])
    return (
        <div className="App">
            <button onClick={() => setCount(count + 1)}>+{count}</button>
            <MemoSon count={list} />
            {/* <Son/> */}
        </div>
    )
}

export default App