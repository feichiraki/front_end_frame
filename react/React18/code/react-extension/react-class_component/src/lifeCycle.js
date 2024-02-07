import { Component } from "react";

class lifeCycle extends Component{
    // 声明周期函数
    // 组件渲染完毕执行一次，发送网络请求
    componentDidMount(){
        console.log('组件渲染完毕了，请求数据发送中~~~')
        // 开启定时器
        this.timer = setInterval(()=>{
            console.log('定时器运行中')
        },1000)
    }

    // 组件卸载时候自动执行 副作用清理的工作 清除定时器 清除事件绑定
    componentWillUnmount(){
        console.log('组件lifeCycle被卸载了')
        // 清除定时器
        clearInterval(this.timer)
    }

    render(){
        return <div>i am lifeCycle.</div>
    }
}

export default lifeCycle