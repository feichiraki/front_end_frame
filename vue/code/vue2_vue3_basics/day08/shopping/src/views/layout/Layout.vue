<template>
  <div class="layout-page">
    <!-- 二级路由出口：二级组件展示的位置 -->
    <router-view></router-view>

    <!--
    active-color：激活时颜色，inactive-color：未激活(未点击)时颜色
    route:开启路由模式，然后我们就可以给子标签加上 to 属性
   -->
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="search">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>
</style>
