<template>
  <!-- 最新专题 -->
  <div class="topic wrapper">
    <div class="title">
      <div class="left">
        <h3>最新专题</h3>
      </div>
      <div class="right">
        <a href="#" class="more"
          >查看全部<span class="iconfont icon-arrow-right-bold"></span
        ></a>
      </div>
    </div>
    <div class="topic_bd">
      <ul>
        <BaseTopicItem></BaseTopicItem>
        <BaseTopicItem></BaseTopicItem>
        <BaseTopicItem></BaseTopicItem>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* 最新专题 */
.topic {
  padding-top: 60px;
  margin-bottom: 40px;
}
.topic_bd ul {
  display: flex;
  justify-content: space-between;
}
</style>