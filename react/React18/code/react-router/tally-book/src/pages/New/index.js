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
    // 1.切换支出和收入
    const [Billtype, setType] = useState('pay')
    const toogleType = (type) => {
        setType(type)
        setBill({ ...bill, type })
    }

    // 2.新增账单
    // 2.1 准备需要提交的数据model
    const [bill, setBill] = useState({
        type: Billtype,
        money: 0,
        date: '',
        useFor: '',
    })

    // 2.2 修改账单提交时间
    // 时间选择器显示状态
    const [visible, setVisible] = useState(false)
    // 选中的时间
    const [nowDate, setDate] = useState(dayjs().format('YYYY-MM-DD'))
    const handleChangeDate = (date) => {
        setDate(dayjs(date).format('YYYY-MM-DD'))
        // if (dayjs().format('YYYY-MM-DD') === nowDate){
        //     setBill({ ...bill, date: new Date().toISOString() })
        // }else{
        //     setBill({ ...bill, date: date.toISOString() })
        // }
        setBill({ ...bill, date: date.toISOString() })
    }

    // 2.3 设定支出/收入money
    const getMoney = (e) => {
        if (Billtype === 'pay') {
            setBill({ ...bill, money: -e.target.value})
        } else {
            setBill({ ...bill, money: +e.target.value})
        }
    }

    // 2.4 选择支出/消费来源 useFor
    const [useFor, setUseFor] = useState('')
    const handleUserFor = (e) => {
        // 阻止冒泡
        // e.stopPropagation()
        // console.log(e.target)

        // 第二种方式：
        // console.log(e.currentTarget.dataset)
        const { type } = e.currentTarget.dataset
        setUseFor(type)
        setBill({...bill,useFor:type})
    }

    // 2.5 新增账单
    const addBill = () => {
        if(!bill.date){
            bill.date = new Date().toISOString()
        }
        // 新增账单
        dispatch(insertBill(bill))
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
                                                { 'selected': useFor === item.type}
                                            )}
                                            key={item.type}
                                            data-type={item.type}
                                            onClick={handleUserFor}
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