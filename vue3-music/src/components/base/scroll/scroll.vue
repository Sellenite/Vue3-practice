<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import useScroll from './use-scroll'
  import { ref } from 'vue'

  export default {
    name: 'scroll',
    props: {
      click: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 0
      }
    },
    setup(props) {
      // 这里的props是组件内props定义的属性，即{ click, probeType }
      const rootRef = ref(null)
      const scroll = useScroll(rootRef, props)

      return {
        rootRef,
        scroll
      }
    }
  }
</script>
