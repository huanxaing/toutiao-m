<template>
  <div class="wrapper">
    <van-nav-bar class="dao-han" fixed>
      <van-button @click="sous" type="info" class="sous" slot="title" icon="search" size="small" round>搜索</van-button>
    </van-nav-bar>
    <van-tabs class="daoh" v-model="active" animated swipeable>
      <van-tab :title="item.name" :key="item.id" v-for="item in arr">
        <userList :lists='item'></userList>
      </van-tab>
      <div slot="nav-right" class="zwf"></div>
      <div slot="nav-right" class="tt" @click="show = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
      <van-popup v-model="show"
       closeable
       close-icon-position="top-left"
       position="bottom"
       :style="{ height: '100%' }" >
          <channelEditor :arrChannerl='arr' :active='active'  @qh-pd="qh"></channelEditor>
       </van-popup>
  </div>
</template>

<script>
import { getUserList } from '@/api/user.js'
import userList from './usersList.vue'
import channelEditor from '@/components/channel-editor.vue'
import store from '@/store/index.js'
import { getItem } from '@/utils/storage'

export default {
  components: {
    userList,
    channelEditor
  },
  props: {},
  data() {
    return {
      active: store.state.active,
      arr: [],
      show: false
    }
  },
  watch: {
  },
  computed: {},
  methods: {
    sous () {
      this.$router.push('/search')
    },
    async sa () {
      try {
        const getIte = getItem('toutiao-list')
        if (store.state.flg) {
            // 未登录，将数据保存到本地
            if (getIte) {
              this.arr = getIte
            } else {
              const { data } = await getUserList()
             this.arr = data.data.channels
            }
        } else {
                // 已登录，将数据发到服务器上
          const { data } = await getUserList()
          this.arr = data.data.channels
        }
      } catch (err) {
         this.$toast.fail('获取数据失败，请稍后重试')
      }
    },
    qh (i, show = true) {
      this.active = i
      this.show = show
    }
  },
  created() {
    this.sa()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
  .wrapper{
    padding-bottom: 80px;
    padding-top: 90px;
    /deep/ .van-nav-bar__title {
      max-width: unset !important;
    }
    .sous{
      width: 550px;
      height: 64px;
      font-size: 28px;
      background: #76a4ff;
      border: 0;
      .van-icon{
        color:white !important;
        font-size: 32px;
      }
    }
    // /deep/ 选择器是chrome浏览器自己的标准，其他浏览器并没有实现这个标准，所以其他浏览器是失效的。
    /deep/ .daoh{
                .van-tabs__wrap{
                    position: fixed;
                    z-index: 1;
                    top: 92px;
                    left: 0;
                    right: 0;
                  }
                .van-tab{
                  border-right: 1px solid #dedede;
                  width: 30%;
                }
                .van-tab--active{
                  color: black;
                }
                .zwf{
                  flex-shrink: 0;
                  width: 82px;
                }
                .tt{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 82px;
                  flex-shrink: 0;
                  background: white;
                  opacity: 0.902;
                  position: fixed;
                  right: 0;
                  height: 82px;
                  .toutiao{
                    font-size: 40px;
                  }
                }
    }
  }
</style>