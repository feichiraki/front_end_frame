import { devtools } from 'zustand/middleware'

// const createCounterStore = (set)=>{
//     return {
//         // 状态数据
//         count: 0,
//         //  修改状态的方法
//         inc: () => {
//             set((state) => ({ count: state.count + 1 }))
//         },
//     }
// }


const createCounterStore = devtools((set) => {
    return {
        count: 0,
        inc: () => {
            set((state) => ({ count: state.count + 1 }))
            // set({count:100})
        }
    }
}, {
    name: 'couterState',
    enabled: true,
    anonymousActionType: 'couterAction'
})

export default createCounterStore