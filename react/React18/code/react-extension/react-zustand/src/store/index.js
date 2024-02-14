// 这里用来整合所有的store模块
import { create } from 'zustand'
import channelStore from './modules/channelStore'
import couterStore from './modules/couterStore'
// (1) 第一种添加zustand的调试工具方式—simple-zustand-devtools
// import { mountStoreDevtool } from 'simple-zustand-devtools'
// 第二种 通过zustand包中的函数 devtools 将其添加至 Redux(浏览器上需要安装Redux插件)调试器中
// import { devtools } from 'zustand/middleware'


const useStore = create((...a)=>{
    return {
        ...couterStore(...a),
        ...channelStore(...a),
    }
})

// const useStore = create(
//     devtools((...a) => {
//         return {
//             ...channelStore(...a),
//             ...couterStore(...a)
//         }
//     },
//         {
//             name: 'store',
//             enabled: true
//         }
//     )
// )

// (1) 开发环境开启调试-simple-zustand-devtools
// if (process.env.NODE_ENV === 'development') {
//     mountStoreDevtool('Store', useStore)
// }

export default useStore