<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-date-picker v-model="orderQuery.startDate" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder="请选择开始日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="orderQuery.endDate" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder="请选择结束日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
          <div class="export">
            <el-button style="margin-top: 2px;" type="primary" @click="exportExcel">导出EXCEL
            </el-button>
          </div>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          id="tableOne"
          v-loading="listLoading"
          :data="tableData"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column width="200px" align="center" label="新增契约租金（交车）" prop="titleName" />
          <el-table-column align="center" label="当月目标" prop="thisMonTar" />
          <el-table-column align="center" label="当月实绩" prop="thisMonAct" />
          <el-table-column align="center" label="结构比" prop="structure" />
          <el-table-column align="center" label="达成率" prop="reach" />
          <el-table-column align="center" label="上月实绩" prop="lastMonAct" />
          <el-table-column align="center" label="环比" prop="link" />
          <el-table-column align="center" label="去年实绩" prop="lastYearAct" />
          <el-table-column align="center" label="结构比" prop="construction" />
          <el-table-column align="center" label="同期对比" prop="comparison" />
        </el-table>
        <el-table
          id="tableTwo"
          v-loading="listLoading"
          :data="tableData2"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column width="200px" align="center" label="新增契约租金（交车）" prop="titleName" />
          <el-table-column align="center" label="当月实绩" prop="thisMonAct" />
          <el-table-column align="center" label="结构比" prop="structure" />
          <el-table-column align="center" label="上月实绩" prop="lastMonAct" />
          <el-table-column align="center" label="环比" prop="link" />
          <el-table-column align="center" label="去年实绩" prop="lastYearAct" />
          <el-table-column align="center" label="结构比" prop="construction" />
          <el-table-column align="center" label="同期对比" prop="comparison" />
        </el-table>
        <el-table
          id="tableThree"
          v-loading="listLoading"
          :data="tableData3"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column width="200px" align="center" label="新增契约台数（交车）" prop="titleName" />
          <el-table-column align="center" label="当月实绩" prop="thisMonAct" />
          <el-table-column align="center" label="结构比" prop="structure" />
          <el-table-column align="center" label="上月实绩" prop="lastMonAct" />
          <el-table-column align="center" label="环比" prop="link" />
          <el-table-column align="center" label="去年实绩" prop="lastYearAct" />
          <el-table-column align="center" label="结构比" prop="construction" />
          <el-table-column align="center" label="同期对比" prop="comparison" />
        </el-table>
        <el-table
          id="tableFour"
          v-loading="listLoading"
          :data="tableData4"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column width="200px" align="center" label="保有客户台数（展期）" prop="titleName" />
          <el-table-column align="center" label="当月实绩" prop="thisMonAct" />
          <el-table-column align="center" label="上月实绩" prop="lastMonAct" />
          <el-table-column align="center" label="环比" prop="link" />
          <el-table-column align="center" label="去年实绩" prop="lastYearAct" />
          <el-table-column align="center" label="同期对比" prop="comparison" />
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCurrentMonthFirst, currentDate, dateToStringTwo, formatTwo } from '../../utils/dateSplice'
import { getUserAuto } from '../../utils/auth'
import { getRentAmtList, getCarRent, getNum } from '../../api/reportTable/formTwo'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'TableWeekTotalTbs',
  data() {
    return {
      total: 0,
      tableData: null,
      tableData2: null,
      tableData3: null,
      tableData4: null,
      listLoading: true,
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
    getListFour() {
      this.cusQuery.startDate = this.orderQuery.startDate
      this.cusQuery.endDate = this.orderQuery.endDate
      getNum(this.cusQuery).then(response => {
        this.tableData4 = response.data
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
        this.getListFour()
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    exportExcel() {
      var workbook = XLSX.utils.book_new()
      // 由于js-xlsx提供了自动加工功能，会识别数据格式,导致导出的Excel数据和table显示数据不完全一致,raw：表示导出数据是否是未加工的。
      // 导出一个table 用table_to_book
      /* generate workbook object from table */
      var wb1 = XLSX.utils.table_to_sheet(document.querySelector('#tableOne'), { raw: true }) // #tableOne是table表的id名
      XLSX.utils.book_append_sheet(workbook, wb1, 'sheet1') // sheet的命名
      var wb2 = XLSX.utils.table_to_sheet(document.querySelector('#tableTwo'), { raw: true })
      XLSX.utils.book_append_sheet(workbook, wb2, 'sheet2')
      var wb3 = XLSX.utils.table_to_sheet(document.querySelector('#tableThree'), { raw: true })
      XLSX.utils.book_append_sheet(workbook, wb3, 'sheet3')
      var wb4 = XLSX.utils.table_to_sheet(document.querySelector('#tableFour'), { raw: true })
      XLSX.utils.book_append_sheet(workbook, wb4, 'sheet4')
      /* get binary string as output */
      var wbout = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '出行事业业绩周报.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') { console.log(e, wbout) }
      }
      return wbout
    }
  }
}
</script>

<style scoped>

</style>
