<template>
  <div class="wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        success-text="刷新成功"
        >
        <articles
            v-for="(item, index) in list"
            :key="index"
            :articled="item"
        />
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articleList } from '@/api/article'
import { Toast } from 'vant'
import articles from '@/components/articles.vue'

export default {
  components: {
      articles
  },
  props: {
    lists: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
        list: [],
        loading: false, // 加载状态
        finished: false, // 控制数据加载结束状态
        tiems: null, // 请求获取下一页数据的时间戳
        error: false, // 控制错误信息
        isLoading: false // 控制下拉刷新信息
    }
  },
  watch: {},
  computed: {},
  methods: {
    async  onLoad () {
          try {
              const { data } = await articleList({
                  channel_id: this.lists.id,
                  timestamp: this.items || Date.now()
              })
              const res = data.data.results
                // 把请求结果存放到list数组里
              this.list.push(...res)
            //   本次数据加载完成后把状态设置为结束
              this.loading = false
            //   判断数据是否全部加载完成
              if (res.length) {
                //   跟新获取下一页数据的时间戳
                  this.items = data.data.pre_timestamp
              } else {
                //   没有数据了，就把 finished 设置为 true，不再 load 加载更多
                  this.finished = true
              }
          } catch (err) {
              this.error = true
              this.loading = false
          }
    },
    async onRefresh () {
       try {
            const { data } = await articleList({
                  channel_id: this.lists.id,
                  timestamp: Date.now()
            })
            // 把跟新的数据保存到 list 数组前面
            this.list.unshift(...data.data.results)
             Toast('刷新成功')
            this.isLoading = false
       } catch (err) {
          this.$toast('刷新失败')
          this.isLoading = false
       }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.van-list{
    height: 100vh;
    overflow: auto;
}
</style>