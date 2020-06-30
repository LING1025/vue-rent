import request from '@/utils/request'

/**
 * 获取营业报表信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getMode(query) {
  return request({
    url: '/table/queryMode',
    method: 'get',
    params: {
      userAuto: query.userAuto,
      startDate: query.startDate,
      endDate: query.endDate,
      orgAuto: query.orgAuto,
      orgUpAuto: query.orgUpAuto
    }
  })
}

/**
 * 获取试算营业报表信息
 * @param query
 * @returns {*}
 */
export function getMonth(query) {
  return request({
    url: '/table/query',
    method: 'get',
    params: {
      userAuto: query.userAuto,
      startDate: query.startDate,
      endDate: query.endDate,
      orgAuto: query.orgAuto,
      orgUpAuto: query.orgUpAuto
    }
  })
}
