<template>
  <div class="loginPage">
    <van-nav-bar class="nav-bar" title="Login">
    <template #left>
      <i class="iconfont icon-guanbi" @click="$router.back()"></i>
    </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
  <van-field
    name="PhoneNumber"
    placeholder="Please enter phone number"
    v-model="userInfo.mobile"
    :rules="userFormRules.mobile"
    type="number"
    maxlength="11"
  >
  <template #left-icon>
    <i class="iconfont icon-shouji"></i>
  </template>
  </van-field>
  <van-field
    name="Password"
    placeholder="Please enter verification code"
    v-model="userInfo.code"
    :rules="userFormRules.code"
  >
  <template #left-icon>
    <i class="iconfont icon-yanzhengma"></i>
  </template>
   <template #button>
    <van-count-down :time="60*1000" v-if="isCountDownShow" @finish="isCountDownShow=false" format="ss s"/>
    <van-button v-else @click="onSendMsg" class="m-verify-btn" round block type="info" native-type="button">Send</van-button>
  </template>
  </van-field>
  <div style="margin: 16px;">
    <van-button class="btn" block type="info" native-type="submit">Login</van-button>
  </div>
  </van-form>
  </div>
</template>

<script>
import { login, sendMsg } from '@/api/login.js'
import { mapMutations } from 'vuex'
export default {
  name: 'loginPage',
  data () {
    return {
      userInfo: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false,
      userFormRules: {
        mobile: [{
          required: true,
          message: '不能为空'
        },
        {
          pattern: /1\d{10}/,
          message: '电话号码至少为11位'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }
        ]
      },
      count: 60
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSendMsg () {
      try {
        await this.$refs.loginForm.validate('PhoneNumber')
      } catch (err) {
        return console.log(err)
      }
      this.isCountDownShow = true
      try {
        await sendMsg(this.userInfo.mobile)
        this.$toast('send successfully')
      } catch (err) {
        this.isCountDownShow = false
        console.log(err)
        if (err.response.status === 429) {
          this.$toast('try 60 seconds later')
        } else {
          this.$toast('error')
        }
      }
    },
    async onSubmit () {
      this.$toast.loading({
        message: 'loading...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.userInfo)
        console.log(res)
        this.setUser(res.data.data)
        this.$toast.success('登陆成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('验证码错误')
        } else {
          this.$toast.fail('请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less">
.loginPage{
  .iconfont{
    font-size: 37px;
  }
  .m-verify-btn{
    width: 160px;
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    padding: 0;
    background-color: #ededed;
    color: #666;
    border: 0;

  }
  [name=Password].van-field__control{
    border-right: 1px solid #ededed;
  }
}
</style>
