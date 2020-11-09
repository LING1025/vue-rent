<template>
  <div class="export">
    <el-button style="margin-top: 2px;" type="primary" @click="handleDownload">导出EXCEL
    </el-button>
  </div>
</template>

<script>
import { currentDate, dateToStringTwo, formatTwo, getCurrentMonthFirst } from '../../utils/dateSplice'
import { getCarRent, getRentAmtList } from '../../api/reportTable/formTwo'
import { getUserAuto } from '../../utils/auth'
import { mapGetters } from 'vuex'
import { parseTime } from '../../utils/setMethods'

export default {
  name: 'TableWeekIndex2',
  data() {
    return {
      total: 0,
      tableData: '',
      tableData2: '',
      tableData3: '',
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
    getListThree() {
      this.carQuery.startDate = this.orderQuery.startDate
      this.carQuery.endDate = this.orderQuery.endDate
      this.carQuery.typeQuery = 2
      getCarRent(this.carQuery).then(response => {
        this.tableData3 = response.data
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
        this.getListThree()
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleDownload() {
      var excelDatas = [
        {
          tHeader: ['新增契约租金（交车）', '当月目标', '当月实绩', '结构比', '达成率', '上月实绩', '环比', '去年实绩', '结构比', '同期比较'],
          filterVal: ['titleName', 'thisMonTar', 'thisMonAct', 'structure', 'reach', 'lastMonAct', 'link', 'lastYearAct', 'construction', 'comparison'],
          tableDatas: this.tableData,
          sheetName: 'sheet1'
        },
        {
          tHeader: ['新增契约租金（交车）', '当月实绩', '结构比', '上月实绩', '环比', '去年实绩', '结构比', '同期比较'],
          filterVal: ['titleName', 'thisMonAct', 'structure', 'lastMonAct', 'link', 'lastYearAct', 'construction', 'comparison'],
          tableDatas: this.tableData2,
          sheetName: 'sheet2'
        },
        {
          tHeader: ['新增契约台数（交车）', '当月实绩', '结构比', '上月实绩', '环比', '去年实绩', '结构比', '同期比较'],
          filterVal: ['titleName', 'thisMonAct', 'structure', 'lastMonAct', 'link', 'lastYearAct', 'construction', 'comparison'],
          tableDatas: this.tableData3,
          sheetName: 'sheet3'
        }
      ]
      this.json2excel(excelDatas, '数据报表', true, 'xlsx')
    },
    // tableJson 导出数据 ; filenames导出表的名字; autowidth表格宽度自动 true or false; bookTypes xlsx & csv & txt
    json2excel(tableJson, filenames, autowidth, bookTypes) {
      import('../../vendor/Export2Excel').then(excel => {
        var tHeader = []
        var dataArr = []
        var sheetnames = []
        for (var i in tableJson) {
          tHeader.push(tableJson[i].tHeader)
          dataArr.push(this.formatJson(tableJson[i].filterVal, tableJson[i].tableDatas))
          sheetnames.push(tableJson[i].sheetName)
        }
        excel.export_json_to_excel({
          header: tHeader,
          data: dataArr,
          sheetname: sheetnames,
          filename: filenames,
          autoWidth: autowidth,
          bookType: bookTypes
        })
      })
    },
    // 数据过滤，时间过滤
    formatJson(filterVal, jsonData) {
      const values = (jsonData || [])
      return values.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
