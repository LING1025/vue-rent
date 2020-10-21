import request from '@/utils/request'

/**
 * 公司别
 * @param query
 * @returns {AxiosPromise}
 */
export function getCompanyNameList(query) {
  return request({
    url: '/tableTwo/queryCompanyNameList',
    method: 'get',
    params: {
      mode: query.mode,
      searchWord: query.searchWord
    }
  })
}

/**
 * 案件维护汇出表格数据
 * @param query
 * @returns {AxiosPromise}
 */
export function getCaseExecList(query) {
  return request({
    url: '/tableTwo/queryCaseExecList',
    method: 'get',
    params: {
      inc: query.inc,
      type: query.type,
      year: query.year,
      month: query.month,
      flag: query.flag,
      customer: query.customer
    }
  })
}

/** 新增契约租金-客户来源 **/
export function getThisMonthTar(query) {
  return request({
    url: '/tableTwo/queryThisMonthTar',
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

/** 新增契约租金-车辆来源 **/
export function getCarSourceRent(query) {
  return request({
    url: '/tableTwo/queryCarSourceRent',
    method: 'get',
    params: {
      startDate: query.startDate,
      endDate: query.endDate
    }
  })
}
