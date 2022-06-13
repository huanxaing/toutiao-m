<template>
  <div class="wrapper">
      <van-cell icon="search" :key="index" v-for="(item, index) in arr" @click="$emit('search', item)">
          <div slot="title" v-html="xrhm(item)"></div>
      </van-cell>
  </div>
</template>

<script>
import { getSearchSu } from '@/api/search'
import { debounce } from 'lodash'

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
        arr: []
    }
  },
  watch: {
    value: {
        // debounce 函数：
        // 参数1：一个函数
        // 参数2：延迟时间
        // 参数3：防抖之后的函数
        handler: debounce(function (val) {
            this.sa(val)
        }, 200),
        // 该回调将会在侦听开始之后被立即调用
        immediate: true
      }
  },
  computed: {},
  methods: {
    async sa (q) {
        const { data } = await getSearchSu(q)
        this.arr = data.data.options
        if (this.arr[0] == null) {
            this.arr = ['没有更多了']
        }
    },
    xrhm (text) {
    const str = `<span class="sd">${this.value}</span>`
    // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
    // 如果需要根据数据变量动态的创建正则表达式，则手动new RegExp
    // RegExp正则表达式构造函数
    //  参数1:匹配模式字符串，它会根据这个字符串创建正则对象
    //  参数2:匹配模式，要写到字符串中
     const reg = new RegExp(this.value, 'gi')
     return text.replace(reg, str)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper{
    /deep/ .sd{
        color: red;
    }
}
</style>