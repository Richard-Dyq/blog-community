<template>
  <div class="searchContainer">
    <van-search
    :value="value"
    placeholder="请输入搜索关键词"
    show-action
    bind:search="onSearch"
    bind:cancel="onCancel"
  />
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {

    }
  }
}
</script>

<style>

</style>
