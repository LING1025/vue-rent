<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-date-picker v-model="modeQuery.startDate" type="date" placeholder="请选择开始日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="modeQuery.endDate" type="date" placeholder="请选择结束日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          v-loading="listLoading"
          :data="list"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          show-summary
          :summary-method="getSummaries"
          :cell-style="rowRed"
          :cell-class-name="tableRowClassName"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column width="200px" align="center" label="部门" prop="orgName" />
          <el-table-column align="center" label="目标报件数" prop="targetPaperNum" />
          <el-table-column align="center" label="报件数" prop="proPaperNum" />
          <el-table-column align="center" label="报件达成率" prop="plv" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="达成台数" prop="realNum" />
          <el-table-column align="center" label="台数达成率" prop="clv" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="达成营业额" prop="realVolume" />
          <el-table-column align="center" label="营业额达成率" prop="vlv" />
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="this.listClick == null ? false : true"
          v-loading="listLoading"
          :data="listClick"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          :cell-style="rowRed2"
          :cell-class-name="tableRowClassName2"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column width="200px" align="center" label="课" prop="orgName" />
          <el-table-column align="center" label="目标报件数" prop="targetPaperNum" />
          <el-table-column align="center" label="报件数" prop="proPaperNum" />
          <el-table-column align="center" label="报件达成率" prop="plv" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="达成台数" prop="realNum" />
          <el-table-column align="center" label="台数达成率" prop="clv" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="达成营业额" prop="realVolume" />
          <el-table-column align="center" label="营业额达成率" prop="vlv" />
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClickNext(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="this.listClickNext == null ? false : true"
          v-loading="listLoading"
          :data="listClickNext"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column width="200px" align="center" label="业代" prop="fname" />
          <el-table-column align="center" label="目标报件数" prop="targetPaperNum" />
          <el-table-column align="center" label="报件数" prop="proPaperNum" />
          <el-table-column align="center" label="报件达成率" prop="plv" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="达成台数" prop="realNum" />
          <el-table-column align="center" label="台数达成率" prop="clv" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="达成营业额" prop="realVolume" />
          <el-table-column align="center" label="营业额达成率" prop="vlv" />
        </el-table>
      </el-main>
    </el-container>
    <div id="containerMode" style="width: 100%; height: 500px" />
    <div id="containerModes" style="width: 100%; height: 500px" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUserAuto } from '../../utils/auth'
import { dateTostring, format } from '../../utils/dateSplice' // 日期的查询
import { currentDate, getCurrentMonthFirst } from '../../utils/dateSplice' // 获取当天日期,获取当前月的第一天
import { getMode, getMonth } from '../../api/reportTable/formOne'
// import typeOption from '../../variable/types'

export default {
  name: 'TrialOpTable',
  computed: {
    ...mapGetters([
      'userAuto'
    ])
  },
  data() {
    return {
      tabBg: '', // 选择的行数下标
      tabBg2: '',
      orgNameTable: '', // 第一个表格的部门名称
      orgNameTable2: '',
      total: 0,
      list: null,
      listClick: null,
      listClickNext: null,
      listTrial: null,
      listLastMonth: null,
      listLoading: true,
      flag: false,
      flag2: false,
      flag3: false,
      getIndex: '',
      modeQuery: {
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
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '合计' // 第一列显示 合计
          return
        }
        const values = data.map(item => Number(item[columns.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          if (index === 3) {
            sums[index] = ((sums[2] / sums[1]) * 100).toFixed(0) + '%'
          }
          if (index === 6) {
            sums[index] = ((sums[5] / sums[4]) * 100).toFixed(0) + '%'
          }
          if (index === 9) {
            sums[index] = ((sums[8] / sums[7]) * 100).toFixed(0) + '%'
          }
        }
      })
      return sums // 最后返回合计行的数据
    },
    queryDouble() {
      this.modeQuery.startDate = format(dateTostring(this.modeQuery.startDate))
      this.modeQuery.endDate = format(dateTostring(this.modeQuery.endDate))
    },
    getList() {
      // 点击查询图标名称中 部门名、课不显示
      this.orgNameTable = ''
      this.orgNameTable2 = ''
      this.tabBg = ''
      this.queryDouble()
      this.modeQuery.orgUpAuto = 0
      this.modeQuery.orgAuto = 0
      getMode(this.modeQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      getMonth(this.modeQuery).then(response => {
        this.listTrial = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawMode()
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      // 点击查询按钮，课和业代的表就会消失
      this.listClick = null
      this.listClickNext = null
      this.getList()
    },
    handleClick(row) {
      this.orgNameTable2 = ''
      this.listClickNext = null
      this.tabBg = row.index // 选中的行
      this.queryDouble()
      this.modeQuery.orgAuto = 0
      this.modeQuery.orgUpAuto = row.orgAuto
      getMode(this.modeQuery).then(response => {
        this.listClick = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      getMonth(this.modeQuery).then(response => {
        this.listTrial = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawOne()
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 点击改变行背景色
    rowRed({ row, rowIndex }) {
      if (rowIndex === this.tabBg) {
        this.orgNameTable = row.orgName
        this.tabBg2 = ''
        return { backgroundColor: 'rgba(175,177,179,0.51)' }
      }
    },
    // 获取数据的下标
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
      this.tabBg2 = ''
    },
    handleClickNext(row) {
      this.tabBg2 = row.index // 选中的行
      this.queryDouble()
      this.modeQuery.orgUpAuto = 0
      this.modeQuery.orgAuto = row.orgAuto
      getMode(this.modeQuery).then(response => {
        this.listClickNext = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      getMonth(this.modeQuery).then(response => {
        this.listTrial = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawZero()
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 点击改变行背景色
    rowRed2({ row, rowIndex }) {
      if (rowIndex === this.tabBg2) {
        this.orgNameTable2 = row.orgName
        return { backgroundColor: 'rgba(175,177,179,0.51)' }
      }
    },
    // 获取数据的下标
    tableRowClassName2({ row, rowIndex }) {
      row.index = rowIndex
    },
    draws() {
      // 年份
      // eslint-disable-next-line no-unused-vars
      var bYear = this.modeQuery.endDate.split('-')[0]
      // 本月
      var bMonth = this.modeQuery.startDate.slice(6, 7)
      // 上个月
      var sMonth = bMonth - 1
      // eslint-disable-next-line eqeqeq
      if (sMonth == 0) {
        sMonth = 12
      }
      var taiNums = [] // 当月台数
      var money = [] // 当月金额
      var taiNumsLastMon = [] // 上个月台数
      var moneyLastMon = [] // 上个月金额
      var riqi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      // 结束日期等于当天日期时
      // eslint-disable-next-line eqeqeq
      if (this.modeQuery.endDate == currentDate()) {
        var newRiqi = []
        for (var h = 1; h <= this.modeQuery.endDate.split('-')[2]; h++) {
          newRiqi.push(h)
        }
        for (var g = 0; g < newRiqi.length; g++) {
          this.flag3 = false
          // 当月
          for (var f = 0; f < this.listTrial.thisMonth.length; f++) {
            // eslint-disable-next-line eqeqeq
            if (newRiqi[g] == this.listTrial.thisMonth[f].days) {
              taiNums.push(this.listTrial.thisMonth[f].pcount)
              money.push(this.listTrial.thisMonth[f].pmoney)
              this.flag3 = true
            }
          }
          if (!this.flag3) {
            taiNums.push(0)
            money.push(0)
          }
        }
      } else {
        // 获取月份天数
        var d = new Date(bYear, bMonth, 0)
        var mDays = []
        for (var md = 1; md <= d.getDate(); md++) {
          mDays.push(md)
        }
        for (var i = 0; i < mDays.length; i++) {
          this.flag = false
          // 当月
          for (var j = 0; j < this.listTrial.thisMonth.length; j++) {
            // eslint-disable-next-line eqeqeq
            if (mDays[i] == this.listTrial.thisMonth[j].days) {
              taiNums.push(this.listTrial.thisMonth[j].pcount)
              money.push(this.listTrial.thisMonth[j].pmoney)
              this.flag = true
            }
          }
          if (!this.flag) {
            taiNums.push(0)
            money.push(0)
          }
        }
      }
      // 获取上个月天数
      var dl = new Date(bYear, sMonth, 0)
      var mlDays = []
      for (var mdl = 1; mdl <= dl.getDate(); mdl++) {
        mlDays.push(mdl)
      }
      for (var e = 0; e < mlDays.length; e++) {
        this.flag2 = false
        // 上个月
        for (var k = 0; k < this.listTrial.lastMonth.length; k++) {
          // eslint-disable-next-line eqeqeq
          if (mlDays[e] == this.listTrial.lastMonth[k].daysLast) {
            taiNumsLastMon.push(this.listTrial.lastMonth[k].pcountLast)
            moneyLastMon.push(this.listTrial.lastMonth[k].pmoneyLast)
            this.flag2 = true
          }
        }
        if (!this.flag2) {
          taiNumsLastMon.push(0)
          moneyLastMon.push(0)
        }
      }
      // eslint-disable-next-line no-unused-vars
      var pcSum = 0
      var cs = []
      for (var pc = 0; pc < taiNums.length; pc++) {
        pcSum += taiNums[pc]
        cs.push(pcSum) // 本月台数
      }
      var pmSum = 0
      var ms = []
      for (var pm = 0; pm < money.length; pm++) {
        pmSum += money[pm] // 本月金额
        ms.push(pmSum)
      }

      // eslint-disable-next-line no-unused-vars
      var pclSum = 0
      var cls = []
      for (var pcl = 0; pcl < taiNumsLastMon.length; pcl++) {
        pclSum += taiNumsLastMon[pcl]
        cls.push(pclSum) // 上个月台数
      }
      var pmlSum = 0
      var mls = []
      for (var pml = 0; pml < moneyLastMon.length; pml++) {
        pmlSum += moneyLastMon[pml] // 上个月金额
        mls.push(pmlSum)
      }
      /* console.log('本月台数')
      console.log(cs)
      console.log('本月金额')
      console.log(ms)
      console.log('上个月台数')
      console.log(cls)
      console.log('上个月金额')
      console.log(mls)*/
      const charts = this.$echarts.init(document.getElementById('containerMode'))
      const option = {
        title: {
          text: this.orgNameTable + '业绩台数图表',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: [bMonth + '月', sMonth + '月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: riqi,
          // x轴柱状图阴影
          axisPointer: {
            type: 'line'
          }
        },
        yAxis: {
          type: 'value',
          name: '台数'
        },
        series: [
          {
            name: bMonth + '月',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#a80000',
                lineStyle: {
                  color: '#a80000'
                }
              }
            },
            data: cs
          },
          {
            name: sMonth + '月',
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(23,95,168,0.82)',
                lineStyle: {
                  color: 'rgba(23,95,168,0.82)'
                }
              }
            },
            data: cls
          }
        ]
      }
      const option3 = {
        title: {
          text: this.orgNameTable2 + '业绩台数图表',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: [bMonth + '月', sMonth + '月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: riqi,
          // x轴柱状图阴影
          axisPointer: {
            type: 'line'
          }
        },
        yAxis: {
          type: 'value',
          name: '台数'
        },
        series: [
          {
            name: bMonth + '月',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#a80000',
                lineStyle: {
                  color: '#a80000'
                }
              }
            },
            data: cs
          },
          {
            name: sMonth + '月',
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(23,95,168,0.82)',
                lineStyle: {
                  color: 'rgba(23,95,168,0.82)'
                }
              }
            },
            data: cls
          }
        ]
      }

      const charts2 = this.$echarts.init(document.getElementById('containerModes'))
      const option2 = {
        title: {
          text: this.orgNameTable + '业绩金额图表',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: [bMonth + '月', sMonth + '月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: riqi,
          // x轴柱状图阴影
          axisPointer: {
            type: 'line'
          }
        },
        yAxis: {
          type: 'value',
          name: '金额'
        },
        series: [
          {
            name: bMonth + '月',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#a80000',
                lineStyle: {
                  color: '#a80000'
                }
              }
            },
            data: ms
          },
          {
            name: sMonth + '月',
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(23,95,168,0.82)',
                lineStyle: {
                  color: 'rgba(23,95,168,0.82)'
                }
              }
            },
            data: mls
          }
        ]
      }
      const option4 = {
        title: {
          text: this.orgNameTable2 + '业绩金额图表',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: [bMonth + '月', sMonth + '月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: riqi,
          // x轴柱状图阴影
          axisPointer: {
            type: 'line'
          }
        },
        yAxis: {
          type: 'value',
          name: '金额'
        },
        series: [
          {
            name: bMonth + '月',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#a80000',
                lineStyle: {
                  color: '#a80000'
                }
              }
            },
            data: ms
          },
          {
            name: sMonth + '月',
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(23,95,168,0.82)',
                lineStyle: {
                  color: 'rgba(23,95,168,0.82)'
                }
              }
            },
            data: mls
          }
        ]
      }
      // 绘制图表
      if (this.orgNameTable2 === '') {
        charts.setOption(option)
        charts2.setOption(option2)
      }
      if (this.orgNameTable2 !== '') {
        charts.setOption(option3)
        charts2.setOption(option4)
      }
    },
    drawMode() {
      this.draws()
    },
    drawOne() {
      this.draws()
    },
    drawZero() {
      this.draws()
    }
  }
}
</script>

<style>
  /*.el-table__body tr.current-row>td{
    background-color: rgba(175, 177, 179, 0.66) !important;
  }*/
</style>
