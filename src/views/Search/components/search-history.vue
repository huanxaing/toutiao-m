<template>
  <div class="wrapper">
      <van-cell title="搜索历史" class="title">
          <div v-if="flg">
            <span @click="del()">全部删除</span>&nbsp;&nbsp;
            <span @click="flg = !flg">完成</span>
          </div>
          <van-icon name="delete-o" v-else @click="flg = !flg"/>
      </van-cell>
      <van-cell class="title1" :key="index" v-for="(item, index) in arr">
        <van-icon name="close"  v-if="flg" @click="dels(index)"/>
        <div slot="title">{{item}}</div>
      </van-cell>
  </div>
</template>

<script>
import { getItem, setItem, removeItem } from '@/utils/storage'

export default {
  components: {},
  props: {
      num: {
          type: Array,
          require: true
      }
  },
  data() {
    return {
        flg: false,
        arr: getItem('histories')
    }
  },
  watch: {
      num: {
          handler (val) {
              console.log(val)
              setItem('histories', val)
          },
          immediate: true
      }
  },
  computed: {},
  methods: {
      del () {
            this.$router.go(0)
            removeItem('histories')
        },
      dels (i) {
          this.arr.splice(i, 1)
      }
  },
  created() {
      this.arr = this.num || getItem('histories')
    //   setItem('histories', this.arr)
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
</style>