/**
 * 添加拦截器：
 *      拦截 request 请求
 *      拦截 uploadFile 文件上传
 * TODO:
 *      1. 拼接基础地址
 *      2. 设置超时时间
 *      3. 添加请求头标识
 *      4. 添加 token
 */
import { useMemberStore } from '@/stores'
// 基地址
const BaseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 拦截匹配规则
const reqInterceptor = {
  // 拦截前触发
  invoke(args: UniApp.RequestOptions) {
    // 1. 非http 拼接基础地址
    if (!args.url.startsWith('http')) {
      args.url = BaseURL + args.url
    }
    // 2. 设置超时时间 默认为60s
    args.timeout = 10000
    // 3. 添加小程序请求头标识
    args.header = {
      ...args.header,
      'source-client': 'miniapp',
    }
    // 4.添加 token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      args.header.Authorization = token
    }
  },
}

// 添加拦截器
// 拦截 request 请求
uni.addInterceptor('request', reqInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', reqInterceptor)

/**
 * 请求函数
 * @param options UniApp.RequestOptions
 * @returns Promise
 * 1.返回Promise对象
 * 2.请求成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 * 3.请求失败
 *    3.1 网络失败 => 提示用户换网络
 *    3.2 401错误  => 清理用户信息，跳转到登录页
 *    3.3 其他错误 => 根据后端错误信息轻提示
 */
interface Data<T> {
  code: string
  msg: string
  result: T
}

// 2.2 添加类型，支持泛型
export const request = <T>(options: UniApp.RequestOptions) => {
  // 1.返回Promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 2.请求成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          // 类型断言
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 3.2 401错误 => 清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          // 跳转到登录页
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 3.3 其他错误 => 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },

      // 3.请求失败
      fail(err) {
        // 3.1 网络失败 => 提示用户换网络
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
