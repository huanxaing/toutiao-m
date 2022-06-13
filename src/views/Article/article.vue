<template>
  <div class="article-container">
       <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="arr.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ arr.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="arr.aut_photo"
          />
          <div slot="title" class="user-name">{{ arr.aut_name }}</div>
          <div slot="label" class="publish-date">{{ arr.pubdate | relativeTime }}</div>
          <!-- 模板中的$event 是事件参数
                当我们传递给子组件的数据既要使用还要修改。
                传递: props
                  :pd="arr.is_followed"
                修改:自定义事件
                  @followe="arr.is_followed = $event"
                简写方式:在组件上使用v-model
                  value="article.is_ followed"
                  @input="article.is_ followed = $event
             -->
             <!-- 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，
                  但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。
                  model 选项可以用来避免这样的冲突：
                      在组件里添加
                      model: {
                        prop: '属性',
                        event: '事件'
                      },
                -->
          <focus v-model="arr.is_followed" :autid="arr.aut_id" />
          <!-- <focus :pd="arr.is_followed" :autid="arr.aut_id" @followe="arr.is_followed = $event" /> -->
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
            v-if="arr.is_followed"
            @click="gz()"
            :loading='loadings'
          >已关注</van-button>
          <van-button
            class="follow-btn"
            :loading='loadings'
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-else
            @click="gz()"
          >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" v-html="arr.content" ref="arr-content"></div>
        <van-divider>正文结束</van-divider>
        <pinglun :id="arr.art_id" @pinglunNum='num1 = $event.total_count' :list='comentlist' />
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="num === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="sa">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isShow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :info="num1"
        color="#777"
      />
      <shoucang v-model="arr.is_collected" :id="arr.art_id" />
      <!-- <van-icon
        color="#777"
        name="star-o"
      /> -->
      <dianzan v-model="arr.attitude" :id="arr.art_id" />
      <!-- <van-icon
        color="#777"
        name="good-job-o"
      /> -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 弹出层 -->
    <van-popup v-model="isShow" position="bottom" >
        <Releasepinglun :id="arr.art_id" @listObj="cg" />
    </van-popup>
  </div>
</template>

<script>
import { articleXq } from '@/api/article'
import { ImagePreview } from 'vant'
import focus from '@/components/focus.vue'
import shoucang from '@/components/shoucang.vue'
import dianzan from '@/components/dianzan.vue'
import pinglun from '@/components/pinglun.vue'
import Releasepinglun from '@/components/Releasepinglun.vue'

export default {
  components: {
    focus,
    shoucang,
    dianzan,
    pinglun,
    Releasepinglun
  },
  props: {
      id: {
          type: [Number, String],
          require: true
      }
  },
  data() {
    return {
        arr: {},
        loading: true,
        num: 0,
        loadings: false,
        num1: 0,
        isShow: false,
        comentlist: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
      async sa () {
          this.loading = true
         try {
              const { data } = await articleXq(this.id)
                this.arr = data.data
                console.log(this.arr)
              setTimeout(() => {
                  this.sd()
              }, 0)
         } catch (err) {
             if (err.response.status === 404) {
                 this.num = 404
             }
         }
         this.loading = false
      },
      sd () {
          const imgArr = this.$refs['arr-content']
          const imgArrs = imgArr.querySelectorAll('img')
          var imgs = []
          imgArrs.forEach((img, i) => {
              imgs.push(img.src)
              img.onclick = () => {
                ImagePreview({
                    images: imgs,
                    startPosition: i
                })
              }
          })
      },
      cg (data) {
        this.comentlist.unshift(data.new_obj)
        this.isShow = false
      }
  },
  created() {
      this.sa()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    /deep/ .article-content {
        font-size: 30px;
        line-height: 50px;
        p{
            img{
                height: 100%;
                width: 100%;
            }
        }
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>