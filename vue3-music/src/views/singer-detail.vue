<template>
  <div class="singer-detail">
    <music-list :songs="songs" title="歌手详情" :pic="songs[0] && songs[0].pic"></music-list>
  </div>
</template>

<script>
  import MusicList from '@/components/music-list/music-list.vue';
  import { getSingerDetail } from '@/service/singer.js';
  import { processSongs } from '@/service/song.js';
  import storage from 'good-storage';
  import { SINGER_KEY } from '@/assets/js/constant';

  export default {
    name: 'singer-detail',
    props: {
      singer: Object
    },
    data() {
      return {
        songs: []
      }
    },
    components: {
      MusicList
    },
    computed: {
      computedSinger() {
        let ret = null;
        if (this.singer.mid) {
          ret = this.singer;
        } else {
          const cache = storage.session.get(SINGER_KEY);
          if (cache && cache.mid === this.$route.params.mid) {
            ret = cache;
          }
        }
        return ret;
      }
    },
    async created() {
      if (!this.computedSinger) {
        // 找到一级路由
        const path = this.$route.matched[0].path;
        this.$router.push({
          path
        });
        return
      }
      const result = await getSingerDetail(this.computedSinger);
      this.songs = await processSongs(result.songs);
    }
  }
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
