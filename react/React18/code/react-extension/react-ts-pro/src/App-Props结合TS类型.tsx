// Props+TS
// 1.基本使用

// 通过type类型别名来创建自定义类型
// type Props = {
//   className: string
// }

// 接口方式定义类型
interface Props {
  className: string
  title?: string
}


function Button(props: Props) {
  const { className } = props
  return <button className={className}>click me</button>
}

function App() {
  return (
    <>
      <Button className="test" title="this is title"/>
    </>
  )
}

export default App
