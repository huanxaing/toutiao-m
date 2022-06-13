<template>
    <van-cell class="wrapper" :to="`/article/${articled.art_id}`">
        <div slot="title" class="title van-multi-ellipsis--l2">{{articled.title}}</div>
        <div slot="label" class="label">
            <div class="label_img" v-if="articled.cover.type ===3">
                <div class="label_imgs" v-for="(item, index) in articled.cover.images" :key='index'>
                    <van-image
                        class="label_imgs_1"
                        fit="cover"
                        :src="item"
                    />
                </div>
            </div>
            <div class="label_1">
                <span>{{articled.aut_name}}</span>
                <span>{{articled.comm_count}}评论</span>
                <span>{{articled.pubdate | relativeTime}}</span>
            </div>
        </div>
        <van-image
            v-if="articled.cover.type ===1"
            slot="default"
            class="imgs"
            fit="cover"
            :src="articled.cover.images[0]"
        />
    </van-cell>
</template>

<script>
export default {
  components: {},
  props: {
    articled: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper{
    padding-top: 60px;
    .title{
        font-size: 32px;
    }
    .van-cell__value{
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
    }
    .van-cell__title{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .imgs{
        width: 232px;
        height: 146px;
    }
    .label{
        .label_1{
            margin-top: 15px;
            span{
                   font-size: 20px;
                   color: #928c8c;
                   margin-right: 10px;
               }
        }
        .label_img{
            display: flex;
            .label_imgs{
                flex: 1;
                height: 146px;
                .label_imgs_1{
                    height: 146px;
                    width: 97%;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>