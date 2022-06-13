import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)
const token = 'token'
const flg = 'flg'

export default new Vuex.Store({
    state: {
        // 一个对象，存储当前登录用户信息
        Identity: getItem(token),
        flg: getItem(flg),
        active: 0,
        flge: false,
        id: 0
    },
    mutations: {
        suToken(state, value) {
            state.Identity = value
                // 为了防止刷新丢失，我们需要把数据备份到本地存储
            setItem(token, state.Identity)
        },
        qh(state) {
            state.flg = false
            setItem(flg, state.flg)
        },
        tuic(state) {
            state.flg = true
            setItem(flg, state.flg)
        },
        ids(state, id) {
            state.id = id
        }
    },
    actions: {},
    modules: {}
})