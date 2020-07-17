
/** 给年月日补零 好用的工具 **/
// eslint-disable-next-line no-unused-vars
import { number } from 'echarts/src/export'

/** usage format(dateTostring( 'Time'))  **/
export function dateTostring(date) {
  if (date === '' || date == null) {
    return date
  } else {
    return date.toLocaleString().split(' ', 1)[0].replace(/\//g, '-') // 截取时间
  }
}
export function format(string) {
  if (string === '' || string == null) {
    return string
  } else {
    const strings = string.split('-')
    if (strings[1].length <= 1) {
      strings[1] = '0' + strings[1]
    }
    if (strings[2].length <= 1) {
      strings[2] = '0' + strings[2]
    }
    return strings[0] + '-' + strings[1] + '-' + strings[2]
  }
}

/** 获取当前月的第一天 **/
export function getCurrentMonthFirst(currentMonthFirst) {
  const date = new Date()
  date.setDate(1)
  let month = parseInt(date.getMonth() + 1)
  let day = date.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  // eslint-disable-next-line no-return-assign
  return currentMonthFirst = date.getFullYear() + '-' + month + '-' + day
}

/** 获取当前月的最后一天 **/
export function getCurrentMonthLast(currentMonthLast) {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  const day = new Date(year, month, 0)
  // eslint-disable-next-line no-return-assign
  return currentMonthLast = year + '-' + month + '-' + day.getDate()
}

/** 获取指定月份的最后一天 */
export function getMonthLastDays(monthLastDays) {
  const date = new Date(monthLastDays)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  const day = new Date(year, month, 0)
  // eslint-disable-next-line no-return-assign
  return monthLastDays = year + '-' + month + '-' + day.getDate()
}

/** 获取当前的年月日 **/
export function currentDate(nowDate) {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  // eslint-disable-next-line no-return-assign
  return nowDate = year + '-' + month + '-' + day
}

/** 获取当前的时间  带秒数**/
export function currentTime(times) {
  const myDate = new Date()
  const h = myDate.getHours() // 获取当前小时数(0-23)
  const m = myDate.getMinutes() // 获取当前分钟数(0-59)
  const s = myDate.getSeconds()
  // eslint-disable-next-line no-return-assign
  return times = conver(h) + ':' + conver(m) + ':' + conver(s)
}

/** 获取当前的时间  不带秒数**/
export function currentTimeNo(times) {
  const myDate = new Date()
  const h = myDate.getHours() // 获取当前小时数(0-23)
  const m = myDate.getMinutes() // 获取当前分钟数(0-59)
  // eslint-disable-next-line no-unused-vars
  const s = myDate.getSeconds()
  // eslint-disable-next-line no-return-assign
  return times = conver(h) + ':' + conver(m)
}

/** 获取当前的时间的一小时以后时间**/
export function currentTimeOne(times) {
  const myDate = new Date()
  const h = myDate.getHours() + 1 // 获取当前小时数(0-23)
  const m = myDate.getMinutes() // 获取当前分钟数(0-59)
  // eslint-disable-next-line
  const s = myDate.getSeconds()
  // eslint-disable-next-line no-return-assign
  return times = conver(h) + ':' + conver(m)
}

/** 随机时间获取一小时以后时间**/
export function randomtTimeOne(times) {
  const arr = times.split(':')
  const h = Number(arr[0]) + 1 // 获取当前小时数(0-23)
  const m = Number(arr[1]) // 获取当前分钟数(0-59)
  // eslint-disable-next-line no-return-assign
  return times = conver(h) + ':' + conver(m)
}

export function conver(s) {
  return s < 10 ? '0' + s : s
}
