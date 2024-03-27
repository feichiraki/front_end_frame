<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile'
import type { ProfileDetail, Gender } from '@/types/member'
import { useMemberStore } from '@/stores'

const memberStore = useMemberStore()

// 获取个人资料
const profile = ref<ProfileDetail>({} as ProfileDetail)
const getMemberProfile = async () => {
  const res = await getMemberProfileAPI()
  profile.value = res.result
}

onLoad(() => {
  // 处理页面加载时的逻辑
  getMemberProfile()
})

// 上传图片
const onAvatarChange = () => {
  // 处理上传头像的逻辑
  // 调用拍照/选择图片的API

  // #ifdef MP-WEIXIN
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    // 选择文件后的回调函数
    success: (res) => {
      console.log(res)
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      uploadFile(tempFilePath)
    },
  })
  // #endif

  // #ifdef H5 || APP-PLUS
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      uploadFile(tempFilePath)
    },
  })
  // #endif
}

const uploadFile = (tempFilePath: string) => {
  // 文件上传
  uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath: tempFilePath,
    success: (res) => {
      if (res.statusCode === 200) {
        const avatar = JSON.parse(res.data).result.avatar
        profile.value!.avatar = avatar
        memberStore.profile!.avatar = avatar
        uni.showToast({ icon: 'success', title: '头像上传成功' })
      } else {
        uni.showToast({ title: '头像上传失败', icon: 'error' })
      }
    },
  })
}

// 表单提交处理函数
const onSubmit = async () => {
  // 处理表单提交逻辑
  const params = {
    nickname: profile.value.nickname,
    gender: profile.value.gender,
    birthday: profile.value.birthday,
    profession: profile.value.profession,
    provinceCode: fullLocationCode.value[0],
    cityCode: fullLocationCode.value[1],
    countyCode: fullLocationCode.value[2],
  }
  const res = await putMemberProfileAPI(params)
  // 更新store信息
  memberStore.profile!.nickname = res.result.nickname
  profile.value.birthday = res.result.birthday
  profile.value.fullLocation = res.result.fullLocation
  // 提示用户
  uni.showToast({ title: '保存成功', icon: 'success' })
  setTimeout(() => {
    // 返回上一页
    uni.navigateBack()
  }, 400)
}

// 性别更新
const onGenderChange: UniHelper.RadioGroupOnChange = (ev) => {
  profile.value.gender = ev.detail.value as Gender
}

// 生日更新
const onBirthdayChange: UniHelper.DatePickerOnChange = (ev) => {
  // 获取用户选择的日期
  profile.value.birthday = ev.detail.value
}

// 城市更新
const fullLocationCode = ref(['', '', ''])
const onRegionChange: UniHelper.RegionPickerOnChange = (ev) => {
  // 获取用户选择的地区
  profile.value.fullLocation = ev.detail.value.join(' ')
  // 存储地区编号
  fullLocationCode.value = ev.detail.code!
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view @tap="onAvatarChange" class="avatar-content">
        <image class="image" :src="profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <!-- 账号 -->
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile?.account }}</text>
        </view>
        <!-- 昵称 -->
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="profile!.nickname" />
        </view>
        <!-- 性别 -->
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#ff8a34" :checked="profile?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#ff8a34" :checked="profile?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <!-- 生日 -->
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            @change="onBirthdayChange"
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profile?.birthday"
          >
            <view v-if="profile?.birthday">{{ profile?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <!-- 城市 -->
        <view class="form-item">
          <text class="label">城市</text>
          <!-- #ifdef MP-WEIXIN -->
          <picker
            class="picker"
            @change="onRegionChange"
            mode="region"
            :value="profile?.fullLocation?.split(' ')"
          >
            <view v-if="profile?.fullLocation">{{ profile?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
          <!-- #endif -->

          <!-- #ifdef H5 || APP-PLUS -->
          <uni-data-picker
            placeholder="请选择地址"
            popup-title="请选择城市"
            collection="opendb-city-china"
            field="code as value, name as text"
            orderby="value asc"
            :step-searh="true"
            self-field="code"
            parent-field="parent_code"
            :clear-icon="false"
            @change="onRegionChange"
            v-model="fullLocationCode[2]"
          >
          </uni-data-picker>
		<!-- #endif -->
        </view>
        <!-- 职业 -->
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profile!.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(@/static/images/myinfo_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #666;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    // background-color: #27ba9b;
    background-color: #ff8a34;
  }
}
</style>
