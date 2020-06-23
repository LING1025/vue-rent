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
    <div id="containerOne" style="width: 100%; height: 500px" />
    <div id="containerOnes" style="width: 100%; height: 500px" />
    <div id="containerZero" style="width: 100%; height: 500px" />
    <div id="containerZeros" style="width: 100%; height: 500px" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUserAuto } from '../../utils/auth'
import { dateTostring, format } from '../../utils/dateSplice' // 日期的查询
import { currentDate, getCurrentMonthFirst } from '../../utils/dateSplice' // 获取当天日期,获取当前月的第一天
import { getMode } from '../../api/reportTable/formOne'
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
      console.log(this.modeQuery.startDate)
      console.log(this.modeQuery.endDate)
    },
    getList() {
      this.queryDouble()
      this.modeQuery.orgUpAuto = 0
      this.modeQuery.orgAuto = 0
      getMode(this.modeQuery).then(response => {
        this.list = response.data
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
        this.drawZero()
      }).catch(() => {
        this.listLoading = false
      })
    },
    drawMode() {
      var a = []
      var b = []
      for (var i = 0; i < this.list.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (a.indexOf(this.list[i]) == -1) {
          a.push(this.list[i].pCount)
        }
        // eslint-disable-next-line eqeqeq
        if (b.indexOf(this.list[i]) == -1) {
          b.push(this.list[i].pMoney)
        }
        console.log(a)
        console.log(b)
      }
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
          data: [this.modeQuery.startDate.split('-')[1] - 1 + '月', this.modeQuery.startDate.split('-')[1] + '月']
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
            data: a
          },
          {
            name: this.modeQuery.startDate.split('-')[1] + '月',
            type: 'line',
            data: a
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
          data: [this.modeQuery.startDate.split('-')[1] - 1 + '月', this.modeQuery.startDate.split('-')[1] + '月']
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
            data: b
          },
          {
            name: this.modeQuery.startDate.split('-')[1] + '月',
            type: 'line',
            data: b
          }
        ]
      }
      // 绘制图表
      charts2.setOption(option2)
    },
    drawOne() {
      var a = []
      var b = []
      var c = []
      for (var i = 0; i < this.listClick.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (a.indexOf(this.listClick[i]) == -1) {
          a.push(this.listClick[i].proPaperNum)
        }
        // eslint-disable-next-line eqeqeq
        if (b.indexOf(this.listClick[i]) == -1) {
          b.push(this.listClick[i].realNum)
        }
        // eslint-disable-next-line eqeqeq
        if (c.indexOf(this.listClick[i]) == -1) {
          c.push(this.listClick[i].orgName)
        }
      }
      // 基于准备好的dom，初始化echarts实例 先npm安装，然后在main里
      const charts = this.$echarts.init(document.getElementById('containerOne'))
      const option = {
        title: {
          text: '租车台数/试算报件图表',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: ['报件数', '台数']
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
          data: c,
          // x轴标签旋转度数
          axisLabel: {
            rotate: 0
          },
          // x轴柱状图阴影
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'value',
          name: '报件数/台数'
        },
        series: [
          {
            name: '报件数',
            type: 'bar',
            data: a
          },
          {
            name: '台数',
            type: 'bar',
            data: b
          }
        ]
      }
      // 绘制图表
      charts.setOption(option)
    },
    drawZero() {
      var a = []
      var b = []
      var c = []
      for (var i = 0; i < this.listClickNext.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (a.indexOf(this.listClickNext[i]) == -1) {
          a.push(this.listClickNext[i].proPaperNum)
        }
        // eslint-disable-next-line eqeqeq
        if (b.indexOf(this.listClickNext[i]) == -1) {
          b.push(this.listClickNext[i].realNum)
        }
        // eslint-disable-next-line eqeqeq
        if (c.indexOf(this.listClickNext[i]) == -1) {
          c.push(this.listClickNext[i].fname)
        }
      }
      // 基于准备好的dom，初始化echarts实例 先npm安装，然后在main里
      const charts = this.$echarts.init(document.getElementById('containerZero'))
      const option = {
        title: {
          text: '租车台数/试算报件图表',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: ['报件数', '台数']
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
          data: c,
          // x轴标签旋转度数
          axisLabel: {
            rotate: 0
          },
          // x轴柱状图阴影
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'value',
          name: '报件数/台数'
        },
        series: [
          {
            name: '报件数',
            type: 'bar',
            data: a
          },
          {
            name: '台数',
            type: 'bar',
            data: b
          }
        ]
      }
      // 绘制图表
      charts.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
