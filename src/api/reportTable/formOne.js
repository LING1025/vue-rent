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
 * @returns {AxiosPromise}
 */
export function getTrail(query) {
  return request({
    url: '/table/queryTrail',
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
 * 获取上个月营业报表
 * @param query
 * @returns {AxiosPromise}
 */
export function getLastMonth(query) {
  return request({
    url: '/table/queryLastMonth',
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
