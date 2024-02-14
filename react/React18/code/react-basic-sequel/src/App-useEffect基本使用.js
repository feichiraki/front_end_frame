import { useEffect,useState } from 'react'
// useEffect()

const URL = 'http://geek.itheima.net/v1_0/channels'




function App() {
  const [list,setList] = useState([])
  useEffect(()=>{
    //额外的操作 获取频道列表
    async function getList(){
      const res = await fetch(URL)
      const list = await res.json()
      setList(list.data.channels)
    }
    getList()
  },[])
  return (
    <div className="App">
      this is App
      <ul>
        {
          list.map(item=>{
            return <li key={item.id}>{item.name}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
