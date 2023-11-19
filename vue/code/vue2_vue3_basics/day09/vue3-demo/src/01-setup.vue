<!-- 加上setup允许在script中直接编写组合式API -->
<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script> -->

<!-- 不再要求唯一根元素了 -->
<!-- <template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template> -->

<!-- <style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->


<!-- <script>
  export default{
    // setup
    // 1.执行时机，比beforeCreate还要早
    // 2.setup函数中，获取不到this(this是undefined)
    // 3.数据 和 函数 ，需要在 setup 最后return，才能在模板中应用
    // 问题：每次使用数据都得return一下，好麻烦
    // 4.可以通过setup的语法糖简化代码
    setup(){
      // 数据 
      const message = 'hello vue3!'
      // 函数
      const logMessage = ()=> {console.log(message)}

      return {
        message,
        logMessage
      }
    },
    beforeCreate(){
      console.log('beforeCreate函数')
    }
  }
</script> -->

<!-- setup语法糖 -->
<script setup>
  // 数据 
  const message = 'hello vue3!'
  // 函数
  const logMessage = ()=> {console.log(message)}
</script>

<template>
  <div>{{message}}</div>
  <button @click="logMessage">按钮</button>
</template>