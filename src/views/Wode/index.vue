<template>
  <div class="wrapper">
     <div v-if='this.$store.state.flg'>
        <div class="bt-toubu">
            <div class="bt-box" @click="onLogin">
                <img src="~@/assets/mobile.png" alt="">
                <span>点击登录</span>
            </div>
        </div>
        <div class="bt-zhongbu">
            <div class="bt-zhongbu-t">
                <div><i class="toutiao toutiao-shoucang" style="color:red"></i></div>
                <div><span>我的收藏</span></div>
            </div>
            <div style="border-left: 1px solid #dedede;height:70%;"></div>
             <div class="bt-zhongbu-t" >
                <div><i class="toutiao toutiao-lishi" style="color:#eab577;"></i></div>
                <div><span>浏览历史</span></div>
            </div>
             <div style="border-left: 1px solid #dedede;height:70%;"></div>
             <div class="bt-zhongbu-t">
                <div><i class="toutiao toutiao-zuopin" style="color:#7fa0ff;margin-left:-1px;"></i></div>
                <div><span>作品</span></div>
            </div>
        </div>
        <div class="bt-ul-li">
            <ul>
                <li>
                    <div>消息通知</div>
                    <div><i class="toutiao toutiao-zuoyoujiantou"></i></div>
                </li>
                <li class="xt"></li>
                <li>
                    <div>小智同学</div>
                    <div><i class="toutiao toutiao-zuoyoujiantou"></i></div>
                </li>
            </ul>
        </div>
     </div>

    <div v-else>
        <div class="not-toubu">
          <div class="bt-boxs-top">
              <div class="bt-boxs-t">
                 <img src="http://geek.itheima.net/images/user_head.jpg" alt="">
                 <div class="bt-boxs-t1">
                     <div style="margin-bottom:10px;">{{arr.name}}</div>
                     <div class="bt-boxs-t2">申请认证</div>
                 </div>
              </div>
          </div>
          <div class="bt-boxs-bottom">
              <div class="bt-boxs-b">
                  <div>{{arr.art_count}}</div>
                  <div>动态</div>
              </div>
              <div class="bt-boxs-b">
                  <div>{{arr.follow_count}}</div>
                  <div>关注</div>
              </div>
              <div class="bt-boxs-b">
                  <div>{{arr.fans_count}}</div>
                  <div>粉丝</div>
              </div>
          </div>
        </div>
        <div class="bt-zhongbu">
            <div class="bt-zhongbu-t">
                <div><i class="toutiao toutiao-shoucang" style="color:red"></i></div>
                <div><span>收藏</span></div>
            </div>
             <div class="bt-zhongbu-t" style="border-left: 1px solid #dedede;border-right: 1px solid #dedede;width:130px;">
                <div><i class="toutiao toutiao-lishi" style="color:#eab577;"></i></div>
                <div><span>历史</span></div>
            </div>
             <div class="bt-zhongbu-t">
                <div><i class="toutiao toutiao-zuopin" style="color:#7fa0ff;margin-left:-1px;"></i></div>
                <div><span>作品</span></div>
            </div>
        </div>
        <div class="bt-ul-li">
            <ul>
                <li>
                    <div>消息通知</div>
                    <div><i class="toutiao toutiao-zuoyoujiantou"></i></div>
                </li>
                <li class="xt"></li>
                <li>
                    <div>实名认证</div>
                    <div><i class="toutiao toutiao-zuoyoujiantou"></i></div>
                </li>
                <li style="height:10px;background: #f5f7f9;"></li>
                <li>
                   <div>用户反馈</div>
                    <div><i class="toutiao toutiao-zuoyoujiantou"></i></div>
                </li>
                <li class="xt"></li>
                <li>
                    <div>小智同学</div>
                    <div><i class="toutiao toutiao-zuoyoujiantou"></i></div>
                </li>
                <li class="xt"></li>
                <li>
                   <div>系统设置</div>
                    <div><i class="toutiao toutiao-zuoyoujiantou"></i></div>
                </li>
                <li class="tuic" @click="tuic">
                   <div style="margin-left:-20px">退出登录</div>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import { YongHus } from '@/api/user'

export default {
  components: {},
  props: {},
  data() {
    return {
        arr: {}
    }
  },
  watch: {},
  computed: {},
  methods: {
      onLogin () {
          this.$router.push('/login')
      },
      tuic () {
          this.$store.commit('tuic')
      },
     async YongHu () {
         try {
            const { data } = await YongHus()
            console.log(data)
            this.arr = data.data
         } catch (err) {
             this.$toast('获取数据失败，请稍后重试')
         }
      }
  },
  created() {
      this.YongHu()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper{
    .bt-toubu{
        margin: 0;
        padding: 0;
        height: 361px;
        background: url('~@/assets/banner.png');
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .bt-box{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            img{
                height: 132px;
                margin-bottom: 18px;
            }
            span{
                font-size: 28px;
                color: white;
            }
        }
    }
    .bt-zhongbu{
        display: flex;
        height: 180px;
        background: white;
        justify-content: space-around;
        align-items: center;
        .bt-zhongbu-t{
            width: 220px;
            height: 130px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            div{
                display: flex;
                justify-content: center;
            }
            i{
                font-size: 50px;
                margin-bottom: 10px;
            }
            span{
                font-size: 20px;
            }
        }
    }
    .bt-ul-li{
        margin-top: 20px;
        width: 100%;
        ul{
            width: 100%;
            li{
                width: 100%;
                height: 100px;
                background: white;
                line-height: 100px;
                display: flex;
                justify-content: space-between;
                font-size: 30px;
                color: #7b7b71;
                div:nth-child(1){
                    margin-left: 20px;
                }
                div:nth-child(2){
                    margin-right: 20px;
                }
            }
            .tuic{
                margin-top: 20px;
                justify-content: center;
                color: red;
                font-size: 40px;
            }
        }
    }
    .not-toubu{
        margin: 0;
        padding: 0;
        height: 361px;
        background: url('~@/assets/banner.png');
        background-size: cover;
        .bt-boxs-top{
            height: 240px;
            display: flex;
            align-items: center;
            .bt-boxs-t{
                display: flex;
                align-items: center;
                width: 100%;
                height: 230px;
                img{
                    height: 150px;
                    width: 150px;
                    margin-left: 25px;
                    border-radius: 50%;
                }
                .bt-boxs-t1{
                    line-height: 30px;
                    margin-left: 25px;
                    color: white;
                    font-size: 30px;
                    .bt-boxs-t2{
                        background: white;
                        color: #3e9dfa;
                        width: 140px;
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        border-radius: 40px;
                        font-size: 20px;
                    }
                }
            }
        }
        .bt-boxs-bottom{
            height: 361 - 250px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .bt-boxs-b{
                color: white;
                text-align: center;
                font-size: 30px;
            }
        }
    }
}
.xt{
    border-top:1px solid #dedede;
    height:1px !important;
    width:96% !important;
    position: absolute;
    right: 0;
}
</style>