import request from '@/utils/request'

/**
 *根据员工姓名、部门查询员工信息
 * @param query
 * @returns {AxiosPromise}
 */
export function getEmpList(query) {
  return request({
    url: '/empQuery/query',
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
 *根据员工id获取员工代理信息
 * @param empBaseAuto
 * @returns {AxiosPromise}
 */
export function getEmpAgent(query) {
  return request({
    url: '/empQuery/queryByEmpBaseAuto',
    method: 'get',
    params: {
      empBaseAuto: query.empBaseAuto
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
    url: '/empQuery/queryDepName',
    method: 'get',
    params: {
      depName: query.depName
    }
  })
}

/**
 *获取角色名称
 * @param query
 * @returns {AxiosPromise}
 */
export function getRoleNameList(query) {
  return request({
    url: '/empQuery/queryRoleName',
    method: 'get',
    params: {
      roleName: query.roleName
    }
  })
}

/**
 *获取所属组名称
 * @param query
 * @returns {AxiosPromise}
 */
export function getOrgGroupNameList(query) {
  return request({
    url: '/empQuery/queryOrgGroupName',
    method: 'get',
    params: {
      orgGroupName: query.orgGroupName
    }
  })
}

/**
 * 新建员工
 * @param data
 * @returns {AxiosPromise}
 */
export function insertEmp(data) {
  return request({
    url: '/emp/insert',
    method: 'post',
    data
  })
}

/**
 * 编辑员工
 * @param data
 * @returns {AxiosPromise}
 */
export function updateEmp(data) {
  return request({
    url: '/emp/update',
    method: 'put',
    data
  })
}

export function patchStart(empBaseAuto) {
  return request({
    url: '/emp/start/' + empBaseAuto,
    method: 'patch'
  })
}

export function patchStop(empBaseAuto) {
  return request({
    url: '/emp/stop/' + empBaseAuto,
    method: 'patch'
  })
}

export function patchDel(empBaseAuto) {
  return request({
    url: '/emp/delete/' + empBaseAuto,
    method: 'delete'
  })
}
