import { Image, List, InfiniteScroll } from 'antd-mobile'
// mock数据
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchListAPI, ListRes } from '@/api/list'

type Props = {
    channelId: string
}

const HomeList = (props: Props) => {
    const { channelId } = props
    const [listRes, setListRes] = useState<ListRes>({
        results: [],
        pre_timestamp: '' + new Date().getTime(),
    })
    // 初始数据获取
    useEffect(() => {
        async function getList() {
            try {
                const res = await fetchListAPI({
                    channel_id: channelId,
                    timestamp: '' + new Date().getTime(),
                })
                setListRes({
                    results: res.data.data.results,
                    pre_timestamp: res.data.data.pre_timestamp
                })
            } catch (error) {
                throw new Error('fetch list error')
            }
        }
        getList()
    }, [])

    // 开关标记是否还有新数据
    const [hasMore, setHasMore] = useState(true)

    // 加载
    const loadMore = async () => {
        // 编写加载下一页的逻辑
        try {
            const res = await fetchListAPI({
                channel_id: channelId,
                timestamp: listRes.pre_timestamp
            })
            // 拼接新数据 + 存取下一次请求的时间戳
            setListRes({
                results: [...listRes.results, ...res.data.data.results],
                pre_timestamp: res.data.data.pre_timestamp
            })
            // 停止监听
            if (res.data.data.results.length === 0) {
                setHasMore(false)
            }
        } catch (error) {
            throw new Error('fetch list error')
        }
    }
    const navigate = useNavigate()
    const goToDetail = (id:string) => {
        // 路由跳转
        navigate(`/detail?id=${id}`)
    }
    return (
        <>
            <List>
                {listRes.results.map((item) => (
                    <List.Item
                        onClick={() => goToDetail(item.art_id)}
                        key={item.art_id}
                        prefix={
                            <Image
                                src={item.cover.images?.[0]}
                                style={{ borderRadius: 20 }}
                                fit="cover"
                                width={40}
                                height={40}
                            />
                        }
                        description={item.pubdate}
                    >
                        {item.title}
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </>
    )
}

export default HomeList