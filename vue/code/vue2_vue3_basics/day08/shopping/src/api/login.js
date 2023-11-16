// 此模块专门用来存放跟登录相关的接口
import request from '@/utils/request'

// 请求验证码图片
export const getCodeImg = () => {
  return request.get('/captcha/image')
}

// 获取验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 验证码登录
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile: mobile,
      smsCode: smsCode,
      partyData: {}
    }
  })
}
