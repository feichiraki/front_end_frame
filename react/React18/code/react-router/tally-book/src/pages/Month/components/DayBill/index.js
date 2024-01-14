import classNames from 'classnames'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/contant/billList'
import './index.scss'
import Icon from '@/components/Icon'

const DailyBill = ({ date, billList }) => {
    // 1.计算月份统计数据 (返回统计数据)
    const dayResult = useMemo(() => {
        // 支出 / 收入 / 结余
        const pay = billList.filter(item => item.type === 'pay').reduce((sum, item) => sum + item.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((sum, item) => sum + item.money, 0)
        // 返回
        return {
            pay,
            income,
            total: pay + income
        }
    }, [billList])


    // 2.控制展开和收起
    const [visible, setVisible] = useState(false)

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    {/* expand，有这个类名箭头朝上*/}
                    <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList" style={{ 'display': visible ? 'block' : 'none' }}>
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            {/* 渲染图标 */}
                            <Icon type={item.useFor}/>
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DailyBill