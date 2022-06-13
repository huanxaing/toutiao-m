<template>
    <van-icon
        color="#777"
        :name="value === 1 ? 'good-job' : 'good-job-o'"
        :class="{sd : value === 1}"
        @click="sa"
      />
</template>

<script>
import { DeldianzanArticle, dianzanArticle } from '@/api/user'

export default {
  components: {},
  props: {
       value: {
          type: Number,
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
        let num = -1
          if (this.value === 1) {
              await DeldianzanArticle(this.id)
          } else {
              num = 1
              await dianzanArticle(this.id)
          }
          this.$emit('input', num)
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