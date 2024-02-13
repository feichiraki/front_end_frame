import { NavBar } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { DetailData, fetchDetailAPI } from '@/api/detail'
import { useNavigate, useSearchParams } from 'react-router-dom'
const Detail = () => {
    const [detail, setDetail] = useState<DetailData | null>(null)

    // 获取url地址栏中的id
    const [params] = useSearchParams()
    const id = params.get('id')

    // 通过id发送请求获取文章详情数据
    useEffect(() => {
        async function getDetail() {
            try {
                const res = await fetchDetailAPI(id!)
                setDetail(res.data.data)
            } catch (error) {
                throw new Error('fetch detail error')
            }
        }
        if (id) {
            getDetail()
        }
    }, [id])

    // 回退功能
    const navigate = useNavigate()
    const back = () => navigate(-1)

    // 如果detail为空，则返回下面的JSX
    if (!detail) {
        return <div>this is loading</div>
    }
    return (
        <div>
            <NavBar onBack={back}>{detail.title}</NavBar>
            <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
        </div>
    )
}

export default Detail