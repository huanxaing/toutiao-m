// 用户请求模块
import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 短信验证码
export const dxCode = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`
    })
}

// 用户自己的信息
export const YongHus = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
            // 发送请求头数据
            // headers: {
            //     // Bearer 后面要一个空格
            //     Authorization: `Bearer ${store.state.Identity.token}`
            // }
    })
}

// 获取所有频道列表
export const getUserList = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}

// 关注用户
export const FocusUser = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

// 取消关注用户
export const DelUser = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`
    })
}

// 收藏文章
export const collectArticle = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}

// 取消收藏文章
export const DelcollectArticle = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`
    })
}

// 对文章点赞
export const dianzanArticle = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target
        }
    })
}

// 取消收藏文章
export const DeldianzanArticle = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`
    })
}