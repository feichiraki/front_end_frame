// 封装倒计时逻辑函数
import {ref,computed,onUnmounted} from 'vue'
import { dayjs } from 'element-plus'

export const useCountDown = ()=>{
    // 1.响应式的数据
    let timer = null
    const time = ref(0)
    const formatTime = computed(()=>dayjs.unix(time.value).format('mm分ss秒'))
    // 2.开始倒计时函数
    const start = (currentTime)=>{
        // 开始倒计时逻辑
        // 核心逻辑的编写：每隔1秒减一
        time.value = currentTime
        timer =  setInterval(()=>{
                time.value--
        },1000)
    }
    onUnmounted(()=>{
        timer && clearInterval(timer)
    })
    return{
        formatTime,
        start
    }
}