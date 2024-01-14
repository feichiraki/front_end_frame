import { Outlet } from "react-router-dom"
import { TabBar } from 'antd-mobile'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from '@/store'
import { BillOutline, CalculatorOutline, AddCircleOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"
import './index.scss'


const tabs = [
    {
        key: '/',
        title: '月度账单',
        icon: <BillOutline />
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />
    }, {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline />
    },
]

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    const navigate = useNavigate()
    const switchRoute = (path) => {
        navigate(path)
    }
    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map(
                        item => <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    )}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout