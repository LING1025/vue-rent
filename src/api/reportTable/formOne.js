import request from '@/utils/request'

/**
 * 获取部门营业报表信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getTwo(query) {
  return request({
    url: '/table/queryTwo',
    method: 'get',
    params: {
      year: query.year,
      month: query.month,
      startDate: query.startDate,
      endDate: query.endDate
    }
  })
}

/**
 * 获取课营业报表信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getOne(query) {
  return request({
    url: '/table/queryOne',
    method: 'get',
    params: {
      year: query.year,
      month: query.month,
      startDate: query.startDate,
      endDate: query.endDate
    }
  })
}

/**
 * 获取业代营业报表信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getZero(query) {
  return request({
    url: '/table/queryZero',
    method: 'get',
    params: {
      year: query.year,
      month: query.month,
      startDate: query.startDate,
      endDate: query.endDate
    }
  })
}
