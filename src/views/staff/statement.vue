<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-date-picker v-model="cusQuery.startDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择开始日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="cusQuery.endDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择结束日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
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
import { currentDate, dateTostring, format, getCurrentMonthFirst } from '../../utils/dateSplice'
import { getCustomerNum } from '../../api/reportTable/formThree'
export default {
  name: 'StaffStatement',
  data() {
    return {
      total: 0,
      tableData: null,
      listLoading: true,
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
      this.cusQuery.startDate = format(dateTostring(this.cusQuery.startDate))
      this.cusQuery.endDate = format(dateTostring(this.cusQuery.endDate))
    },
    getList() {
      this.queryDouble()
      getCustomerNum(this.cusQuery).then(response => {
        this.tableData = response.data
        this.total = response.data.total
        this.listLoading = false
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
