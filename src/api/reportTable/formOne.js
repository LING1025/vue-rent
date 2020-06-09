import request from '@/utils/request'

export function getOne(query) {
  return request({
    url: '/table/query',
    method: 'get',
    params: {
      year: query.year,
      month: query.month,
      startDate: query.startDate,
      endDate: query.endDate
    }
  })
}
