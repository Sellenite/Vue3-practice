<template>
  <div class="singer">
    <index-list :data="singers" @select="handleSelectItem"></index-list>
    <router-view :singer="selectedSinger"></router-view>
  </div>
</template>

<script>
  import { getSingerList } from '@/service/singer'
  import IndexList from '@/components/index-list/index-list.vue'

  export default {
    name: 'singer',
    components: {
      IndexList
    },
    data() {
      return {
        singers: [],
        selectedSinger: {}
      }
    },
    async created() {
      const result = await getSingerList();
      this.singers = result.singers;
    },
    methods: {
      handleSelectItem(item) {
        this.selectedSinger = item;
        this.$router.push({
          path: `/singer/${item.mid}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
