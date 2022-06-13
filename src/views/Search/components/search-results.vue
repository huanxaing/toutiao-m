<template>
    <div class="wrapper">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
        </van-list>
    </div>
</template>

<script>
import { getSearchRes } from '@/api/search'

export default {
  components: {},
  props: {
      value: {
          type: String,
          require: true
      }
  },
  data() {
    return {
        list: [],
        loading: false,
        finished: false,
        num: 1,
        per_page: 20
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad() {
      const { data } = await getSearchRes({
          page: this.num,
          per_page: this.per_page,
          q: this.value
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
    //   判断是否还有数据
      if (results.length) {
        //   如果有就更新下一页
          this.num++
      } else {
        //   如果没有就将加载状态 设置为结束
          this.finished = true
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
</style>