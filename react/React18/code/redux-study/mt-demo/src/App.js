import NavBar from './components/NavBar'
import Menu from './components/Menu'
import Cart from './components/Cart'
import FoodsCategory from './components/FoodsCategory'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGoodsList } from './store'
import './App.scss'

const App = () => {
  // 触发action执行
  // 1. useDispatch => dispatch 2.
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchGoodsList())
  }, [dispatch])

  // 2. useSelector => state
  const { takeAwayList,activeIndex } = useSelector(state => state.takeaway)

  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />

          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {takeAwayList.map((item,index) => {
                return (
                  activeIndex === index &&
                  <FoodsCategory
                    key={item.tag}
                    // 列表标题
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  )
}

export default App
