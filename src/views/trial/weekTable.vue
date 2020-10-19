<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-date-picker v-model="orderQuery.startDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择开始日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="orderQuery.endDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择结束日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
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
          <el-table-column align="center" label="客户来源-新拓①" prop="newExs" />
          <el-table-column align="center" label="客户来源-保有②" prop="retain" />
          <el-table-column align="center" label="客户来源-介绍③" prop="introduce" />
          <el-table-column align="center" label="新增契约租金(①+②+③)" prop="totalNumAmt" />
          <!--<el-table-column align="center" label="新增契约租金（交车）" prop="newOrderAmt" />
          <el-table-column align="center" label="当月目标" prop="thisMonGoal" />
          <el-table-column align="center" label="当月实绩" prop="thisMonReal" />
          <el-table-column align="center" label="结构比" prop="textureRatio" />
          <el-table-column align="center" label="达成率" prop="getRate" />
          <el-table-column align="center" label="上月实绩" prop="LastMonGoal" />
          <el-table-column align="center" label="环比" prop="linkRatio" />
          <el-table-column align="center" label="去年实绩" prop="LastYearGoal" />
          <el-table-column align="center" label="结构比" prop="textureRatioTwo" />
          <el-table-column align="center" label="同期比较" prop="compare" />-->
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dateTostring, format, getCurrentMonthFirst, currentDate } from '../../utils/dateSplice'
import { getUserAuto } from '../../utils/auth'
import { getThisMonthTar } from '../../api/reportTable/formTwo'

export default {
  name: 'TrialWeekTable',
  computed: {
    ...mapGetters([
      'userAuto'
    ])
  },
  data() {
    return {
      total: 0,
      tableData: null,
      listLoading: true,
      orderQuery: {
        userAuto: getUserAuto(),
        startDate: getCurrentMonthFirst(),
        endDate: currentDate(),
        orgAuto: 0,
        orgUpAuto: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    queryDouble() {
      this.orderQuery.startDate = format(dateTostring(this.orderQuery.startDate))
      this.orderQuery.endDate = format(dateTostring(this.orderQuery.endDate))
    },
    getList() {
      this.queryDouble()
      this.orderQuery.orgUpAuto = 0
      this.orderQuery.orgAuto = 0
      getThisMonthTar(this.orderQuery).then(response => {
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
