// eslint-disable-next-line no-unused-vars
import Cookies from 'js-cookie'

const statusOption2 = [
  { key: '1', display_name: '正常' },
  { key: '2', display_name: '禁用' }
]
const statusOption3 = [
  { key: '1', display_name: '正常' },
  { key: '2', display_name: '禁用' },
  { key: '3', display_name: '删除' }
]
// 角色设置下的类型
const statusOption4 = [
  { key: '1', display_name: '管理' },
  { key: '2', display_name: '会籍' },
  { key: '3', display_name: '教练' },
  { key: '2', display_name: '运营' }
]
// 物柜设置下的状态
const statusOption5 = [
  { key: '1', display_name: '正常' },
  { key: '2', display_name: '禁用' },
  { key: '3', display_name: '删除' },
  { key: '4', display_name: '占用' },
  { key: '5', display_name: '已坏' }
]
// 卡状态
const cardStatusOptions = [
  { key: 4, display_name: '正常' },
  { key: 5, display_name: '到期' },
  { key: 6, display_name: '删除' },
  { key: 7, display_name: '停卡' },
  { key: 8, display_name: '退款' },
  { key: 9, display_name: '已转卡' },
  { key: 10, display_name: '未激活' },
]
const normal = 1
const stop = 2
const del = 3
const occupy = 4
const broken = 5

export default {
  // eslint-disable-next-line no-undef
  statusOption2,
  statusOption3,
  // 此处是自己加的
  statusOption4,
  statusOption5,
  cardStatusOptions,
  normal,
  stop,
  del,
  occupy,
  broken
}

export function getStatus3() {
  return statusOption3
}

export function getStatus2() {
  return statusOption2
}

export function getStatusName(key) {
  for (let i = 0; i < statusOption3.length; i++) {
    if (statusOption3[i].key === key) {
      return statusOption3[i].display_name
    }
  }
  return ''
}

export function getStatusKey(i) {
  return statusOption3[i].key
}
