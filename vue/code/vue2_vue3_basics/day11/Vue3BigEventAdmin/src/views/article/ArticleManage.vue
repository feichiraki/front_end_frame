<script setup>
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { artGetListService, artDelService } from '@/api/article'
import { formatDate } from '@/utils/format.js'
import { ref } from 'vue'

// 假数据
const articleList = ref([]) // 文章列表数据
const total = ref(0) // 总数据条数
const loading = ref(false) // loading状态
// 定义请求参数
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const getArticleList = async () => {
  loading.value = true
  const {
    data: { data, total: totalNum }
  } = await artGetListService(params.value)
  articleList.value = data
  total.value = totalNum
  loading.value = false
}
getArticleList()

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 搜索逻辑 => 按照最新的条件，重新检索，从第一页开始
const onSearch = () => {
  params.value.pagenum = 1
  console.log(params.value)
  getArticleList()
}
// 重置的逻辑 => 重置参数，从第一页开始
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const articleEditRef = ref()
// 发布文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage // 更新为最大页面数
  } else {
    // 如果是编辑，最好渲染当前页即可
  }
  getArticleList()
}
// 编辑文章
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除文章
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('确定删除该文章吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功!' })
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>

    <!-- 表单区域 -->
    <!-- 
      行内表单： inline="true" / :inline="true" / inline
      select添加描述文字：  el-form-item 加上label属性
      select下拉菜单添加子项：el-option
     -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- 
           Vue2 : v-model => :value  @input
           Vue3 : v-model => :modelValue  @update:modelValue
         -->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="state" label="发表时间">
        <template #default="{ row }">
          {{ formatDate(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页布局 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
