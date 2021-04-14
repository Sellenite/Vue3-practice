<template>
  <div class="recommend">
    recommend
  </div>
</template>

<script>
import { getRecommend } from '@/service/recommend.js';

export default {
  name: 'Recommend',
  async created() {
    const result = await getRecommend();
    console.log(result);
  }
}
</script>
