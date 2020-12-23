
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

// 周
const weekOption = [
  { key: 0, display_name: '全部' },
  { key: 1, display_name: '第1周' },
  { key: 2, display_name: '第2周' },
  { key: 3, display_name: '第3周' },
  { key: 4, display_name: '第4周' },
  { key: 5, display_name: '第5周' },
  { key: 6, display_name: '第6周' },
  { key: 7, display_name: '第7周' },
  { key: 8, display_name: '第8周' },
  { key: 9, display_name: '第9周' },
  { key: 10, display_name: '第10周' },
  { key: 11, display_name: '第11周' },
  { key: 12, display_name: '第12周' },
  { key: 13, display_name: '第13周' },
  { key: 14, display_name: '第14周' },
  { key: 15, display_name: '第15周' },
  { key: 16, display_name: '第16周' },
  { key: 17, display_name: '第17周' },
  { key: 18, display_name: '第18周' },
  { key: 19, display_name: '第19周' },
  { key: 20, display_name: '第20周' },
  { key: 21, display_name: '第21周' },
  { key: 22, display_name: '第22周' },
  { key: 23, display_name: '第23周' },
  { key: 24, display_name: '第24周' },
  { key: 25, display_name: '第25周' },
  { key: 26, display_name: '第26周' },
  { key: 27, display_name: '第27周' },
  { key: 28, display_name: '第28周' },
  { key: 29, display_name: '第29周' },
  { key: 30, display_name: '第30周' },
  { key: 31, display_name: '第31周' },
  { key: 32, display_name: '第32周' },
  { key: 33, display_name: '第33周' },
  { key: 34, display_name: '第34周' },
  { key: 35, display_name: '第35周' },
  { key: 36, display_name: '第36周' },
  { key: 37, display_name: '第37周' },
  { key: 38, display_name: '第38周' },
  { key: 39, display_name: '第39周' },
  { key: 40, display_name: '第40周' },
  { key: 41, display_name: '第41周' },
  { key: 42, display_name: '第42周' },
  { key: 43, display_name: '第43周' },
  { key: 44, display_name: '第44周' },
  { key: 45, display_name: '第45周' },
  { key: 46, display_name: '第46周' },
  { key: 47, display_name: '第47周' },
  { key: 48, display_name: '第48周' },
  { key: 49, display_name: '第49周' },
  { key: 50, display_name: '第50周' },
  { key: 51, display_name: '第51周' },
  { key: 52, display_name: '第52周' },
  { key: 53, display_name: '第53周' }
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
  yearOption,
  weekOption
}
