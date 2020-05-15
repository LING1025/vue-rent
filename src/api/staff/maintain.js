import request from '@/utils/request'

/**
 *根据员工姓名、部门查询员工信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getEmpList(query) {
  return request({
    url: '/emp/query',
    method: 'get',
    params: {
      fName: query.fName,
      orgName: query.orgName,
      pageNum: query.pageNum,
      pageSize: query.pageSize
    }
  })
}

/**
 * 获取部门名称
 * @param query
 * @returns {AxiosPromise}
 */
export function getDepNameList(query) {
  return request({
    url: '/org/query',
    method: 'get',
    params: {
      depName: query.depName
    }
  })
}
