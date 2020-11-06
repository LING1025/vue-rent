<template>
  <div class="export">
    <el-button style="margin-top: 2px;" type="primary" @click="exportExcel">导出EXCEL
    </el-button>
    <el-button style="margin-top: 2px;" type="primary" @click="exportExcel2">导出EXCEL(不同的sheet下载多个文件)
    </el-button>
  </div>
</template>

<script>

import { getUserAuto } from '../../utils/auth'
import { currentDate, dateToStringTwo, formatTwo, getCurrentMonthFirst } from '../../utils/dateSplice'
import { mapGetters } from 'vuex'
import { getCarRent, getRentAmtList } from '../../api/reportTable/formTwo'
import excel from '../../libs/excel'

export default {
  name: 'TableWeekIndex',
  data() {
    return {
      total: 0,
      tableData: '',
      tableData2: '',
      // tableData3: null,
      // tableData4: null,
      listLoading: true,
      // table1: '',
      orderQuery: {
        userAuto: getUserAuto(),
        startDate: getCurrentMonthFirst(),
        endDate: currentDate(),
        orgAuto: 0,
        orgUpAuto: 0
      },
      carQuery: {
        startDate: getCurrentMonthFirst(),
        endDate: currentDate(),
        typeQuery: 1
      },
      cusQuery: {
        startDate: getCurrentMonthFirst(),
        endDate: currentDate()
      }
    }
  },
  computed: {
    ...mapGetters([
      'userAuto'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    queryDouble() {
      this.orderQuery.startDate = formatTwo(dateToStringTwo(this.orderQuery.startDate))
      this.orderQuery.endDate = formatTwo(dateToStringTwo(this.orderQuery.endDate))
    },
    getListTwo() {
      this.carQuery.startDate = this.orderQuery.startDate
      this.carQuery.endDate = this.orderQuery.endDate
      this.carQuery.typeQuery = 1
      getCarRent(this.carQuery).then(response => {
        this.tableData2 = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getList() {
      this.queryDouble()
      this.orderQuery.orgUpAuto = 0
      this.orderQuery.orgAuto = 0
      getRentAmtList(this.orderQuery).then(response => {
        this.tableData = response.data
        this.total = response.data.total
        this.listLoading = false
        this.getListTwo()
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    exportExcel() {
      var that = this
      import('../../excel/Export2Excel').then(excel => {
        const tHeader = ['新增契约租金（交车）', '当月目标', '当月实绩', '结构比', '达成率', '上月实绩', '环比', '去年实绩', '结构比', '同期对比'] // 表头
        const title = ['大陆出行事业业绩周报表', '', '', '', '', '', '', '', '', ''] // 标题
        // 表头对应字段
        const filterVal = ['titleName', 'thisMonTar', 'thisMonAct', 'structure', 'reach', 'lastMonAct', 'link', 'lastYearAct', 'construction', 'comparison']
        const list = that.tableData
        console.log('that.tableData')
        console.log(that.tableData)
        const data = this.formatJson(filterVal, list)
        data.map(item => {
          console.log(item)
          item.map((i, index) => {
            if (!i) {
              item[index] = ''
            }
          })
        })
        const merges = ['A1:J1'] // 合并单元格
        excel.export_json_to_excel({
          title: title,
          header: tHeader,
          data,
          merges,
          filename: '大陆出行事业业绩周报表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      const values = (jsonData || [])
      return values.map(v => filterVal.map(j => v[j]))
    },
    exportExcel2() {
      var that = this
      const params1 = {
        // dataList中的字段 title,key 需要一一对应
        title: ['新增契约租金（交车）', '当月目标', '当月实绩', '结构比', '达成率', '上月实绩', '环比', '去年实绩', '结构比', '同期对比'],
        key: ['titleName', 'thisMonTar', 'thisMonAct', 'structure', 'reach', 'lastMonAct', 'link', 'lastYearAct', 'construction', 'comparison'],
        data: that.tableData, // 数据源
        autoWidth: true,
        // 时间戳函数自己定义formatDate
        filename: 'sheet1'
      }
      const params2 = {
        title: ['新增契约租金（交车）', '当月实绩', '结构比', '上月实绩', '环比', '去年实绩', '结构比', '同期对比'],
        key: ['titleName', 'thisMonAct', 'structure', 'lastMonAct', 'link', 'lastYearAct', 'construction', 'comparison'],
        data: that.tableData2,
        autoWidth: true,
        filename: 'sheet2'
      }
      excel.exportArrayToExcel(params1)
      excel.exportArrayToExcel2(params2)
    }
  }
}
</script>

