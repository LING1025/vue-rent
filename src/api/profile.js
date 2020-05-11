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

/**
 *获取员工信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getUserList(query) {
  return request({
    url: '/profile/query',
    method: 'get',
    params: {
      username: query.username,
      status: query.status,
      phone: query.phone
    }
  })
}

/**
 *注册员工账号
 * @param data
 * @returns {AxiosPromise}
 */
export function insertUserList(data) {
  return request({
    url: '/profile/insert',
    method: 'post',
    data
  })
}

export function patchStart(userId) {
  return request({
    url: '/profile/start/' + userId,
    method: 'patch'
  })
}

export function patchStop(userId) {
  return request({
    url: '/profile/stop/' + userId,
    method: 'patch'
  })
}

export function patchDel(userId) {
  return request({
    url: '/profile/delete/' + userId,
    method: 'delete'
  })
}
