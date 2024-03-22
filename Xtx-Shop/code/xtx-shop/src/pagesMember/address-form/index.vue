<script setup lang="ts">
import { ref } from 'vue'
import { postMemberAddress, getMemberAddress, putMemberAddress } from '@/services/address'
import { onLoad } from '@dcloudio/uni-app'

// 获取页面参数
const query = defineProps<{
  id?: string
}>()

// 动态设置标题
uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新建地址' })

// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

// 收集表单数据
// 1.通过v-model绑定基本的输入框数据
// 2.通过uni-data-picker选择器收集省市区数据
// #ifdef MP-WEIXIN
const onRegionChange: UniHelper.RegionPickerOnChange = (e) => {
  // 省市区/前端展示
  form.value.fullLocation = e.detail.value.join(' ')
  // 省市区/后端参数
  const [provinceCode, cityCode, countyCode] = e.detail.code!
  // 将地区编码复制到表单数据中
  Object.assign(form.value, {
    provinceCode,
    cityCode,
    countyCode,
  })
}
// #endif

// #ifdef H5 || APP-PLUS
const onCityChange: UniHelper.UniDataPickerOnChange = (ev) => {
  // 省市区/后端参数
  const [provinceCode, cityCode, countyCode] = ev.detail.value.map((v) => v.value)
  // 合并数据，用于表单提交
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}
// #endif

// 修改默认地址
const onSwitchChange: UniHelper.SwitchOnChange = (e) => {
  // 1为是 0为否
  form.value.isDefault = e.detail.value ? 1 : 0
}

// 提交表单数据
const onSubmit = async () => {
  // 表单校验
  await formRef.value?.validate?.()
  if (query.id) {
    console.log(form.value)
    // 修改地址逻辑
    await putMemberAddress(query.id!, form.value)
    // 成功提示
    uni.showToast({ title: '修改成功' })
  } else {
    // 新增地址逻辑
    await postMemberAddress(form.value)
    // 成功提示
    uni.showToast({ title: '保存成功' })
  }
  // 返回上一页
  setTimeout(() => uni.navigateBack(), 400)
}

// 获取地址详情
const getAddressDetail = async () => {
  // 请求接口获取地址详情
  const res = await getMemberAddress(query.id!)
  // 把数据合并到表单中
  Object.assign(form.value, res.result)
}

// 页面加载时获取地址详情
onLoad(() => {
  if (query.id) {
    getAddressDetail()
  }
})

// 定义校验规则
const rules: UniHelper.UniFormsRules = {
  receiver: {
    rules: [{ required: true, errorMessage: '请输入收货人姓名' }],
  },
  contact: {
    rules: [
      { required: true, errorMessage: '请输入联系方式' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
    ],
  },
  countyCode: {
    rules: [{ required: true, errorMessage: '请选择所在地区' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '请选择详细地址' }],
  },
}
// 绑定表单实例
const formRef = ref<UniHelper.UniFormsInstance>()
</script>

<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item name="receiver" class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <!-- 手机号码 -->
      <uni-forms-item name="contact" class="form-item">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <!-- 所在地区 -->
      <uni-forms-item name="countyCode" class="form-item">
        <text class="label">所在地区</text>
        <!-- #ifdef MP-WEIXIN -->
        <picker
          class="picker"
          mode="region"
          :value="form.fullLocation.split(' ')"
          @change="onRegionChange"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
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
          @change="onCityChange"
          v-model="form.countyCode"
        >
        </uni-data-picker>
        <!-- #endif -->
      </uni-forms-item>
      <!-- 详细地址 -->
      <uni-forms-item name="address" class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <!-- 是否为默认地址 -->
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          @change="onSwitchChange"
          color="#27ba9b"
          :checked="form.isDefault === 1"
        />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="onSubmit">保存并使用</button>
</template>

<style lang="scss">
/* #ifdef H5 || APP-PLUS */
:deep(.selected-area) {
  height: auto;
  flex: 0 0 auto;
}
:deep(.uni-data-tree-dialog) {
  top: 50%;
}
:deep(.input-value-border) {
  border: none;
}
:deep(.uni-data-tree .input-value) {
  font-size: 16px;
}
:deep(.input-arrow) {
  width: 0;
  height: 0;
  border: none;
}

.uni-data-tree-dialog {
  top: auto !important;
}
/* #endif */

page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
