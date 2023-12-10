import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserInfoService,
  updateUserInfoService,
  updateUserAvatarService,
  updateUserPasswordService
} from '@/api/user'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // userInfo
    const userInfo = ref({})
    const getUserInfo = async () => {
      const res = await getUserInfoService()
      userInfo.value = res.data.data
    }
    const setUser = async (obj) => {
      await updateUserInfoService(obj)
      userInfo.value = { ...obj }
    }
    const removeUser = () => {
      userInfo.value = {}
    }

    // 更换用户头像
    const updateUserAvatar = async (avatar) => {
      await updateUserAvatarService(avatar)
      userInfo.value.user_pic = avatar
    }
    // 更改密码
    const updateUserPwd = async (obj) => {
      await updateUserPasswordService(obj)
      // 清除本地数据
      removeToken()
      userInfo.value = {}
    }

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUserInfo,
      setUser,
      removeUser,
      updateUserAvatar,
      updateUserPwd
    }
  },
  {
    persist: true
  }
)
