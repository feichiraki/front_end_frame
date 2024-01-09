// 导入searchParams和useParams钩子来接收传递过来的参数
// 1.导入这两个钩子
// 2.根据传递方式来选择对应的钩子使用
//      2.1 /article?id=1002&name=tom => searchParams
//      2.2 /article/1001/jack      => useParams
// 3.通过对应钩子得到实例对象
// 4.调用实例得到传递过来的参数

import { useSearchParams,useParams } from "react-router-dom"


const Article = ()=>{
    const [params] = useSearchParams()
    const uParams = useParams()
    return(
        <div>我是文章页面
            {/* 普通传参 */}
            <p>文章ID：{params.get('id')}-{params.get('name')}</p>
            {/* 动态路由传参 */}
            <p>文章ID：{uParams.id}-{uParams.name}</p>
        </div>
    )
}

export default Article