<template>
  <div class="my-container">
    <div class="header user-info" v-if="user">
      <div class="user-banner">
        <div class="left">
            <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
            />
            <span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size='mini' round>Edit Profile</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-tem">
          <div class="count">{{userInfo.art_count}}</div>
          <div class="text">posts</div>
        </div>
        <div class="data-tem">
          <div class="count">{{userInfo.fans_count}}</div>
          <div class="text">fans</div>
        </div>
        <div class="data-tem">
          <div class="count">{{userInfo.follow_count}}</div>
          <div class="text">followers</div>
        </div>
        <div class="data-tem">
          <div class="count">{{userInfo.like_count}}</div>
          <div class="text">likes</div>
        </div>
      </div>
    </div>
    <div class="header not-login" v-else>
      <div class="loginBtn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="">
        <div class="text">Sign In</div>
      </div>
    </div>
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item text="Star" class="grid-item">
        <template #icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="History" class="grid-item">
        <template #icon>
          <i class="iconfont icon-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="Messages" is-link/>
    <van-cell title="Chat Bot" is-link class="line"/>
    <van-cell title="Log Out" class="logoutBtn" v-if="user" @click="onLogOut" clickable/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { loadUserInfo } from '@/api/login'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogOut () {
      this.$dialog.confirm({
        title: 'Log Out',
        message: 'Are you sure?',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        })
    },
    async loadUserInfo () {
      const res = await loadUserInfo()
      this.userInfo = res.data.data
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang='less'>
.my-container{
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .grid-nav{
    .grid-item{
      height: 141px;
      .iconfont{
        font-size: 45px;
      }
      .icon-shoucang{
        color: tomato;
      }
      .icon-lishi{
        color: yellowgreen;
      }
    }
  }
  .user-info{
    .user-banner{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width: 132px;
          height: 132px;
          margin-right: 20px;
          border: 4px solid white;
        }
        span{
          font-size: 30px;
          color: white;
        }
      }
    }
    .data-stats{
      display: flex;
      .data-tem{
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex:1;
        color: white;
        .count{
          font-size: 36px;
        }
        .text{
          font-size: 23px;
        }
      }
    }
  }
  .logoutBtn{
    color: red;
    text-align: center;
    margin-top: 9px;
  }
  .header{
    height: 371px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    .loginBtn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        color: #fff;
      }
    }
  }
}
</style>
