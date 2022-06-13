import request from '@/utils/request'

/**
 * 获取全部频道列表
 */
export const getChannel = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

/**
 * 设置用户的频道（部分覆盖）
 */
export const addUsersList = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [data]
        }
    })
}

/**
 * 删除用户指定频道
 */
export const delUserlist = channId => {
    return request({
        method: 'DELETE',
        url: '/v1_0/user/channels/' + channId
    })
}