import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contant/billList'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import { insertBill } from '@/store'
import { useDispatch } from 'react-redux'

const New = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // 状态
    const [Billtype, setType] = useState('pay')
    // 时间选择器显示状态
    const [visible, setVisible] = useState(false)
    // 选中的时间-key
    const [nowDate, setDate] = useState(dayjs().format('YYYY-MM-DD'))
    // 选中时间-detail
    const [date, setDetailDate] = useState('')
    // 文本框设置的money
    const [money, setMoney] = useState(0)
    // 收入/支出源
    const [useFor, setUseFor] = useState('')


    // 1.切换支出和收入
    const toogleType = (type) => {
        setType(type)
        // 注意，如果输入框中有值，我们需要将其进行取反操作
        // 因为修改state是异步操作，我们只能以传递过来的值进行判断
        if (type === 'pay') {
            if (money > 0) setMoney(-money)
        } else {
            // 反之，进行取反
            if (money < 0) setMoney(-money)
        }
    }

    // 2.新增账单
    // 2.1 修改账单提交时间
    const handleChangeDate = (date) => {
        const formatDate = dayjs(date).format('YYYY-MM-DD')
        // 当日期相同时，不做操作
        if (formatDate === nowDate) return
        // 日期不同时，设置时间
        setDate(formatDate)
        setDetailDate(date)
    }

    // 2.2 设定支出/收入money
    const getMoney = (e) => {
        if (Billtype === 'pay') {
            setMoney(-e.target.value)
        } else {
            setMoney(+e.target.value)
        }
    }


    // 2.3 选择支出/消费来源 useFor
    const handleUserFor = (type) => {
        setUseFor(type)
    }

    // 2.4 新增账单
    const addBill = () => {
        const data = {
            type: Billtype,
            money,
            date: date || new Date(),
            useFor
        }
        // console.log(data)
        dispatch(insertBill(data))
    }


    return (
        <div className="keepAccounts">
            {/* 页面介绍 */}
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>


            <div className="header">
                {/* 账单类型 */}
                <div className="kaType">
                    <Button
                        shape="rounded"
                        // 样式切换
                        className={classNames(Billtype === 'pay' && 'selected')}
                        onClick={() => toogleType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        // 样式切换
                        className={classNames({ 'selected': Billtype === 'income' })}
                        shape="rounded"
                        onClick={() => toogleType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date" onClick={() => setVisible(true)}>
                            <Icon type="calendar" className="icon" />
                            <span className="text">{dayjs().format('YYYY-MM-DD') === nowDate ? '今天' : nowDate}</span>
                            <DatePicker
                                visible={visible}
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                onClose={() => setVisible(false)}
                                onConfirm={handleChangeDate}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                onBlur={getMoney}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="kaTypeList">
                {billListData[Billtype].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title" >{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                { 'selected': useFor === item.type }
                                            )}
                                            key={item.type}
                                            onClick={() => handleUserFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={addBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New