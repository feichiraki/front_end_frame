import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
// 导入子组件
import DailyBill from './components/DayBill'

const Month = () => {
    // 1.选择时间功能
    // 控制DatePick打开和关闭，默认是false=>关闭
    const [dateVisible, setDateVisible] = useState(false)
    // 开启弹框=>切换时间的触发事件
    const setDate = () => {
        // 时间弹框开启时箭头指向
        // 弹框开启
        setDateVisible(true)
    }
    // 弹框取消/关闭时触发事件
    const closeDatePick = () => {
        setDateVisible(false)
        // 时间弹框关闭时箭头指向
    }


    // 2.控制时间显示
    // 当前选中日期(YYYY-MM) 可以通过它从后面monthGroup中获取当月的数据
    const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))
    // 对应月份的数据
    const onConfirm = (value) => {
        const formatDate = dayjs(value).format('YYYY-MM')
        setCurrentDate(formatDate)
        // 4.1 拿到月份分组中的数据
        // state更新数据是异步的，在同步代码执行之前，异步都不会执行
        setMonthList(monthGroup[formatDate] || [])
    }


    // 3.做数据分组（按月份）
    const billList = useSelector(state => state.bill.billList)
    // 得到的是一个按月份分好组的数组
    const monthGroup = useMemo(() => {
        // return计算后的值
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])


    // 4.计算月份统计数据 (返回统计数据)
    // 当前选中月份的数据，其中包含了该月中所有的收支记录
    const [currentMonthList, setMonthList] = useState([])
    const monthResult = useMemo(() => {
        // 支出 / 收入 / 结余
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((sum, item) => sum + item.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((sum, item) => sum + item.money, 0)
        // 返回
        return {
            pay,
            income,
            total: pay + income
        }
    },[currentMonthList])


    // 5.初始化月度统计数据
    useEffect(() => {
        const newDate = dayjs().format('YYYY-MM')
        if (monthGroup[newDate]) {
            setMonthList(monthGroup[newDate])
        }
    }, [monthGroup])

    
    // 6.将当前选中月份数据(数组)，按日进行分组
    const dayGroup = useMemo(() => {
        const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)

        // 当前选中月份每天数据 + 每天的key(YYYY-MM-DD)
        return {
            groupData,
            keys
        }
    }, [currentMonthList])


    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={setDate}>
                        <span className="text">
                            {currentDate}月账单
                        </span>
                        <span className={classNames('arrow', { 'expand': dateVisible })} ></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        onClose={closeDatePick}
                        max={new Date()}
                        onConfirm={onConfirm}
                    />
                </div>
                {/* 单日列表 */}
                {
                    dayGroup.keys.map(key=>{
                        return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]}/>
                    })
                }

            </div>
        </div >
    )
}

export default Month