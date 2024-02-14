// 组件通信-父子通信

function Son(props) {
  // props:对象中包含了父组件传递过来的所有数据
  return <div>this is son 
    <p>{props.name}</p>
  </div>
}

function App() {
  const name = 'john'
  return (
    <div className="App">
      <Son name={name}></Son>
    </div>
  );
}

export default App;
