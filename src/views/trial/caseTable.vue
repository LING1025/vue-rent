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
              <el-option v-for="item in incListResponse" :key="item.incAuto" :label="item.sname" :value="item.incAuto" />
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
          <el-table-column align="center" label="业代" prop="fname" />
          <el-table-column align="center" label="契约编号" prop="orderNo" />
          <el-table-column align="center" label="承租人统编" prop="tradeItemAuto" />
          <el-table-column align="center" label="公司名称" prop="comFName" />
          <el-table-column align="center" label="是否是公司" prop="idenType" />
          <el-table-column align="center" label="所属公司" prop="sname" />
          <el-table-column align="center" label="状态" prop="statusName" />
          <el-table-column align="center" label="牌照号码" prop="makNo" />
          <el-table-column align="center" label="车种" prop="category" />
          <el-table-column align="center" label="客户来源" prop="custSource" />
          <el-table-column align="center" label="租赁性质" prop="rentType" />
          <el-table-column align="center" label="总厂牌" prop="factoryBrandName" />
          <el-table-column align="center" label="厂牌" prop="brandName" />
          <el-table-column align="center" label="车型" prop="clasenName" />
          <el-table-column align="center" label="车色" prop="carColor" />
          <el-table-column align="center" label="经销商" prop="sellerFName" />
          <el-table-column align="center" label="每月租金" prop="mamt" />
          <el-table-column align="center" label="总租金" prop="totalAmt" />
          <el-table-column align="center" label="领照日" prop="makDT" />
          <el-table-column align="center" label="牌价" prop="listPrice" />
          <el-table-column align="center" label="进价" prop="getPrice" />
          <el-table-column align="center" label="折价" prop="disPrice" />
          <el-table-column align="center" label="折价率" prop="disPriceTax" />
          <el-table-column align="center" label="配件" prop="accessary" />
          <el-table-column align="center" label="佣金" prop="pushMoney" />
          <el-table-column align="center" label="残值" prop="salvage" />
          <el-table-column align="center" label="保证金" prop="dptAmt" />
          <el-table-column align="center" label="月维修费" prop="carMtnAmt" />
          <el-table-column align="center" label="贷款金额" prop="loanAmount" />
          <el-table-column align="center" label="起租日" prop="startDT" />
          <el-table-column align="center" label="到期日" prop="endDT" />
          <el-table-column align="center" label="期数" prop="mm" />
          <el-table-column align="center" label="客户评等" prop="creditLevel" />
          <el-table-column align="center" label="申购单号" prop="orderAuto" />
          <el-table-column align="center" label="授信单号" prop="creditMainAuto" />
          <el-table-column align="center" label="合约编号" prop="contractNo" />
          <el-table-column align="center" label="交车日期" prop="forDT" />
          <el-table-column align="center" label="付款方式" prop="payType" />
          <el-table-column align="center" label="车辆来源" prop="carSource" />
          <el-table-column align="center" label="成交利率" prop="rentRate" />
          <el-table-column align="center" label="承作利率" prop="finalRate" />
          <el-table-column align="center" label="承作价格" prop="rentAmt" />
          <el-table-column align="center" label="实际利率" prop="bonusRate" />
          <el-table-column align="center" label="业务类别" prop="businessType" />
          <el-table-column align="center" label="试算业务类别" prop="businessOrdersType" />
          <el-table-column align="center" label="购置税实付金额" prop="realAmt" />
          <el-table-column align="center" label="配件实付金额" prop="accRealAmt" />
          <el-table-column align="center" label="业绩日" prop="yjCDT" />
          <el-table-column align="center" label="使用性质" prop="useType" />
          <el-table-column align="center" label="是否一次性租赁" prop="onetime" />
          <el-table-column align="center" label="专案" prop="projectName" />
          <el-table-column align="center" label="货车" prop="trucks" />
          <el-table-column align="center" label="公司型态" prop="comType" />
          <el-table-column align="center" label="保险期数" prop="insureMM" />
          <el-table-column align="center" label="保险金额" prop="insureAmt" />
          <el-table-column align="center" label="试算购置税金额" prop="carTax" />
          <el-table-column align="center" label="营业额" prop="inCome" />
          <el-table-column align="center" label="营业成本" prop="carCost" />
          <el-table-column align="center" label="营业费用" prop="budgetAmt" />
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
