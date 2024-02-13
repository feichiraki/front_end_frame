// Props+TS
// 3.为事件props添加类型


type Props = {
  onGetMsg: (msg: string) => void
}


function Son(props: Props) {
  const { onGetMsg } = props
  const clickHandler = () => {
    onGetMsg?.('this is msg')
  }
  return <button onClick={clickHandler}>sendMsg</button>
}

function App() {
  const getMsgHandler = (msg: string) => {
    console.log(msg)
  }

  return (
    <>
      {/* 内联绑定 */}
      <Son onGetMsg={(msg) => console.log(msg)} />
      {/* 单独抽离注解匹配 */}
      <Son onGetMsg={getMsgHandler} />
    </>
  )
}

export default App
