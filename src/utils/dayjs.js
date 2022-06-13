import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 加载中文语言包
import Vue from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用

Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})