
const titleOption = [
  { key: 1, display_name: '董事长' },
  { key: 2, display_name: '总经理' },
  { key: 3, display_name: '总监' },
  { key: 4, display_name: '经理' },
  { key: 5, display_name: '襄理' },
  { key: 6, display_name: '组长' },
  { key: 7, display_name: '专员' },
  { key: 8, display_name: '助理' },
  { key: 9, display_name: '司机' },
  { key: 10, display_name: '协理' },
  { key: 11, display_name: '副理' },
  { key: 12, display_name: '业务员' },
  { key: 13, display_name: '主任' },
  { key: 14, display_name: '副总经理' }

]

const typeOption = [
  { key: '1', display_name: 'A程式' },
  { key: '2', display_name: 'B资料' },
  { key: '3', display_name: 'C专案' },
  { key: '4', display_name: 'D账号开通' },
  { key: '5', display_name: 'E硬件维护' },
  { key: '6', display_name: 'F软件维护' }
]

const statusOption = [
  { key: '1', display_name: '需处理' },
  { key: '2', display_name: '未完成' },
  { key: '3', display_name: '已完成' }
]

const modeOption = [
  { key: '1', display_name: '1.新增' },
  { key: '2', display_name: '2.修改' },
  { key: '3', display_name: '3.报表' }
]

const reasonOption = [
  { key: '1', display_name: '1.作业需求' },
  { key: '2', display_name: '2.客户要求' },
  { key: '3', display_name: '3.人为疏失' }
]

const degreeOption = [
  { key: '1', display_name: '1.急件' },
  { key: '2', display_name: '2.重要' },
  { key: '3', display_name: '3.普通' }
]

// 月份下拉拆分
const monthOption = [
  { key: 1, display_name: '1月' },
  { key: 2, display_name: '2月' },
  { key: 3, display_name: '3月' },
  { key: 4, display_name: '4月' },
  { key: 5, display_name: '5月' },
  { key: 6, display_name: '6月' },
  { key: 7, display_name: '7月' },
  { key: 8, display_name: '8月' },
  { key: 9, display_name: '9月' },
  { key: 10, display_name: '10月' },
  { key: 11, display_name: '11月' },
  { key: 12, display_name: '12月' }

]

// 案件维护中查询类别
const execTypeOption = [
  { key: 1, display_name: '保证金日' },
  { key: 2, display_name: '交车日' },
  { key: 3, display_name: '奖金日' },
  { key: 4, display_name: '业绩日' },
  { key: 5, display_name: '进度管控表' }

]

// 年份
const yearOption = [
  { key: 2015, display_name: '2015年' },
  { key: 2016, display_name: '2016年' },
  { key: 2017, display_name: '2017年' },
  { key: 2018, display_name: '2018年' },
  { key: 2019, display_name: '2019年' },
  { key: 2020, display_name: '2020年' },
  { key: 2021, display_name: '2021年' }

]

export default {
  titleOption,
  typeOption,
  statusOption,
  modeOption,
  reasonOption,
  degreeOption,
  monthOption,
  execTypeOption,
  yearOption
}
