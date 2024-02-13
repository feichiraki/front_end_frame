import ReactDOM from 'react-dom/client'
// import './index.css'

// 导入provider
import { RouterProvider } from 'react-router-dom'
// 导入router配置
import router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
