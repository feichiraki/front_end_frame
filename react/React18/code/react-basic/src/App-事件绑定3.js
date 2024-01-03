// 项目根组件
// App => index.js => public/index.html(root)


function App() {
  // 1.基础事件绑定
  // const handleClick = () => {
  //   console.log('clicked');
  // }
  // return (
  //   <div className="App">
  //       <button onClick={handleClick}>click me</button>
  //   </div>
  // );

  // 2.使用事件对象参数
  // 事件函数无参触发(不传递参数)，如果设定了第一个形参，默认为事件对象参数
  // const handleClick = (e,item) => {
  //   console.log('clicked',e);
  //   console.log('item',item);
  // }
  // return (
  //   <div className="App">
  //       <button onClick={handleClick}>click me</button>
  //   </div>
  // );

  // 3.传递自定义参数
  // const handleClick = (name) => {
  //   console.log('clicked',name);
  // }
  // return (
  //   <div className="App">
  //       <button onClick={()=>handleClick('jack')}>click me</button>
  //   </div>
  // );


  // 4.同时传递事件对象和自定义参数
  const handleClick = (name,e) => {
    console.log('clicked', name,e);
  }
  return (
    <div className="App">
      <button onClick={(e) => handleClick('jack',e)}>click me</button>
    </div>
  );
}

export default App;
