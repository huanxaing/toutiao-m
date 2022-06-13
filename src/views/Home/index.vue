<template>
  <div class="wrapper">
    <keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
      <van-tabbar class="va-tabber" route>
        <van-tabbar-item to="/shouye">
            <i slot="icon" class="toutiao toutiao-shouye"></i>
            <div class="tex">
                首页
            </div>
        </van-tabbar-item>
        <van-tabbar-item to="/wenda">
            <i slot="icon" class="toutiao toutiao-wenda"></i>
            <div class="tex">
                问答
            </div>
        </van-tabbar-item>
        <van-tabbar-item to="/shipin">
             <i slot="icon" class="toutiao toutiao-shipin"></i>
            <div class="tex">
                视频
            </div>
        </van-tabbar-item>
        <van-tabbar-item to="/wode">
             <i slot="icon" class="toutiao toutiao-wode"></i>
            <div class="tex">
                我的
            </div>
        </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
    .va-tabber{
        i.toutiao{
            font-size: 40px;
        }
        .tex{
            font-size: 20px;
        }
    }
</style>