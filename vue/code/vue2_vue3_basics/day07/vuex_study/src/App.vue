<template>
  <div id="app">
    <div>
      <!-- <h1>根组件 {{$store.state.count}}</h1> -->
      <h1>根组件 - {{title}} - {{count}}</h1>
      <input type="text" :value="count" @input="change">
    </div>
    <Son1></Son1>
    <Son2></Son2>
  </div>
</template>

<script>
import Son1 from '@/components/Son1.vue'
import Son2 from '@/components/Son2.vue'
import { mapState,mapMutations } from 'vuex'

export default {
  name: 'App',
  created(){
    // console.log(this.$store.state)
    // console.log(mapState(['count']))  // 对象
  },
  components: {
    Son1,Son2
  },
  data(){
    return {}
  },
  methods:{
    ...mapMutations(['changeCount']),
    // change(e){
    //   this.$store.commit('changeCount',+e.target.value)
    // }
    change(e){
      // this.$store.commit('changeCount',+e.target.value)
      this.changeCount(+e.target.value)
    }
  },
  computed:{
    // 通过展开运算符来将对象展开，避免以赋值方法给计算属性。
    ...mapState(['count','title'])
  }
}
</script>

<style>
#app{
  width: 600px;
  padding: 20px 20px 20px 20px;
  margin:0 auto;
  border:2px solid #ccc;
}
</style>
