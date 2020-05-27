import request from '@/utils/request'

/**
 * 根据本人姓名获取代理数据
 * @param query
 * @returns {AxiosPromise}
 */
export function getSelfList(query) {
  return request({
    url: '/query/queryBySelf',
    method: 'get',
    params: {
      fName: query.fName,
      pageNum: query.pageNum,
      pageSize: query.pageSize
    }
  })
}

/**
 * 根据代理人姓名获取代理数据
 * @param query
 * @returns {AxiosPromise}
 */
export function getAgentList(query) {
  return request({
    url: '/query/queryByAgent',
    method: 'get',
    params: {
      fName: query.fName,
      pageNum: query.pageNum,
      pageSize: query.pageSize
    }
  })
}

export function insertAgent(data) {
  return request({
    url: '/agent/insert',
    method: 'post',
    data
  })
}

export function updateAgent(data) {
  return request({
    url: '/agent/update',
    method: 'put',
    data
  })
}

export function patchStart(creditAgentAuto) {
  return request({
    url: '/agent/start/' + creditAgentAuto,
    method: 'patch'
  })
}

export function patchStop(creditAgentAuto) {
  return request({
    url: '/agent/stop/' + creditAgentAuto,
    method: 'patch'
  })
}

export function patchDel(creditAgentAuto) {
  return request({
    url: '/agent/delete/' + creditAgentAuto,
    method: 'delete'
  })
}

