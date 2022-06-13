<template>
    <div class="wrapper">
        <!-- 顶部搜索框 -->
        <form class="dibu" action="/">
            <van-search
                class="sousk"
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                background="#3d9cfb"
                @search="onSearch"
                @cancel="onCancel"
                @focus='flg = false'
            />
        </form>
        <!-- 搜索结果 -->
        <search-results v-if="flg" :value="value" />
        <!-- 联想建议 -->
        <search-suggestions v-else-if="value" :value="value" @search="onSearch" />
        <!-- 搜索历史 -->
        <search-history v-else :num="num"/>
    </div>
</template>

<script>
import searchHistory from './components/search-history.vue'
import searchSuggestions from './components/search-suggestions.vue'
import searchResults from './components/search-results.vue'
// import { setItem } from '@/utils/storage'

export default {
  components: {
      searchHistory,
      searchSuggestions,
      searchResults
  },
  props: {},
  data() {
    return {
        value: '',
        flg: false,
        num: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    onSearch(val) {
        this.value = val
        // 存储搜索历史记录
        // 不要有重复历史记录、最新的排在最前面
        const index = this.num.indexOf(val)
        if (index !== -1) {
            this.num.splice(index, 1)
        }
        this.num.unshift(val)
        // setItem('histories', this.num.unshift(val))
        this.flg = true
    },
    onCancel() {
      this.$router.back()
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper{
    padding-top: 60px;
    .dibu{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100%;
        .sousk{
        height: 120px;
        .van-search__action{
            color: white;
        }
    }
    }
}
</style>