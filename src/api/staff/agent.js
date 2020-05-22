import request from '@/utils/request'

export function getAgentList(query) {
  return request({
    url: '/agent/query',
    method: 'get',
    params: {
      name: query.name,
      pageNum: query.pageNum,
      pageSize: query.pageSize
    }
  })
}

