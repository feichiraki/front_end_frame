<script setup>
import {ref,watch} from 'vue'
const count = ref(0)
const name = ref('张三')

const changeNum = ()=>{
  count.value++
}

const changeName = () =>{
  name.value = '李四'
}

// 1.侦听单个数据
// watch(ref对象,(newValue,oldValue)=>{...})
// watch(count,(newValue,oldValue)=>{
//   console.log(newValue,oldValue)
// })

// 2.侦听多个数据
// watch([count,name],(newArr,oldArr)=>{
//   console.log(newArr,oldArr)
// })

// 3.immediate 立即执行(一进页面)
// watch(count,(newValue,oldValue)=>{
//   console.log(newValue,oldValue)
// },{
//   immediate:true
// })

// -----------------------------------------------
// 4.deep深度监视 默认watch进行的是浅层监视
// const ref1 = ref(简单数据类型) 可以直接监视
// const ref2 = ref(复杂数据类型) 监视不到复杂类型内部数据的变化
const UserInfo = ref({
  name:'zs',
  age:18
})

const setUserInfo = ()=>{
  // 修改了UserInfo.value 修改了对象的地址，才能监视得到
  // UserInfo.value = {name:'ls',age:30}

  UserInfo.value.age++
}

// watch(UserInfo,(newValue)=>{
//   console.log(newValue)
// },{
//   deep:true
// })


// 5. 对象中属性，精确侦听具体某个属性
watch(()=>UserInfo.value.age,(newValue,oldValue) =>{
  console.log(newValue,oldValue)
})

</script>

<template>
<div>{{ count }}</div>
<button type="button" @click="changeNum">修改数字</button>
<div>{{ name }}</div>
<button type="button" @click="changeName">修改名称</button>
<div>-----------------------------------------------</div>
<div>{{ UserInfo }}</div>
<button @click="setUserInfo">修改UserInfo</button>
</template>