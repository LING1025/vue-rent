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
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column align="center" label="部门" prop="orgName" />
          <el-table-column align="center" label="目标报件数" prop="targetPaperNum" />
          <el-table-column align="center" label="报件数" prop="proPaperNum" />
          <el-table-column align="center" label="报件达成率" prop="paperLv" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="达成台数" prop="realNum" />
          <el-table-column align="center" label="台数达成率" prop="countLv" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="达成营业额" prop="realVolume" />
          <el-table-column align="center" label="营业额达成率" prop="volumeLv" />
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
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column align="center" label="课" prop="orgName" />
          <el-table-column align="center" label="目标报件数" prop="targetPaperNum" />
          <el-table-column align="center" label="报件数" prop="proPaperNum" />
          <el-table-column align="center" label="报件达成率" prop="paperLv" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="达成台数" prop="realNum" />
          <el-table-column align="center" label="台数达成率" prop="countLv" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="达成营业额" prop="realVolume" />
          <el-table-column align="center" label="营业额达成率" prop="volumeLv" />
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
          <el-table-column align="center" label="业代" prop="fname" />
          <el-table-column align="center" label="目标报件数" prop="targetPaperNum" />
          <el-table-column align="center" label="报件数" prop="proPaperNum" />
          <el-table-column align="center" label="报件达成率" prop="paperLv" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="达成台数" prop="realNum" />
          <el-table-column align="center" label="台数达成率" prop="countLv" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="达成营业额" prop="realVolume" />
          <el-table-column align="center" label="营业额达成率" prop="volumeLv" />
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
import { getMode, getTrail } from '../../api/reportTable/formOne'
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
      total: 0,
      list: null,
      listClick: null,
      listClickNext: null,
      listTrial: null,
      listLastMonth: null,
      listLoading: true,
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
    queryDouble() {
      this.modeQuery.startDate = format(dateTostring(this.modeQuery.startDate))
      this.modeQuery.endDate = format(dateTostring(this.modeQuery.endDate))
    },
    getList() {
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
      getTrail(this.modeQuery).then(response => {
        this.listTrial = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawMode()
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleClick(row) {
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
      getTrail(this.modeQuery).then(response => {
        this.listTrial = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawOne()
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClickNext(row) {
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
      getTrail(this.modeQuery).then(response => {
        this.listTrial = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawZero()
      }).catch(() => {
        this.listLoading = false
      })
    },
    draws() {
      var taiNums = []
      var money = []
      var taiNumsLastMon = []
      var moneyLastMon = []
      for (var i = 0; i < this.listTrial.length; i++) {
        for (var j = 1; j <= 31; j++) { // 1-31号
          // 本月
          // eslint-disable-next-line eqeqeq
          if (this.listTrial[i].yearMon === this.modeQuery.startDate.slice(0, 7)) {
            if (this.listTrial[i].days !== j) {
              if (this.listTrial[i].days > j) {
                taiNums.push(0)
                money.push(0)
              }
              if (this.listTrial[i].days < j) {
                taiNums.push(this.listTrial[i].pcount)
                money.push(this.listTrial[i].pmoney)
              }
            }
            // eslint-disable-next-line eqeqeq
            if (this.listTrial[i].days == j) {
              taiNums.push(this.listTrial[i].pcount)
              money.push(this.listTrial[i].pmoney)
            }
          }
          // 上个月
          if (this.listTrial[i].yearMon !== this.modeQuery.startDate.slice(0, 7)) {
            if (this.listTrial[i].days !== j) {
              if (this.listTrial[i].days > j) {
                taiNumsLastMon.push(0)
                moneyLastMon.push(0)
              }
              if (this.listTrial[i].days < j) {
                taiNumsLastMon.push(this.listTrial[i].pcount)
                moneyLastMon.push(this.listTrial[i].pmoney)
              }
            }
            // eslint-disable-next-line eqeqeq
            if (this.listTrial[i].days == j) {
              taiNumsLastMon.push(this.listTrial[i].pcount)
              moneyLastMon.push(this.listTrial[i].pmoney)
            }
          }
        }
      }
      console.log(taiNums)
      console.log(taiNumsLastMon)
      console.log(money)
      console.log(moneyLastMon)
      const charts = this.$echarts.init(document.getElementById('containerMode'))
      const option = {
        title: {
          text: '业绩台数图表',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: [this.modeQuery.startDate.split('-')[1] - 1 + '月', this.modeQuery.startDate.slice(6, 7) + '月']
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
          data: (function() {
            var list = []
            for (var i = 1; i <= 31; i++) {
              list.push(i + '日')
            }
            return list
          }()),
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
            name: this.modeQuery.startDate.split('-')[1] - 1 + '月',
            type: 'line',
            data: taiNumsLastMon
          },
          {
            name: this.modeQuery.startDate.slice(6, 7) + '月',
            type: 'line',
            data: taiNums
          }
        ]
      }
      // 绘制图表
      charts.setOption(option)

      const charts2 = this.$echarts.init(document.getElementById('containerModes'))
      const option2 = {
        title: {
          text: '业绩金额图表',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: [this.modeQuery.startDate.split('-')[1] - 1 + '月', this.modeQuery.startDate.slice(6, 7) + '月']
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
          data: (function() {
            var list = []
            for (var i = 1; i <= 31; i++) {
              list.push(i + '日')
            }
            return list
          }()),
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
            name: this.modeQuery.startDate.split('-')[1] - 1 + '月',
            type: 'line',
            data: moneyLastMon
          },
          {
            name: this.modeQuery.startDate.slice(6, 7) + '月',
            type: 'line',
            data: money
          }
        ]
      }
      // 绘制图表
      charts2.setOption(option2)
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

<style scoped>

</style>
