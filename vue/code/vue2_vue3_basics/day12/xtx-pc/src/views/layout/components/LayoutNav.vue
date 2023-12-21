<script setup>
import {useUserStore} from '@/stores'
import {useRouter} from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
// 退出登录
const handleConfirm = ()=>{
    // 1.清除用户信息
    userStore.clearUserInfo()
    // 2.跳转到登录页(这个操作可以由路由完成，路由守卫。当token不存在时，跳转到登录页)
    router.push('/login')
}

</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 多模板渲染 区分登录和非登录状态 -->

                <!-- 适配思路：登录时显示第一块，非登录时显示第二块 有token-->
                <template v-if="userStore.token">
                    <li><a href="javascript:;"><i class=" iconfont icon-user"></i>{{userStore.userInfo.account }}</a></li>
                    <li>
                        <el-popconfirm title="确认退出吗?" @confirm="handleConfirm" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><a href="javascript:;" @click="$router.push('/member')">会员中心</a></li>
                </template>
                <!-- 第二块：没有token -->
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<style scoped lang="scss">
.app-topnav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $xtxColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>