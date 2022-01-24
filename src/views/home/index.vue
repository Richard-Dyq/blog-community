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
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
.home-container {
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
}
</style>
