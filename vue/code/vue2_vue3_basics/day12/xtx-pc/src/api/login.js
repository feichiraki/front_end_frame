import request from "@/utils/request"

/**
 * @description:用户名&密码登录
 * @data {
        account:string
        password:string
 * }
 * @return {*}
 */
export const userLoginService = (data)=>
    request.post('/login',data)


/**
 * @description:获取短信验证码-登录
 * @params {
        mobile:string
    }
 * @return {*}
 */
export const getLoginCodeService = (mobile)=>
    request.get('/login/code',{
        params:{
            mobile
        }
    })

/**
 * @description:获取短信验证码-登录
 * @data {
        mobile:string
        code:string
    }
 * @return {*}
 */
export const codeLoginService = (data)=>
    request.post('/login/code',data)