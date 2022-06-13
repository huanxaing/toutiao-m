<template>
  <van-button
    class="follow-btn"
    round
    size="small"
    v-if="value"
    @click="gz()"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    :loading="loading"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-else
    @click="gz()"
    >关注</van-button
  >
</template>

<script>
import { FocusUser, DelUser } from '@/api/user'

export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      require: true
    },
    autid: {
      type: [Number, String, Object],
      require: true
    }
  },
  data() {
    return {
        loading: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    async gz() {
      this.loading = true
      try {
        if (this.value) {
          await DelUser(this.autid)
        } else {
          await FocusUser(this.autid)
        }
        // this.arr.is_followed = !this.arr.is_followed
        this.$emit('input', !this.value)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast('用户不能自己关注自己')
        } else {
          this.$toast('操作失败！请重试')
        }
      }
      this.loading = false
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
</style>