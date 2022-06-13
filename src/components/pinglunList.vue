<template>
      <div class="article-comments">
    <!-- 评论列表 -->
       <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="obj.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ obj.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ obj.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{ obj.pubdate | relativeTime }}</span>
            <van-button size="mini" type="default" @click="hf(obj)">回复{{ obj.reply_count === 0 ? '' : obj.reply_count }}</van-button>
          </p>
        </div>
        <van-icon @click="dz" slot="right-icon" :name="obj.is_liking ? 'like' : 'like-o'" :class="{sd : obj.is_liking}"/>
        </van-cell>
        <van-popup v-model="isShow" position="bottom" style="z-index:99;">
            <pinglunHf />
        </van-popup>
  </div>
</template>

<script>
import { Deldianzan, getdianzan } from '@/api/comments.js'
import pinglunHf from './pinglunHf.vue'

export default {
  components: {
      pinglunHf
  },
  props: {
      obj: {
          type: Object,
          require: true
      }
  },
  data() {
    return {
        isShow: false
    }
  },
  watch: {},
  computed: {},
  methods: {
      async dz () {
          if (this.obj.is_liking) {
               await Deldianzan(this.obj.com_id)
          } else {
              await getdianzan(this.obj.com_id)
          }
          this.obj.is_liking = !this.obj.is_liking
      },
      hf (obj) {
          console.log(obj)
          this.$store.commit('ids', obj.aut_id)
          this.isShow = true
      }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.sd{
    color: red !important;
}
</style>