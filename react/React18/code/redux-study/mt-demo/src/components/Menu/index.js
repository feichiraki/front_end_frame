import classNames from 'classnames'
import './index.scss'
import {useDispatch, useSelector} from 'react-redux'
import { changeActiveIndex } from '../../store'

const Menu = () => {
  const { takeAwayList: foodsList,activeIndex } = useSelector(state => state.takeaway)
  const dispatch = useDispatch()

  const menus = foodsList.map(item => ({ tag: item.tag, name: item.name }))
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item, index) => {
        return (
          <div
            key={item.tag}
            className={classNames(
              'list-menu-item',
              { active: activeIndex === index}
            )}
            onClick={() => dispatch(changeActiveIndex(index))}
          >
            {item.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
