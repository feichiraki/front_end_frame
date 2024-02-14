// 组件通信-父子通信

function Son(props) {
  // 子组件中嵌套的内容都会被放在props.children属性中
  return <div>this is son 
    <p>{props.name}</p>
    {props.children}
  </div>
}

function App() {
  const name = 'john'
  return (
    <div className="App">
      <Son name={name}>
        <span>this is span</span>
      </Son>
    </div>
  );
}

export default App;
