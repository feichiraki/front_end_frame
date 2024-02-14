import avatar from './images/bozai.png'




// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar,
    // 用户昵称
    uname: '薛之谦',
}
const Item = ({item,onDel})=>{
    return (
        <div className="reply-list">
            {/* 评论项 */}
            <div className="reply-item">
                {/* 头像 */}
                <div className="root-reply-avatar">
                    <div className="bili-avatar">
                        <img
                            className="bili-avatar-img"
                            src={item.user.avatar}
                            alt=""
                        />
                    </div>
                </div>

                <div className="content-wrap">
                    {/* 用户名 */}
                    <div className="user-info">
                        <div className="user-name">{item.user.uname}</div>
                    </div>
                    {/* 评论内容 */}
                    <div className="root-reply">
                        <span className="reply-content">{item.content}</span>
                        <div className="reply-info">
                            {/* 评论时间 */}
                            <span className="reply-time">{item.ctime}</span>
                            {/* 评论数量 */}
                            <span className="reply-time">点赞数:{item.like}</span>
                            {
                                user.uid === item.user.uid &&
                                <span onClick={() => onDel(item.rpid)} className="delete-btn">
                                    删除
                                </span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item