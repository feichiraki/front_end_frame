// class API 父子通信
import { Component } from 'react'

// 1.父传子 直接通过prop子组件标签上绑定父组件中的数据即可
// 2.子传父 在子组件标签身上绑定父组件中的函数，子组件中调用这个函数传递参数

// 子组件
class Son extends Component {

    render() {
        return <div>
            我是子组件Son
            {/* 使用父传子数据 */}
            {this.props.msg}
            <button onClick={() => this.props.onGetSonMsg('this is son msg.')}>sendMsgToParent</button>
            {/* 组件Son2传递的数据 */}
            ---{this.props.share}
        </div>
    }
}

class Son2 extends Component {
    state = {
        msg: 'hello my brother!'
    }
    render() {
        return <div className='Son2'>
            我是子组件Son2
            <button onClick={() => this.props.onSendData(this.state.msg)}>sendDataToSon</button>
        </div>
    }
}

// 父组件 
class Parent extends Component {
    state = {
        msg: 'this is parent msg.',
        shareData: ''
    }

    // 定义函数 => 获取子组件传递数据
    getSonMsg(sonMsg) {
        console.log(sonMsg)
    }

    setShareData = (data)=>{
        this.setState({
            shareData:data
        })
    }

    render() {
        return <div className='parent'>
            我是父组件
            子组件Son：<Son msg={this.state.msg} onGetSonMsg={this.getSonMsg} share={this.state.shareData} />
            子组件Son2：<Son2 onSendData={this.setShareData} />
        </div>
    }
}


export default Parent