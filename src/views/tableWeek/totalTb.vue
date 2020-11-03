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
          <el-table-column align="center" label="新增契约租金（交车）" prop="tableName" />
          <el-table-column align="center" label="客户来源-新拓①" prop="newExsNew" />
          <el-table-column align="center" label="客户来源-保有②" prop="retainNew" />
          <el-table-column align="center" label="客户来源-介绍③" prop="introduceNew" />
          <el-table-column align="center" label="新增契约租金(①+②+③)" prop="totalNew" />
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
          <el-table-column align="center" label="新增契约租金（交车）" prop="tableTwoName" />
          <el-table-column align="center" label="华东-车辆来源-新车①" prop="eastNewCarN" />
          <el-table-column align="center" label="华东-车辆来源-旧车②" prop="eastOldCarN" />
          <el-table-column align="center" label="华南-车辆来源-新车③" prop="southNewCarN" />
          <el-table-column align="center" label="华南-车辆来源-旧车④" prop="southOldCarN" />
          <el-table-column align="center" label="新增契约租金(①+②+③+④)" prop="totalNumAmtN" />
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
          <el-table-column align="center" label="新增契约台数（交车）" prop="tableTwoName" />
          <el-table-column align="center" label="华东-车辆来源-新车①" prop="eastNewCarN" />
          <el-table-column align="center" label="华东-车辆来源-旧车②" prop="eastOldCarN" />
          <el-table-column align="center" label="华南-车辆来源-新车③" prop="southNewCarN" />
          <el-table-column align="center" label="华南-车辆来源-旧车④" prop="southOldCarN" />
          <el-table-column align="center" label="新增契约台数(①+②+③+④)" prop="totalNumAmtN" />
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
          <el-table-column align="center" label="保有客户台数（展期）" prop="tableName" />
          <el-table-column align="center" label="前月保有客户台数" prop="lmCusNumN" />
          <el-table-column align="center" label="新增业绩台数" prop="createNumN" />
          <el-table-column align="center" label="结清-期满解约" prop="endNumN" />
          <el-table-column align="center" label="结清-提前解约" prop="beforeEndNumN" />
          <el-table-column align="center" label="本月保有客户台数" prop="tmCusNumN" />
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCurrentMonthFirst, currentDate, dateToStringTwo, formatTwo } from '../../utils/dateSplice'
import { getUserAuto } from '../../utils/auth'
import { getThisMonthTar, getCarSourceRent } from '../../api/reportTable/formTwo'
import { getCustomerNum } from '../../api/reportTable/formThree'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'TableWeekTotalTb',
  computed: {
    ...mapGetters([
      'userAuto'
    ])
  },
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
  created() {
    this.getList()
  },
  methods: {
    queryDouble() {
      this.orderQuery.startDate = formatTwo(dateToStringTwo(this.orderQuery.startDate))
      this.orderQuery.endDate = formatTwo(dateToStringTwo(this.orderQuery.endDate))
      console.log(this.orderQuery.endDate)
    },
    getListTwo() {
      this.carQuery.startDate = this.orderQuery.startDate
      this.carQuery.endDate = this.orderQuery.endDate
      this.carQuery.typeQuery = 1
      getCarSourceRent(this.carQuery).then(response => {
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
      getCarSourceRent(this.carQuery).then(response => {
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
      getCustomerNum(this.cusQuery).then(response => {
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
      getThisMonthTar(this.orderQuery).then(response => {
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
