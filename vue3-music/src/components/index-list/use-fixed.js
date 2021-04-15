import { ref, watch, nextTick } from 'vue';

export default function useFixed(wrapperRef, props) {
  const listHeights = ref([]);
  let scrollY = ref(0);

  function calculate() {
    const list = wrapperRef.value.children;
    listHeights.value.length = 0;
    let height = 0;
    listHeights.value.push(height);

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeights.value.push(height);
    }
  }

  function onScroll(pos) {
    scrollY = -pos.y;
  }

  watch(() => props.data, async () => {
    await nextTick();
    calculate();
  })

  watch(scrollY, (val) => {

  })

  return {
    onScroll
  }
}