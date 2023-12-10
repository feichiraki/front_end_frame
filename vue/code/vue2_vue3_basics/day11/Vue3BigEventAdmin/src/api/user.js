import request from '@/utils/request'

// 用户注册
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

// 用户登录
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 获取用户基本信息
export const getUserInfoService = () => request.get('/my/userinfo')

// 更新用户基本信息
export const updateUserInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

// 更新用户头像
export const updateUserAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

// 更改用户密码
export const updateUserPasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
