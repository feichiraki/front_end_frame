// 项目根组件
// App => index.js => public/index.html(root)

const list = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
]

const isLogin = false
const articleType = 1 // 0 1 3

const getArticleType = () => {
  if(articleType === 0){
    return <div>无图模式</div>
  }else if(articleType === 1){
    return <div>单图模式</div>
  }else{
    return <div>三图模式</div>
  }
}

function App() {
  return (
    <div className="App">
        {/* 渲染列表 */}
        <ul>
          {list.map(item =>
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
        {/* 简单条件渲染  */}
        {isLogin ? <div>欢迎回来,jack!</div> : <div>请先登录</div>}
        
        {/* 复杂条件渲染 */}
        {getArticleType()}
    </div>
  );
}

export default App;
