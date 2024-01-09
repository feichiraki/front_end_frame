import { Outlet,Link } from "react-router-dom"

function Layout(){

    return (
        <div>
            我是Layout页面
            <br/>
            <Link to="/layout">About</Link><br />
            <Link to="/layout/board">Board</Link>

            {/* 二级路由出口 */}
            <Outlet/>
        </div>
    )
}

export default Layout