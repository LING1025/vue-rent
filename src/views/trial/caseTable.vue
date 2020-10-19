<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <!--<el-col :span="4">
              <el-date-picker v-model="orderQuery.startDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择开始日期" style="width: 100%" @keyup.enter.native="handleFilter" />&lt;!&ndash;使用format指定输入框的格式；使用value-format指定绑定值的格式。&ndash;&gt;
            </el-col>
            <el-col :span="4">
              <el-date-picker v-model="orderQuery.endDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择结束日期" style="width: 100%" @keyup.enter.native="handleFilter" />&lt;!&ndash;使用format指定输入框的格式；使用value-format指定绑定值的格式。&ndash;&gt;
            </el-col>-->

          <el-col :span="3">
            <el-select v-model="execQuery.inc" clearable placeholder="请选择公司别" >
              <el-option v-for="item in incListResponse" :key="item.incAuto" :label="item.sname" :value="item.sname" />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="execQuery.type" clearable placeholder="请选择查询类别" >
              <el-option v-for="item in execTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="execQuery.year" clearable placeholder="请选择年份类别" >
              <el-option v-for="item in yearOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="execQuery.month" clearable placeholder="请选择月份" >
              <el-option v-for="item in monthOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-radio-group v-model="execQuery.flag">
              <el-radio :label="0" border>21-20</el-radio>
              <el-radio :label="1" border>整月</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="3">
            <el-input v-model="execQuery.customer" placeholder="请输入客户名称"/>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          v-loading="listLoading"
          :data="list"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column align="center" label="业务单位" prop="depName" />
          <el-table-column align="center" label="业代" prop="fName" />
          <el-table-column align="center" label="契约编号" prop="orderNo" />
          <el-table-column align="center" label="承租人统编" prop="tradeItemAuto" />
          <el-table-column align="center" label="公司名称" prop="comFName" />
          <el-table-column align="center" label="是否是公司" prop="idenType" />
          <el-table-column align="center" label="所属公司" prop="sName" />
          <el-table-column align="center" label="状态" prop="statusName" />
          <el-table-column align="center" label="牌照号码" prop="makNo" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
          <el-table-column align="center" label="新增契约租金" prop="newOrderAmt" />
        </el-table>
        <!--<el-table
          v-loading="listLoading"
          :data="list"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column align="center" label="新增契约租金（交车）" prop="newOrderAmt" />
          <el-table-column align="center" label="当月目标" prop="thisMonGoal" />
          <el-table-column align="center" label="当月实绩" prop="thisMonReal" />
          <el-table-column align="center" label="结构比" prop="textureRatio" />
          <el-table-column align="center" label="达成率" prop="getRate" />
          <el-table-column align="center" label="上月实绩" prop="LastMonGoal" />
          <el-table-column align="center" label="环比" prop="linkRatio" />
          <el-table-column align="center" label="去年实绩" prop="LastYearGoal" />
          <el-table-column align="center" label="结构比" prop="textureRatioTwo" />
          <el-table-column align="center" label="同期比较" prop="compare" />
        </el-table>-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getUserAuto } from '../../utils/auth'
import { getCaseExecList, getCompanyNameList } from '../../api/reportTable/formTwo'
import option from '@/variable/types'
// import { currentDate, dateTostring, format, getCurrentMonthFirst } from '../../utils/dateSplice'
// import { getMode } from '../../api/reportTable/formOne'

export default {
  name: 'TrialCaseTable',
  computed: {
    ...mapGetters([
      'userAuto'
    ])
  },
  data() {
    return {
      total: 0,
      list: null,
      listLoading: true,
      execTypeOptions: option.execTypeOption,
      monthOptions: option.monthOption,
      yearOptions: option.yearOption,
      execQuery: {
        inc: '',
        type: '',
        year: '',
        month: '',
        flag: 1,
        customer: ''
      },
      /** 公司别查询参数 */
      incListResponse: null,
      incListParam: {
        mode: 0,
        searchWord: ''
      }
      /* orderQuery: {
        userAuto: getUserAuto(),
        startDate: getCurrentMonthFirst(),
        endDate: currentDate(),
        orgAuto: 0,
        orgUpAuto: 0
      }*/
    }
  },
  created() {
    this.getList()
    this.getListSName()
  },
  methods: {
    /* queryDouble() {
      this.orderQuery.startDate = format(dateTostring(this.orderQuery.startDate))
      this.orderQuery.endDate = format(dateTostring(this.orderQuery.endDate))
    },*/
    getList() {
      getCaseExecList(this.execQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      /* this.queryDouble()
      this.orderQuery.orgUpAuto = 0
      this.orderQuery.orgAuto = 0
      getMode(this.orderQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })*/
    },
    /** 公司别下拉选 */
    getListSName() {
      getCompanyNameList(this.incListParam).then(response => {
        this.incListResponse = response.data
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
