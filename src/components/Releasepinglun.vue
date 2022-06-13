<template>
    <!-- 评论列表 -->
    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容" v-model.trim="val">
        <van-button slot="button" size="mini" type="info" @click="fb()" :disabled="!val.length">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
</template>

<script>
import { Pinglun } from '@/api/comments.js'

export default {
  components: {},
  props: {
      id: {
          type: [Number, String, Object],
          require: true
      }
  },
  data() {
    return {
        val: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    async fb () {
        const { data } = await Pinglun({
            target: this.id, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id
            content: this.val, // 评论内容
            art_id: null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数
        })
        this.$emit('listObj', data.data)
        this.val = ''
      }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
</style>