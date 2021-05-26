import request from '@/utils/request'

/**
 * 专案名称下拉选
 * @param query
 * @returns {AxiosPromise}
 */
export function getProNameList(query) {
  return request({
    url: '/tableFour/queryProNameList',
    method: 'get',
    params: {
      projectName: query.projectName
    }
  })
}

/**
 * 客户来源名称下拉选
 * @param query
 * @returns {AxiosPromise}
 */
export function getCusNameList(query) {
  return request({
    url: '/tableFour/queryCusNameList',
    method: 'get',
    params: {
      customerName: query.customerName
    }
  })
}

/**
 * 获取专案明细
 * @param query
 * @returns {AxiosPromise}
 */
export function getProList(query) {
  return request({
    url: '/tableFour/queryProList',
    method: 'get',
    params: {
      startDT: query.startDT,
      endDT: query.endDT,
      projectName: query.projectName,
      customerName: query.customerName
    }
  })
}
