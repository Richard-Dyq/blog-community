<template>
  <div class="article-containter">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="text" success-duration="1500" loosing-text="loosing to refresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="reach the end"
        :error.sync="error"
        error-text="error, reload"
        @load="onLoad"
        >
        <article-item v-for="(article,idx) in list" :key="idx" :article="article"></article-item>
        <!-- <van-cell v-for="(article,idx) in list" :key="idx" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/chanel'
import articleItem from './article-item.vue'
export default {
  components: { articleItem },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false,
      text: '',
      error: false
    }
  },
  methods: {
    async onRefresh () {
      try {
        const { data } = await getArticle({
          channel_id: this.article_list.id,
          timestamp: this.timestamp || Date.now()
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.text = 'successfully'
      } catch {
        this.isLoading = false
        this.text = 'error'
      }

      // setTimeout(() => {
      //   this.isLoading = false
      // }, 1000)
    },
    async onLoad () {
      try {
        const { data } = await getArticle({
          channel_id: this.article_list.id,
          timestamp: this.timestamp || Date.now()
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = results.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    }
  },
  props: {
    article_list: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.article-containter{
  padding-bottom: 100px;
  overflow-y:auto;
  height: 79vh;
}
</style>
