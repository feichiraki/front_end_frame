
// 1.声明式导航跳转-link
// 1.1 导入Link
// 1.2 通过link的to属性跳转到指定路由

// 2.编程式导航：通过函数或代码(这种命令的方式)进行路由跳转
// 2.1 导入useNavigate钩子函数
// 2.2 通过useNavigate函数返回navigate方法
// 2.3 通过navigate方法指定跳转路由
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    return (
        <div>我是Login页面
            {/* 声明式写法 */}
            <Link to="/article">跳转到文章页</Link>
            {/* 编程式写法 */}
            <button onClick={() => navigate('/article')}>跳转到文章页</button>
            {/* 跳转传参 */}
            <button onClick={() => navigate('/article?id=1002&name=tom')}>跳转到文章页-useSearchParams</button>
            {/* 动态路由传参 */}
            <button onClick={() => navigate('/article/1003/jack')}>跳转到文章页-useParams</button>
        </div>
    )
}

export default Login