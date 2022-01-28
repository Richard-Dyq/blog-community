<template>
  <div class='home-container'>
    <van-nav-bar class="nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        @click="$router.push('search')"
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="tabs">
      <van-tab :title="item.name" v-for="item in chanelList" :key="item.id">
        <article-list :article_list="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="showPopup">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup close-icon-position="top-left" closeable v-model="show" position="bottom" :style="{ height: '100%' }">
      <popup-item :channels="chanelList" :active="active" @update="updateList" @m-change="M_change"></popup-item>
    </van-popup>
  </div>
</template>

<script>
import { getUserChanelList } from '@/api/chanel'
import articleList from './components/article-list.vue'
import PopupItem from './components/popupItem.vue'
export default {
  components: { articleList, PopupItem },
  data () {
    return {
      chanelList: [],
      active: 0,
      show: false
    }
  },

  methods: {
    M_change (index, show = true) {
      this.active = index
      this.show = show
    },
    updateList (list) {
      this.chanelList = list
    },
    showPopup () {
      this.show = true
    },
    async getList () {
      const { data: { data: { channels } } } = await getUserChanelList()
      this.chanelList = channels
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang='less'>
.home-container {
  .nav-bar{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
  }
  padding-top: 174px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    color: white;
    line-height: 64px;
    width: 555px;
    height: 64px;
    background-color: #bbdbbecc;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  .tabs{
    .van-tab{
      min-width: 200px;
      border-right: 1px solid #f4f4f4;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .van-tabs__wrap{
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
  .van-tabs__nav--line{
    padding-bottom: 0;
    .van-tabs__line{
      bottom: 8px;
      width: 40px;
      background-color:yellowgreen
    }
  }

}
</style>
