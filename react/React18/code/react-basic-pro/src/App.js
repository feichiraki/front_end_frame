import './App.scss'
import { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'
import Item from './Item.js'
import avatar from './images/bozai.png'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */



// 封装Hook复用
function useGetList() {
  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    // 发送请求，获取评论数据
    async function getCommentList() {
      const res = await axios.get('http://localhost:3005/list')
      setCommentList(res.data)
    }
    getCommentList()
  }, [])

  return {
    commentList,
    setCommentList
  }
}
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '薛之谦',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

const App = () => {
  const { commentList, setCommentList } = useGetList()
  const handleDel = (id) => {
    setCommentList(commentList.filter(item => item.rpid !== id))
  }

  // 处理 Tab 切换
  const [type, setType] = useState('hot')
  const handleTabsChange = (type) => {
    setType(type)
    // 排序实现
    if (type === 'hot') {
      // 根据点赞数排序
      setCommentList(_.orderBy(commentList, 'like', 'desc'))
    } else {
      // 根据时间排序
      setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
    }
  }

  // 发布评论
  const [comment, setComment] = useState('')
  const inputRef = useRef(null)
  const publishCm = () => {
    // 添加评论数据
    setCommentList([
      ...commentList,
      {
        rpid: uuidv4(),
        user: user,
        content: comment,
        ctime: dayjs().format('MM-DD HH:mm'),
        like: 0,
      }
    ])
    // 清空内容
    setComment('')
    // 聚焦
    inputRef.current.focus()
  }
  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{commentList.length}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {/* <span className='nav-item'>最新</span>
            <span className='nav-item'>最热</span> */}
            {tabs.map(item =>
              <span
                key={item.type}
                onClick={() => handleTabsChange(item.type)}
                className={classNames('nav-item', { active: item.type === type })}>{item.text}
              </span>
            )}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              ref={inputRef}
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
            />
            {/* 发布按钮 */}
            <div className="reply-box-send" onClick={publishCm}>
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        {commentList.map(item =>
          <Item key={item.rpid} item={item} onDel={handleDel}></Item>
        )}
      </div>
    </div >
  )
}

export default App