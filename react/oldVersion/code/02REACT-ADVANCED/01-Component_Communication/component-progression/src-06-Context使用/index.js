/**
 * react18.x.x 关于Context写法
 */
const React = require('react')
const { createRoot } = require('react-dom/client')

/**
 * Context使用：
 * 1.创建Context => const myContext = React.createContext(defaultvalue)
 * 2.提供Context => myContext.Provider (把需要Context的结构用 context provider 包裹起来，以提供myContext给它们 )
 * 3.使用 React.useContext Hook(钩子) 以及我们刚刚创建的Context
 */

// 创建Context
// const myContext = React.createContext(1) // 这里我们给一个默认值 1

// 第二部分：设置默认为0
const myContext = React.createContext(0)

// 创建组件 Page>Section>Heading
// 1.提供一个页面父组件
function Page() {
  return (
    // 第一部分内容区
    // <Section level={1}>
    //   <Heading>主标题</Heading>
    //   <Section level={2}>
    //     <Heading>副标题</Heading>
    //     <Heading>副标题</Heading>
    //     <Heading>副标题</Heading>
    //     <Section level={3}>
    //       <Heading>子标题</Heading>
    //       <Heading>子标题</Heading>
    //       <Heading>子标题</Heading>
    //       <Section level={4}>
    //         <Heading>子子标题</Heading>
    //         <Heading>子子标题</Heading>
    //         <Heading>子子标题</Heading>
    //       </Section>
    //     </Section>
    //   </Section>
    // </Section>

    // 第二部分
    <Section>
      <Heading>主标题</Heading>
      <Section>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Section>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Section>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  )
}
// 2.创建一个内容块组件
function Section({ children }) {
  // 第二部分-获取myContext
  const level = React.useContext(myContext)
  return (
    <section className="section">
      <myContext.Provider value={level + 1}>{children}</myContext.Provider>
    </section>
  )
}
// 3.创建标题组件 - 根据level来选择对应级别的标题
function Heading({ children }) {
  const level = React.useContext(myContext)
  switch (level) {
    case 1:
      return <h1>{children}</h1>
    case 2:
      return <h2>{children}</h2>
    case 3:
      return <h3>{children}</h3>
    case 4:
      return <h4>{children}</h4>
    case 5:
      return <h5>{children}</h5>
    case 6:
      return <h6>{children}</h6>
    default:
      throw Error('未知的 level：' + level)
  }
}

// 创建容器
const root = document.querySelector('#root')
const container = createRoot(root)
// 渲染到页面上
container.render(<Page></Page>)
