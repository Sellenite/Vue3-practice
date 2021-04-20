<template>
  <div class="singer-detail">
    <music-list :songs="songs" title="歌手详情" :pic="songs[0] && songs[0].pic"></music-list>
  </div>
</template>

<script>
  import MusicList from '@/components/music-list/music-list.vue';
  import { getSingerDetail } from '@/service/singer.js';
  import { processSongs } from '@/service/song.js';
  export default {
    name: 'singer-detail',
    props: {
      singer: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        songs: []
      }
    },
    components: {
      MusicList
    },
    async created() {
      const result = await getSingerDetail(this.singer);
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
