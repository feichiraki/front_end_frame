<template>
  <div class="login-page">
    <!-- 头部：NavBar -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
            v-model="phone"
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img v-if="picUrl" :src="picUrl" alt="" @click="getCodeImg" />
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text" />
          <button @click="getCode">
            {{
              second === totalSecond ? "获取验证码" : `${second}秒后重新发送`
            }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { codeLogin, getCodeImg, getMsgCode } from '@/api/login'

export default {
  name: 'LoginPage',
  created () {
    this.getCodeImg()
  },
  data () {
    return {
      picUrl: '', // 验证码图片地址
      picCode: '', // 用户输入验证码
      picKey: '', // 验证码图片的唯一标识
      second: 60, // 倒计时读秒
      totalSecond: 60, // 总秒数
      timer: null, // 计时器
      phone: '', // 手机号
      msgCode: '' // 短信验证码
    }
  },
  methods: {
    // 获取验证码图片
    async getCodeImg () {
      const { data: { key, base64 } } = await getCodeImg()
      this.picUrl = base64
      this.picKey = key
    },

    // 校验处理 手机号 / 图片验证码
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.$toast('手机格式不正确')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('验证码格式不正确')
        return false
      }
      return true
    },

    // 获取验证码
    async getCode () {
      // 校验
      if (!this.validFn()) {
        // 如果校验失败，后面就不执行下去
        return
      }

      if (!this.timer && this.second === 60) {
        await getMsgCode(this.picCode, this.picKey, this.phone)
        this.$toast('短信已发送，请查收')

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer) // 当时间到了清除定时器
            this.timer = null // timer清除
            this.second = this.totalSecond // 回到初始值
          }
        }, 1000)
      }
    },

    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      const res = await codeLogin(this.phone, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')

      // 进行判断，看地址栏有无回跳地址
      // 如果有 => 说明是其他页面，拦截到登录来的，需要回调
      // 如果没有 => 正常去首页
      const url = this.$route.query.backUrl || '/'
      // 这里是不推荐用 push ，而是推荐用 replace
      this.$router.replace(url)
    }
  },
  destroyed () {
    // 离开页面时销毁定时器
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
