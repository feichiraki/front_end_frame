<script setup>
import { onMounted, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useArticleStore } from '@/stores'
import channelEdit from '@/views/article/components/ChannelEdit.vue'
import { ElMessageBox } from 'element-plus'
import { artDelChannelService } from '../../api/article'
const articleStore = useArticleStore()

const loading = ref(false)
const dialogRef = ref()

onMounted(() => {
  loading.value = true
  articleStore.getChannel()
  loading.value = false
})
const onEditChannel = (row) => {
  dialogRef.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确定要删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessageBox({ type: 'success', message: '删除成功' })
  articleStore.getChannel()
}
const onAddChannel = () => {
  dialogRef.value.open({})
}
const onSuccess = () => {
  articleStore.getChannel()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="articleStore.channelList">
      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <channelEdit ref="dialogRef" @success="onSuccess"></channelEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
