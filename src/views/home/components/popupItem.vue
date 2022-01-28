<template>
  <div class="channel-edit">
    <van-cell title="My channels" :border="false" class="title">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit=!isEdit"
      >{{isEdit? 'finish':'edit'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="m-grid">
      <van-grid-item
        class="channel-item"
        v-for="(item,index) in channels"
        :key="index"
        @click="onMyChanelsChange(index,item)"
      >
        <van-icon slot="icon" v-show = "isEdit && item.name !=='推荐'" class="clear-icon" name="clear"></van-icon>
        <span slot="text" class="text" :class="{active: active===index}">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell class="title" title="Recommand" :border="false"></van-cell>
    <van-grid :gutter="10" class="r-grid">
      <van-grid-item
        class="channel-item"
        v-for="item in recommand"
        :key="item.id"
        :text="item.name"
        icon="plus"
        @click="onAddChanels(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChanelList, updateUserChanel, deleteUserChanel } from '@/api/chanel'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChanels: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']),
    recommand () {
      return this.allChanels.filter(chanel => {
        return this.channels.findIndex(userItem => {
          return userItem.id === chanel.id
        }) === -1
      })
    }
  },
  watch: {},
  created () {
    this.getAllChanels()
  },
  mounted () {},
  methods: {
    async onMyChanelsChange (item, chanel) {
      if (!this.isEdit) {
        this.$emit('m-change', item, false)
      } else {
        if (item === 0) {
          return
        }
        if (item <= this.active) {
          this.$emit('m-change', item - 1)
        }
        const list = [...this.channels]
        list.splice(item, 1)
        this.$emit('update', list)
        if (this.user) {
          try {
            await deleteUserChanel(chanel.id)
          } catch (error) {
            this.$toast('操作失败')
          }
        }
      }
    },
    async onAddChanels (chanel) {
      const lists = [...this.channels]
      lists.push(chanel)
      this.$emit('update', lists)
      if (this.user) {
        try {
          await updateUserChanel({
            id: chanel.id,
            seq: lists.length
          })
          this.$toast('成功')
        } catch (error) {
          this.$toast(error)
        }
      }
    },
    async getAllChanels () {
      try {
        const { data } = await getChanelList()
        this.allChanels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title{
    font-size: 48px;
    margin-bottom: 30px;
  }
  /deep/ .m-grid{
    .van-grid-item__icon-wrapper{
      position: unset;
    }

    .van-grid-item__content{
      padding: 0;
    }
    .van-grid-item__text{
        margin-top: 0;
        white-space: nowrap;
      }
    .van-icon-clear{
      position: absolute;
      right: -5px;
      font-size: 12px;
      z-index: 2;
      top: -5px;
    }
  }
  /deep/ .r-grid{
    .van-grid-item__content{
      padding: 0;
      flex-direction: row;
      .van-grid-item__text{
        margin-top: 0;
        white-space: nowrap;
      }
      .van-icon-plus{
        font-size: 20px;
      }
    }
  }
  .channel-item {
    height: 86px;
    .active{
      color: red;
    }
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 12px;
      }
    }
  }
}
</style>
