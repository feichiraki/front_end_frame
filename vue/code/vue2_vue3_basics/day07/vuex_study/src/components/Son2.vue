<template>
  <div class="son2">
    <h2>Son2 子组件</h2>
    <p>从vuex中获取的值为：{{ count }}</p>
    <button @click="$store.commit('subCount', 1)">值-1</button>
    <button @click="$store.commit('subCount', 5)">值-5</button>
    <button @click="$store.commit('subCount', 10)">值-10</button>
    <button @click="changeCountAction(888)">一秒后888</button>
    <hr />
    <div>
      <div>{{ $store.state.list }}</div>
      <div>大于5的值：{{ filterList }}</div>
    </div>

    <!-- 访问模块中的state -->
    <hr />
    <div>
      {{user.userInfo.name}}
      {{setting.theme}}
    </div>
    <div>
      {{userInfo.name}} - {{userInfo.age}} <br>
      {{theme}}
    </div>

    <!-- 访问模块中的Getters -->
    <hr>
    <div>
      {{UpperCaseName}}
    </div>

    <!-- 调用模块中的Mutation -->
    <hr>
    <div>
      <button @click="setName('zhangsan')">修改名字</button>
    </div>

    <!-- 调用模块中的Action -->
    <hr>
     <div>
      <button @click="setNameAction('qianliu')">一秒后修改名字</button>
    </div>
  </div>  
</template>

<script>
import { mapState, mapActions, mapGetters,mapMutations } from "vuex";
export default {
  name: "SonTwo",
  data() {
    return {};
  },
  computed: {
    ...mapState(["count",'user','setting']),
    ...mapState('user',['userInfo']),
    ...mapState('setting',['theme']),
    ...mapGetters(["filterList"]),
    ...mapGetters('user',['UpperCaseName'])
  },
  methods: {
    ...mapActions(["changeCountAction"]),
    ...mapActions('user',['setNameAction']),
    ...mapMutations('user',['setName']),

  },
};
</script>

<style>
.son2 {
  width: 400px;
  /* height: 150px; */
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #ccc;
}
</style>