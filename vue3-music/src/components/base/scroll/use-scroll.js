import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

// 开启对 content 以及 content 子元素 DOM 改变的探测。当插件被使用后，当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法
BScroll.use(ObserveDOM);

export default function useScroll(wrapperRef, options) {
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return scroll
}
