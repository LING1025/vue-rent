import request from '@/utils/request'

/**
 * 获取部门营业报表信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getOne(query) {
  return request({
    url: '/table/query',
    method: 'get',
    params: {
      year: query.year,
      month: query.month
      /* startDate: query.startDate,
      endDate: query.endDate*/
    }
  })
}

/**
 * 获取课营业报表信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getTwo(query) {
  return request({
    url: '/table/queryke',
    method: 'get',
    params: {
      year: query.year,
      month: query.month
    }
  })
}
