<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCategoryService, getSubCategoryDataService } from '@/api/category'
import GoodsItem from '@/views/home/components/GoodsItem.vue'

// 获取面包屑数据
const route = useRoute()
const subCategoryData = ref({})

const getSubCategory = async () => {
    const res = await getSubCategoryService(route.params.id)
    subCategoryData.value = res.data.result
}

onMounted(() => { getSubCategory() })

// 获取基本列表数据
const goodList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const getGoodList = async () => {
    const res = await getSubCategoryDataService(reqData.value)
    goodList.value = res.data.result.items
}
onMounted(() => { getGoodList() })

// tab切换回调
const tabChange = () => {
    reqData.value.page = 1
    getGoodList()
}

// 设置加载状态
const loading = ref(false)

// 禁用无限加载
const disabled = ref(false)

// 商品列表实现无限加载功能
const load = async () => {
    reqData.value.page++
    loading.value = true
    const res = await getSubCategoryDataService(reqData.value)
    goodList.value = [...goodList.value, ...res.data.result.items]
    loading.value = false
    if (res.data.result.items.length === 0) {
        disabled.value = true
    }
}



</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${subCategoryData.parentId}` }">{{ subCategoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" >
                <!-- 商品列表-->
                <GoodsItem v-for="good in goodList" :key="good.id" :good="good"></GoodsItem>
            </div>
            <div v-loading="loading" element-loading-text="加载中..." style="text-align:center; color:#999;">
                <p v-show="loading" style="height:80px"></p>
                <p v-if="disabled">没有更多商品了!</p>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>