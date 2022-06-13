<template>
    <div class="article-comments">
        <h3>api缺失，暂未开发</h3>
  </div>
</template>

<script>

export default {
  components: {},
  props: {},
  data() {
    return {
        offset: null, // 获取下一页数据
        limit: 10
    }
  },
  watch: {},
  computed: {},
  methods: {
  },
  created() {
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.article-comments{
    padding-bottom: 87px;
    height: 600px;
    h3{
        text-align: center;
        line-height: 600px;
        color: red;
    }
}
</style>