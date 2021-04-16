import { ref, watch, nextTick, computed } from 'vue';

export default function useFixed(wrapperRef, props) {
  const TITLE_HEIGHT = 30;

  const listHeights = ref([]);
  const scrollY = ref(0);
  const archorIndex = ref(0);
  const distance = ref(0);

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
    scrollY.value = -pos.y;
  }

  watch(() => props.data, async () => {
    await nextTick();
    calculate();
  })

  watch(scrollY, (val) => {
    for (let i = 0; i < listHeights.value.length - 1; i++) {
      const prev = listHeights.value[i];
      const next = listHeights.value[i + 1];
      if (prev < val && next > val) {
        archorIndex.value = i;
        distance.value = next - val;
        break;
      }
    }
  })

  const fixedTitle = computed(() => {
    if (scrollY.value <= 0) {
      return '';
    }
    const currentGroup = props.data[archorIndex.value];
    return currentGroup ? currentGroup.title : '';
  })

  const fixedStyle = computed(() => {
    let diff = 0;

    if (distance.value > 0 && distance.value < TITLE_HEIGHT) {
      diff = distance.value - TITLE_HEIGHT;
    }

    return {
      transform: `translate3d(0, ${diff}px, 0)`
    }
  })

  return {
    onScroll,
    archorIndex,
    fixedTitle,
    fixedStyle
  }
}