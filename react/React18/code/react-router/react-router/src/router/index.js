import { createBrowserRouter } from 'react-router-dom'
import Login from '../page/Login'
import Article from '../page/Article'
import App from '../App'
import Layout from '../page/Layout'
import About from '../page/About'
import Board from '../page/Board'
import NotFound from '../page/NotFound'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'layout',
        element: <Layout />,
        children: [
            // 默认二级路由：设置index:true并去掉path
            {
                index: true,
                element: <About />
            },
            {
                path: 'board',
                element: <Board />
            }
        ]
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'article/:id/:name',
        element: <Article />,
    },
    {
        // 路由的错误处理
        path:'*',
        element: <NotFound />,
    }
])

export default router