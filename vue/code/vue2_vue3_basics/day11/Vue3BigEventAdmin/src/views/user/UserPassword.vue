<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
// import { updateUserPasswordService } from '@/api/user'

const formRef = ref()
const router = useRouter()
const userStore = useUserStore()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const validateDifferent = (rule, value, callback) => {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    callback()
  }
}

const validateMatch = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('确认密码与新密码不一致'))
  } else {
    callback()
  }
}

const formRules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度为6-15位', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度为6-15位', trigger: 'blur' },
    { validator: validateDifferent, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度为6-15位', trigger: 'blur' },
    { validator: validateMatch, trigger: 'blur' }
  ]
}

const submitForm = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    await userStore.updateUserPwd(pwdForm.value)
    ElMessage({ type: 'success', message: '修改成功' })
    router.push('/login')
  }
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>
<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="formRules"
          ref="formRef"
          label-position="right"
          label-width="80px"
        >
          <!-- 第一行 -->
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" show-password></el-input>
          </el-form-item>

          <!-- 第二行 -->
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" show-password></el-input>
          </el-form-item>

          <!-- 第三行 -->
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" show-password></el-input>
          </el-form-item>

          <!-- 第四行 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">修改密码</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
