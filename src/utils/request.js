/**
 * 请求模块
 */
import axios from 'axios'
import store from '../store/index.js'
// import jsonBig from 'json-bigint'

// jsonBig 可以处理数据中超出 Javascript 安全整数范围的问题
// var json = '{ "value" : 9223372036854775807 }'
// console.log(jsonBig.parse(json).value.toString())
// console.log(jsonBig.stringify(jsonBig.parse(json)))
// jsonBig.parse() // 把JSON 格式的字符串转为 Javascript 对象形式
// jsonBig.stringify() // 把 Javascript 对象转为 JSON 格式的字符串

const request = axios.create({
    // 接口的基准地址
    baseURL: 'http://geek.itheima.net/'
        // transformResponse 允许后端返回的原始数据 data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
        // transformResponse: [function (data) {
        //     try {
        //       // 如果转换成功则返回转换的数据结果
        //       return jsonBig.parse(data)
        //     } catch (err) {
        //       // 如果转换失败，则包装为统一数据格式并返回
        //       return {
        //         data
        //       }
        //     }
        //   }]
})

// 请求拦截器
request.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${store.state.Identity.token}`
    return config
}, function(error) {
    // 如果请求出错了会进入这里
    return Promise.reject(error)
})

export default request