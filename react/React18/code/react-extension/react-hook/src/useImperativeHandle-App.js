// useImperativeHandle

import { useRef, forwardRef, useImperativeHandle } from "react"


// 子组件
const Input = forwardRef((props, ref) => {
    // 实现聚焦逻辑
    const inputRef = useRef(null)
    const focusHandler = ()=>{
        inputRef.current.focus()
    }

    // 把聚焦函数暴露出去
    useImperativeHandle(ref,()=>{
        return {
            // 暴露方法
            focusHandler
        }
    })
    return <input type="text" ref={inputRef} />
})

// 父组件
function App() {
    const sonRef = useRef(null)
    const showRef = () => {
        console.log(sonRef)
        sonRef.current.focusHandler()
    }
    return (
        <>
            <Input ref={sonRef} />
            <button onClick={showRef}>focus</button>
        </>
    )
}

export default App