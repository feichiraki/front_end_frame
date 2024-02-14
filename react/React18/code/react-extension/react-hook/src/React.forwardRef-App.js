// forwardRef

import { useRef, forwardRef } from "react"


// 子组件
const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} />
})

// 父组件
function App() {
    const inputRef = useRef(null)
    const showRef = ()=>{
        console.log(inputRef)
    }
    return (
        <>
            <Input ref={inputRef} />
            <button onClick={showRef}>focus</button>
        </>
    )
}

export default App