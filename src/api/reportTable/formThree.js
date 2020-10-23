import request from '@/utils/request'

/** 新增契约租金-车辆来源 **/
export function getCustomerNum(query) {
  return request({
    url: '/tableTwo/queryCustomerNum',
    method: 'get',
    params: {
      startDate: query.startDate,
      endDate: query.endDate
    }
  })
}
