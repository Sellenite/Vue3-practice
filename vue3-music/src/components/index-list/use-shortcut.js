import { computed } from 'vue';

export default function useShortcut(groupRef, scrollRef, props) {
  const touches = {};
  const ARCHOR_HEIGHT = 18;

  const shortcutList = computed(() => {
    return props.data.map(item => {
      return item.title;
    })
  })

  function onShortcutTouchStart(e) {
    const archorIndex = parseInt(e.target.dataset.index);
    touches.yStart = e.touches[0].pageY;
    touches.archorIndex = archorIndex;
    scrollTo(archorIndex);
  }

  function onShortcutTouchMove(e) {
    touches.yEnd = e.touches[0].pageY;
    const delta = Math.floor((touches.yEnd - touches.yStart) / ARCHOR_HEIGHT);
    const archorIndex = touches.archorIndex + delta;
    scrollTo(archorIndex);
  }

  function scrollTo(index) {
    // 边界问题
    if (Number.isNaN(index)) {
      return
    }
    index = Math.max(Math.min(shortcutList.value.length - 1, index), 0);
    const targetElement = groupRef.value.children[index];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetElement, 0);
  }

  return {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}