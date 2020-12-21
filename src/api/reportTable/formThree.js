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

/** 呆账：周期下拉选 **/
/* export function getWeekList(query) {
  return request({
    url: '/tableThree/queryWeekList',
    method: 'get',
    params: {
      year: query.year
    }
  })
}*/
