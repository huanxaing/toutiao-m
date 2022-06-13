// 文章列表请求模块
import request from '@/utils/request'

/**
 * 获取文章新闻推荐
 */
export const articleList = params => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}

/**
 * 获取新闻详情
 */
export const articleXq = atrId => {
    return request({
        method: 'GET',
        url: '/v1_0/articles/' + atrId
    })
}