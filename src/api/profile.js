import request from '@/utils/request'

/**
 * 获取个人信息
 * @param username  用户名
 * @returns {AxiosPromise}
 */
export function info(username) {
  return request({
    url: '/profile/info/' + username,
    method: 'get'
  })
}

/**
 * 更新个人信息
 * @param data
 * @returns {AxiosPromise}
 */
export function update(data) {
  return request({
    url: '/profile/update',
    method: 'post',
    data
  })
}

/**
 * 修改密码
 * @param data
 * @returns {AxiosPromise}
 */
export function modifyPassword(data) {
  return request({
    url: '/profile/modify/password',
    method: 'post',
    data
  })
}
