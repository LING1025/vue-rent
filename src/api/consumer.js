import request from '@/utils/request'

/**
 * 获取个人信息
 * @param username  用户名
 * @returns {AxiosPromise}
 */
export function info(username) {
  return request({
    url: '/consumer/info/' + username,
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
    url: '/consumer/update',
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
    url: '/consumer/modify/password',
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
    url: '/consumer/query',
    method: 'get',
    params: {
      username: query.username,
      isOn: query.isOn,
      pageNum: query.pageNum,
      pageSize: query.pageSize
    }
  })
}

/**
 * 修改用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function updateUser(data) {
  return request({
    url: '/consumer/updateUser',
    method: 'put',
    data
  })
}

export function patchStart(userAuto) {
  return request({
    url: '/consumer/start/' + userAuto,
    method: 'patch'
  })
}

export function patchStop(userAuto) {
  return request({
    url: '/consumer/stop/' + userAuto,
    method: 'patch'
  })
}

export function patchDel(userAuto) {
  return request({
    url: '/consumer/delete/' + userAuto,
    method: 'delete'
  })
}

/** 重置密码 */
export function reset(username) {
  return request({
    url: '/consumer/reset/' + username,
    method: 'put'
  })
}
