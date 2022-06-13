<template>
  <div class="wrapper">
        <van-cell class="pd" :border='false'>
           <div slot="title" class="title">我的频道</div>
           <van-button plain type="danger" class="bj" size="mini" round @click="flg = !flg">{{ flg?'完成':'编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10" class="pd_list">
            <van-grid-item class="pd_list—1" v-for="(value, index) in arrChannerl"
            :key="index" >
                <van-icon slot="icon" name='clear' v-show="flg && ! arr.includes(value.id)"></van-icon>
                <span slot="text" class="text" @click="tz(value, index)" :class="{ active : active === index }">{{value.name}}</span>
            </van-grid-item>
        </van-grid>
        <van-cell class="pd" :border='false'>
           <div slot="title" class="title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="pd_list1">
            <van-grid-item icon="plus" @click="tjpd(value)" class="pd_list—2" v-for="(value, index) in remAllChannel" :key="index" :text="value.name" />
        </van-grid>
  </div>
</template>

<script>
import store from '../store/index.js'
import { getChannel, addUsersList, delUserlist } from '@/api/channel.js'
import { setItem } from '../utils/storage'

export default {
  components: {},
  props: {
    arrChannerl: {
        type: Array,
        require: true
    },
    active: {
        type: Number,
        require: true
    }
  },
  data() {
    return {
        arrChann: [],
        flg: false,
        arr: [0], //  固定频道，不可删除
        id: 0
    }
  },
  watch: {},
  computed: {
    //   计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发送变化，则计算属性会重新执行
      remAllChannel () {
        // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组
        return this.arrChann.filter(val => {
            // 数组的 find 方法：遍历数组，把符合条件的第一个元素放回
            return !this.arrChannerl.find(val1 => {
                return val1.id === val.id
            })
        })
      }
    //   remAllChannel () {
    //       const allChan = []
    //       this.arrChann.forEach(val => {
    //         //   find 遍历数组，找到满足条件的元素项
    //         const ret = this.arrChannerl.find(arrChannerl => {
    //               return arrChannerl.id === val.id
    //           })
    //           if (!ret) {
    //               allChan.push(val)
    //           }
    //       })
    //       return allChan
    //   }
  },
  methods: {
      tz (value, i) {
       if (this.flg) {
           // 删除频道
           if (i <= this.active) {
            this.$emit('qh-pd', this.active - 1, true)
           }
           this.arr[0] !== value.id ? this.arrChannerl.splice(i, 1) : this.$toast('推荐频道不可删除')
           this.delUserList(value)
           this.id = value.id
       } else {
          //  切换频道
          this.$emit('qh-pd', i, false)
          store.state.active = i
          this.actived = i
       }
      },
      async delUserList (val) {
           if (store.state.flg) {
            // 未登录，将数据保存到本地
            setItem('toutiao-list', this.arrChannerl)
            } else {
                // 已登录，将数据发到服务器上
                await delUserlist(val.id)
            }
      },
      async allChannel () {
          try {
              const { data } = await getChannel()
              this.arrChann = data.data.channels
          } catch (err) {
              this.$toast('获取全部列表数据失败，请稍后再试')
          }
      },
      async tjpd (val) {
          this.arrChannerl.push(val)
          if (store.state.flg) {
            setItem('toutiao-list', this.arrChannerl)
          } else {
            await addUsersList({
                id: val.id,
                seq: this.arrChannerl.length
            })
          }
      }
  },
  created() {
      this.allChannel()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper{
    padding: 80px 0;
    .pd{
        margin-top: 15px;
        .bj{
            width: 100px;
        }
        .title{
            font-size: 32px;
        }
    }
    /deep/ .pd_list{
        margin-top: 10px;
        .pd_list—1{
            height: 90px;
            .van-grid-item__content{
                background: #f2f4f6;
                .van-icon-clear{
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 30px;
                    transform: translateX(30%) translateY(-30%);
                    z-index: 9;
                }
                .van-grid-item__text{
                    margin-top: 0;
                }
            }
            .van-grid-item__text, .text{
                font-size: 28px;
                color: #222;
            }
            .active{
                color: red;
            }
            .van-grid-item__icon-wrapper{
                position: unset;
            }
        }
    }
    /deep/ .pd_list1{
        .pd_list—2{
            height: 90px;
            .van-grid-item__content{
                flex-direction: row;
                background: #f4f3f3;
                .van-icon-plus{
                    font-size: 30px;
                    margin-right: 6px;
                }
                .van-grid-item__text{
                    margin-top: 0;
                    font-size: 30px;
                }
            }
        }
    }
}
</style>