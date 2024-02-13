// Props+TS
// 2.给props的children添加类型
import React from 'react'

type Props = {
  className: string
  children:React.ReactNode
}




function Button(props: Props) {
  const { className,children } = props
  return <button className={className}>{children}</button>
}

function App() {
  return (
    <>
      <Button className="test" children="click me"/>
      <Button className='test2'>
        <span>this is span</span>
      </Button>
    </>
  )
}

export default App
