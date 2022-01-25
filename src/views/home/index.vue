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
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="tabs">
      <van-tab :title="item.name" v-for="item in chanelList" :key="item.id">
        <article-list :article_list="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getChanelList } from '@/api/chanel'
import articleList from './components/article-list.vue'
export default {
  components: { articleList },
  data () {
    return {
      chanelList: [],
      active: 0
    }
  },

  methods: {
    async getList () {
      const { data: { data: { channels } } } = await getChanelList()
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
