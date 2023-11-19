<script setup>
  // reactive：接收一个对象类型数据，返回一个响应式的对象
  // 问题：如果是简单类型，该怎么做响应式呢？
  // ref函数:接收简单类型或复杂数据类型，并返回一个响应式的对象
  //  ref本质：在原有传入数据的基础上，外层包了一层对象，包成了复杂数据类型
  //  底层：包成复杂类型之后，再借助reactive实现的响应式
  //  注意点：
        // 1.脚本中访问数据，需要通过 .value
        // 2.在template中访问，.value不需要加（帮我们扒了一层）

  // 1.导入
  // import {reactive} from 'vue'
  import {ref} from 'vue'

  // 2.执行函数，传入参数，创建变量接收
  // const state = reactive({
  //   count:100
  // })

  const count = ref(0)
  console.log(count)

  const setCount = ()=>{
    // state.count++
    count.value++
  }
</script>

<template>
  <div>
    {{ count}}
  </div>
  <button @click="setCount">+1</button>
</template>