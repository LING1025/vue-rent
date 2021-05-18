<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-date-picker v-model="proQuery.startDT" type="date" value-format="yyyy-MM-dd" placeholder="请选择开始日期" style="width: 100%" @change="onChangeInput" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="proQuery.endDT" type="date" value-format="yyyy-MM-dd" placeholder="请选择结束日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-select v-model="proQuery.projectName" clearable filterable placeholder="请选择专案名称">
              <el-option v-for="item in proNameListResponse" :key="item.projectAuto" :label="item.projectName" :value="item.projectName" />
            </el-select>
          </el-col>
          <el-col :span="6">
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
          :data="list"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column align="center" label="试算单号" prop="ordersAuto" />
          <el-table-column align="center" label="客户名称" prop="customer" />
          <el-table-column align="center" label="部门" prop="depName" />
          <el-table-column align="center" label="业代" prop="ydName" />
          <el-table-column align="center" label="状态" prop="orderStatusN" />
          <el-table-column align="center" label="公司别" prop="incName" />
          <el-table-column align="center" label="厂牌" prop="brandName" />
          <el-table-column align="center" label="车型" prop="clasenName" />
          <el-table-column align="center" label="案件别" prop="postTypeN" />
          <el-table-column align="center" label="车辆来源" prop="carSourceN" />
          <el-table-column align="center" label="业务类别" prop="orderTypeN" />
          <el-table-column align="center" label="客户来源" prop="custSourceN" />
          <el-table-column align="center" label="月租金" prop="mamt" />
          <el-table-column align="center" label="期数" prop="mm" />
          <el-table-column align="center" label="建档日" prop="createDate" />
          <el-table-column align="center" label="专案名" prop="projectName" />
          <el-table-column align="center" label="保证金比例" prop="bzjRate" />
          <el-table-column align="center" label="成交利率" prop="rentRate" />
          <el-table-column align="center" label="客户评级" prop="incLev" />
          <el-table-column align="center" label="企业类别" prop="cusTypeN" />
          <el-table-column align="center" label="成立日期" prop="comEstDate" />
          <el-table-column align="center" label="注册资本额" prop="comMoney" />
          <el-table-column align="center" label="产业类别" prop="industryCodeN" />
          <el-table-column align="center" label="设立地址" prop="createAddress" />
          <el-table-column align="center" label="负责人" prop="bossName" />
          <el-table-column align="center" label="年龄" prop="bossAge" />
          <el-table-column align="center" label="籍贯" prop="bossNativePlace" />
          <el-table-column align="center" label="学历" prop="bossEducationN" />
          <el-table-column align="center" label="婚姻状况" prop="bossMaritalStatusN" />
          <el-table-column align="center" label="工作年限" prop="bossWorkingYearsN" />
          <el-table-column align="center" label="保人(是否有)" prop="isGuarantor" />
          <el-table-column align="center" label="车辆用途" prop="carUser" />
          <el-table-column align="center" label="入账日期" prop="realIncomeDT" />
          <el-table-column align="center" label="入金件数" prop="goldNum" />
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { currentDate, getCurrentMonthFirst } from '../../utils/dateSplice'
import { getProNameList, getProList } from '../../api/reportTable/formFour'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

export default {
  name: 'TableFourTbFour',
  data() {
    return {
      total: 0,
      list: null,
      listClick: null,
      listLoading: false,
      proQuery: {
        startDT: getCurrentMonthFirst(),
        endDT: currentDate(),
        projectName: ''
      },
      /* 专案名称下拉选查询参数*/
      proNameListResponse: null,
      proNameListParam: {
        projectName: ''
      }
    }
  },
  created() {
    this.getProNameList()
  },
  methods: {
    getProNameList() {
      getProNameList(this.proNameListParam).then(response => {
        this.proNameListResponse = response.data
      })
    },
    getList() {
      getProList(this.proQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listLoading = true
      this.getList()
    },
    exportExcel() {
      var xlsxParam = { raw: true }
      var wb = XLSX.utils.table_to_book(document.querySelector('#tableOne'), xlsxParam)
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), currentDate() + '_' + '专案明细.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>

<style scoped>

</style>
