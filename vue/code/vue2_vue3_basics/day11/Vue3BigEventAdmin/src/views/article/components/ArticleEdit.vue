<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import {
  artPublishService,
  artGetDetailService,
  artEditService
} from '@/api/article'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { baseURL } from '@/utils/request'
import { imageUrlToFile } from '@/utils/format'

const visibleDrawer = ref(false)
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({ ...defaultForm })
const imgUrl = ref('')
const emit = defineEmits(['success'])
const editorRef = ref()

const open = async (row) => {
  visibleDrawer.value = true // 显示抽屉
  if (row.id) {
    // 编辑回显
    // 需要根据id发送请求，获取编辑对应的详情数据
    // console.log(row)

    // 1. 通过id发送请求，获取详情数据
    const res = await artGetDetailService(row.id)
    // 2.将响应的数据赋值给 formModel
    formModel.value = res.data.data
    // 3. 预览图片
    imgUrl.value = baseURL + formModel.value.cover_img
    // 4.在编辑状态的同时，我们还需要把获取到的 img网络地址 转换为 file对象(因为后端接口cover_img只支持file对象)
    // 注意：并不是所有的接口都是这样，一般而言，后端的接口是应该具备支持file及网络地址的功能的
    // 这样做的原因是为了后面更改文章内容时，方便提交
    formModel.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      formModel.value.cover_img
    )
  } else {
    formModel.value = { ...defaultForm }
  }
}

const onUploadFile = (uploadFile) => {
  // console.log(uploadFile)
  imgUrl.value = URL.createObjectURL(uploadFile.raw) // 预览图片
  // 立即将图片对象，存入 formModel中，将来用于提交
  formModel.value.cover_img = uploadFile.raw
}

const onPublish = async (state) => {
  // 将状态存入 formModel
  formModel.value.state = state
  // 注意：当前接口，需要的是 formData对象
  // 将普通对象 => formData对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    // 编辑操作
    await artEditService(fd)
    visibleDrawer.value = false
    ElMessage.success('修改成功')
    emit('success', 'edit')
  } else {
    await artPublishService(fd)
    visibleDrawer.value = false
    ElMessage.success('发布成功')
    emit('success', 'add')
  }
  // 不管是编辑还是添加，都需要重置表单
  formModel.value = { ...defaultForm }
  imgUrl.value = ''
  editorRef.value.setHTML('')
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 
             此处需要关闭 element-plus 的自动上传功能，手动上传。不需要配置 action 等参数
             只需要做前端的本地预览图片即可，无需提交前上传图片
             语法：URL.createObjectURL(file) 创建本地预览的地址，来预览

         -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            content-type="html"
            v-model:content="formModel.content"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
