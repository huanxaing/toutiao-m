<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <pinglunList v-for="(item, index) in list" :key="index" :obj='item' />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comments'
import pinglunList from '@/components/pinglunList.vue'

export default {
  components: {
      pinglunList
  },
  props: {
      id: {
          type: [Number, String, Object],
          require: true
      },
      list: {
          type: Array,
          default: () => []
      }
  },
  data() {
    return {
        // list: [],
        loading: false,
        finished: false,
        offset: null, // 获取下一页数据
        limit: 10
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad() {
         const { data } = await getComments({
             type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
             source: this.id, // 源id，文章id或评论id
             offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
             limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
         })
         const res = data.data.results
         // 将数据添加到列表当中
         this.list.push(...res)
         // 把文章评论总数发送出去
         this.$emit('pinglunNum', data.data)
         // 停止加载
         this.loading = false
         // 判断是否有数据
         if (res.length) {
            // 更新下一页数据
            this.offset = data.data.last_id
         } else {
            // 显示没有更多
            this.finished = true
         }
    }
  },
  created() {
      this.onLoad()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
</style>