import { useState } from 'react'
// 此组件用来描述类组件的基本结构
import Counter from './Counter'
// 此组件用于描述class组件的生命周期函数使用
import LifeCycle from './lifeCycle'
// 此组件用于描述class组件通信的使用
import Parent from './Communication'

function App() {
    const [show, setShow] = useState(true)
    return (
        <>
            {/* Counter-class组件基本结构 */}
            <div className='counter'>
                <Counter />
            </div>
            {/* lifeCycle-生命周期函数 */}
            <div className='lifeCycle'>
                {show && <LifeCycle />}
                <button onClick={() => setShow(false)}>unmount</button>
            </div>
            {/* class组件通信 */}
            <div className='communicate'>
                <Parent />
            </div>
        </>
    )
}

export default App