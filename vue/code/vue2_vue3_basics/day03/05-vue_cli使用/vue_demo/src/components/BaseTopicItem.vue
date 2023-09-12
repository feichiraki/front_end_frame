<template>
  <li class="base-topic-item">
    <a href="#">
      <div class="pic">
        <img src="@/assets/images/topic3.png" alt="" />
        <div class="info">
          <div class="left">
            <h5>吃这些美食才不算辜负自己</h5>
            <p>餐厨起居洗护好物</p>
          </div>
          <div class="right">¥<span>29.9</span>起</div>
        </div>
      </div>
      <div class="txt">
        <div class="left">
          <p>
            <span class="iconfont icon-fabulous"></span>
            <i>1200</i>
          </p>
          <p>
            <span class="iconfont icon-browse"></span>
            <i>1800</i>
          </p>
        </div>
        <div class="right">
          <span class="iconfont icon-comment"></span>
          <i>246</i>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {};
</script>

<style>
.base-topic-item {
  width: 405px;
  height: 355px;
}
.base-topic-item .pic {
  position: relative;
  width: 405px;
  height: 288px;
}
.base-topic-item .txt {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 67px;
  line-height: 67px;
  color: #666;
  font-size: 14px;
}
.base-topic-item .txt .left {
  display: flex;
}
.base-topic-item .txt .left p {
  margin-right: 20px;
}
.base-topic-item .txt .left .red {
  color: #aa2113;
}
.base-topic-item .info {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  width: 100%;
  height: 90px;
  background-image: linear-gradient(
    180deg,
    rgba(137, 137, 137, 0) 0%,
    rgba(0, 0, 0, 0.9) 100%
  );
}
.base-topic-item .info .left {
  padding-top: 20px;
  color: #fff;
}
.base-topic-item .info .left h5 {
  margin-bottom: 5px;
  font-size: 20px;
}
.base-topic-item .info .right {
  margin-top: 35px;
  padding: 0 7px;
  height: 25px;
  line-height: 25px;
  background-color: #fff;
  color: #aa2113;
  font-size: 15px;
}
</style>