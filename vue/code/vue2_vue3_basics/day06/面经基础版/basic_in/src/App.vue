<template>
  <div class="h5-wrapper">
    <!-- 
      keep-alive包裹，以及路由匹配的组件都会被缓存
      Layout Detail 都会被缓存
     -->
    <!-- 
       keep-alive 的三个属性
        ① include ： 组件名数组，只有匹配的组件会被缓存 
        ② exclude ： 组件名数组，任何匹配的组件都不会被缓存 
        ③ max ： 最多可以缓存多少组件实例

       需求：只希望Layout组件被缓存 include配置
        LayoutPage组件(被缓存) - 多两个生命周期钩子
          - activated ：激活时，被看到时触发
          - deactivated ：失活时，离开页面组件看不见触发

      -->
    <keep-alive :include="keepArr">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "h5-wrapper",
  data() {
    return {
      keepArr: ["LayoutPage"],
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
<style lang="less" scoped>
.h5-wrapper {
  .content {
    margin-bottom: 51px;
  }
  .tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    a {
      flex: 1;
      text-decoration: none;
      font-size: 14px;
      color: #333;
      -webkit-tap-highlight-color: transparent;
      &.router-link-active {
        color: #fa0;
      }
    }
  }
}
</style>