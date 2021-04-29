<template>
  <div class="singer">
    <index-list :data="singers" @select="handleSelectItem"></index-list>
    <!--  <router-view> can no longer be used directly inside <transition> or <keep-alive>. Use slot props instead: -->
    <!-- 3.0对路由组件进行动画设定新写法 -->
    <router-view :singer="selectedSinger" v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { getSingerList } from '@/service/singer'
  import IndexList from '@/components/index-list/index-list.vue'
  import storage from 'good-storage'
  import { SINGER_KEY } from '@/assets/js/constant'

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
        this.cacheSinger(item);
        this.$router.push({
          path: `/singer/${item.mid}`
        })
      },
      cacheSinger(singer) {
        storage.session.set(SINGER_KEY, singer);
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
