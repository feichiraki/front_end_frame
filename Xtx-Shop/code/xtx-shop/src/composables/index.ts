import { ref } from 'vue'
import type { XtxGuessInstance } from '@/types/component'

export function useGuessList() {
  // 猜你喜欢
  const guessRef = ref<XtxGuessInstance>()
  // 下拉刷新列表
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }
  // 返回封装ref和事件处理函数
  return {
    guessRef,
    onScrolltolower,
  }
}
