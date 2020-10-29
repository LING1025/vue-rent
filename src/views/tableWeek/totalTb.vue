<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-date-picker v-model="orderQuery.startDate" type="date" format="yyyy/MM/dd" placeholder="请选择开始日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="orderQuery.endDate" type="date" format="yyyy/MM/dd" placeholder="请选择结束日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
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
    }
  }
}
</script>

<style scoped>

</style>
