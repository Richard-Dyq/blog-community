<template>
<div>
  <router-view/>
  <van-tabbar route>
  <van-tabbar-item name="home" to="/">
    <template #icon>
      <i class="iconfont icon-shouye"></i>
    </template>
    Home
  </van-tabbar-item>
  <van-tabbar-item name="qa" to="/qa">
    <template #icon>
      <i class="iconfont icon-wenda"></i>
    </template>
    Search
  </van-tabbar-item>
  <van-tabbar-item name="vedio" to="/vedio">
    <template #icon>
      <i class="iconfont icon-shipin"></i>
    </template>
    Vedio</van-tabbar-item>
  <van-tabbar-item name="profile" to="/my">
    <template #icon>
      <i class="iconfont icon-wode"></i>
    </template>
    {{$router.user ? 'Sign in': 'Profile'}}</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
