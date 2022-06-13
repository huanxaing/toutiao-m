<template>
  <van-icon
        :class="{sd : value}"
        :name="value ? 'star' : 'star-o'"
        @click="sa"
      />
</template>

<script>
import { collectArticle, DelcollectArticle } from '@/api/user'

export default {
  components: {},
  props: {
      value: {
          type: Boolean,
          require: true
      },
      id: {
          type: [Number, String, Object],
          require: true
      }
  },
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    async sa () {
       if (this.value) {
           await DelcollectArticle(this.id)
       } else {
            await collectArticle(this.id)
       }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.sd{
    color: red;
}
</style>