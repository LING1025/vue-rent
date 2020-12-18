import request from '@/utils/request'

/** 新增呆账&回收 **/
export function getYearList(query) {
  return request({
    url: '/tableThree/queryYearList',
    method: 'get',
    params: {
      year: query.year,
      week: query.week
    }
  })
}
