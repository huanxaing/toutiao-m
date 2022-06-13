<template>
  <div class="wrapper">
    <van-nav-bar class="dao-han" title="登录" />
    <van-form ref='loginFrom' @submit="onSubmit">
      <van-field
        v-model="dl.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="rulesFrom.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji" style="font-size:.586rem;"></i>
      </van-field>
      <van-field
        v-model="dl.code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="rulesFrom.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma" style="font-size:25px;"></i>
        <template #button>
          <van-count-down v-if='flg' :time="60 * 1000" format='ss s' @finish='onFinish'/>
          <van-button v-else round class="login-but" native-type="button" size="small" type="primary" @click="onCode">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button  block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, dxCode } from '@/api/user'

export default {
  components: {},
  props: {},
  data() {
    return {
      flg: false,
      dl: {
        mobile: '13911111111',
        code: '246810'
      },
      rulesFrom: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            pattern: /1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码'
          },
          {
            pattern: /\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onSubmit() {
      const users = this.dl
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(users)
        console.log(res)
        this.$toast.success('登录成功')
        this.flg = false
        this.$store.commit('qh')
        this.$router.push('/wode')
        this.$store.commit('suToken', res.data.data)
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    },
    async onCode () {
     try {
       await this.$refs.loginFrom.validate('mobile')
     } catch (err) {
      return console.log('验证失败', err)
     }
     this.flg = true
    try {
      const { data } = await dxCode(this.dl.mobile)
      console.log(data)
      this.$toast('发送成功')
    } catch (err) {
      this.flg = false
      if (err.response.status === 429) {
        this.$toast('发送太频繁，请稍后重试')
      } else {
        this.$toast('发送失败')
      }
    }
    },
    onFinish () {
      this.flg = false
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.login-but{
  background-color: #edeced;
  border: 0;
  color: #838383;
  width: 168px;
}
</style>