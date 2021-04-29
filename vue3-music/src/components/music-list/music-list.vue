<template>
  <div class="music-list">
    <div
      class="back"
      @click="goBack"
    >
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div
      class="bg-image"
      :style="bgImageStyle"
      ref="bgImage"
    >
      <div
        class="play-btn-wrapper"
        :style="playBtnStyle"
      >
        <div
          v-show="songs.length > 0"
          class="play-btn"
        >
          <i class="icon-play"></i>
          <span class="text" @click="handleClickRandom">随机播放全部</span>
        </div>
      </div>
      <div
        class="filter"
        :style="filterStyle"
      ></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          @select="selectItem"
          :rank="rank"
        ></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
  import SongList from '@/components/base/song-list/song-list'
  import Scroll from '@/components/base/scroll/scroll'
  import { mapActions } from 'vuex'

  const RESERVED_HEIGHT = 40; // 标题栏的那个高度

  export default {
    name: 'music-list',
    components: {
      SongList,
      Scroll
    },
    props: {
      songs: {
        type: Array,
        default() {
          return []
        }
      },
      title: String,
      pic: String,
      loading: Boolean,
      noResultText: {
        type: String,
        default: '抱歉，没有找到可播放的歌曲'
      },
      rank: Boolean
    },
    data() {
      return {
        imageHeight: 0,
        scrollY: 0,
        maxTranslateY: 0 // 向上滑动最大的距离，超出这个距离就会消除一些动效等，用作分界线处理
      }
    },
    computed: {
      scrollStyle() {
        const bottom = '0'
        return {
          top: `${this.imageHeight}px`,
          bottom
        }
      },
      bgImageStyle() {
        let zIndex = 0;
        let paddingTop = '70%';
        let height = 0;
        // 在iPhone里，当滚动的物件有transform的情况下，使用zIndex去决定高度的时候，会优先有translateZ作为层级高，为了兼容这个，translateZ也要设置
        let translateZ = 0;
        let scale = 1;
        // 上拉遮罩
        if (this.scrollY > this.maxTranslateY) {
          zIndex = 10;
          height = RESERVED_HEIGHT + 'px';
          paddingTop = 0;
          translateZ = 10;
        }

        // 下拉缩放
        if (this.scrollY < 0) {
          scale = 1 + Math.abs(this.scrollY / this.imageHeight);
        }

        return {
          zIndex,
          paddingTop,
          height,
          transform: `scale(${scale}) translateZ(${translateZ}px)`,
          backgroundImage: `url(${this.pic})`
        }
      },
      filterStyle() {
        let blur = 0;
        // 上滑的时候才进行模糊
        if (this.scrollY > 0) {
          // 两个高度相除得出比例再乘以一个系数
          blur = Math.min(this.maxTranslateY / this.imageHeight, this.scrollY / this.imageHeight) * 20;
        }
        return {
          backdropFilter: `blur(${blur}px)`
        }
      },
      playBtnStyle() {
        let display = '';
        if (this.scrollY > this.maxTranslateY) {
          display = 'none';
        }

        return {
          display
        }
      }
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
    },
    methods: {
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ]),
      goBack() {
        this.$router.back()
      },
      onScroll(pos) {
        this.scrollY = -pos.y;
      },
      selectItem({ song, index }) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      handleClickRandom() {
        this.randomPlay({
          list: this.songs
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-wrapper {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>
