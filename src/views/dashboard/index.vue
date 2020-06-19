<template>
  <!--<div class="dashboard-container">
&lt;!&ndash;    <div class="dashboard-text">登录用户名: {{ name }}</div>&ndash;&gt;
    <div class="dashboard-logo">
      <img width="1000" height="500" alt="logo" src="../../icons/tu1.png">
      <p>长租系统 V2.0&nbsp;&nbsp;&nbsp;数据管理中心</p>
    </div>
  </div>-->
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-date-picker v-model="testQuery.dateGet" type="month" value-format="yyyy-MM-dd" placeholder="请选择月份" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" :header-cell-style="{background:'#336699',color:'#FFFFFF'}" height="250" show-summary stripe border fit min style="width: 100%">
          <el-table-column align="center" label="部门" prop="orgName" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="台数" prop="realNum" />
          <el-table-column align="center" label="目标报件户数" prop="targetPaperNum" />
          <el-table-column align="center" label="试算报件户数" prop="proPaperNum" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="营业额" prop="realVolume" />
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="row">
              <el-button type="text" size="small" @click="handleClick(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="this.listClick == null ? false : true"
          v-loading="listLoading"
          :data="listClick"
          :header-cell-style="{background:'#336699',color:'#FFFFFF'}"
          height="250"
          show-summary
          stripe
          border
          fit
          min
          style="width: 100%"
        >
          <el-table-column align="center" label="课" prop="orgName" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="台数" prop="realNum" />
          <el-table-column align="center" label="目标报件户数" prop="targetPaperNum" />
          <el-table-column align="center" label="试算报件户数" prop="proPaperNum" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="营业额" prop="realVolume" />
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope>
              <el-button type="text" size="small" @click="handleClickNext">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="this.listClickNext == null ? false : true" v-loading="listLoading" :data="listClickNext" :header-cell-style="{background:'#336699',color:'#FFFFFF'}" height="250" stripe border fit min style="width: 100%">
          <el-table-column align="center" label="业代" prop="fname" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="台数" prop="realNum" />
          <el-table-column align="center" label="目标报件户数" prop="targetPaperNum" />
          <el-table-column align="center" label="试算报件户数" prop="proPaperNum" />
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="营业额" prop="realVolume" />
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope>
              <el-button type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <div id="containerTwo" style="width: 100%; height: 500px" />
    <div id="containerOne" style="width: 100%; height: 500px" />
    <div id="containerZero" style="width: 100%; height: 500px" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getOne, getTwo, getZero } from '../../api/reportTable/formOne'
// import typeOption from '../../variable/types'

export default {
  name: 'Dashboard',
  /* computed: {
      ...mapGetters([
        'name'
      ])
    }*/
  data() {
    return {
      total: 0,
      list: null,
      listClick: null,
      listClickNext: null,
      listLoading: true,
      listQuery: {
        year: '',
        month: '',
        startDate: '',
        endDate: ''
      },
      testQuery: {
        dateGet: new Date()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    queryDouble() {
      this.listQuery.year = this.testQuery.dateGet.split('-')[0]
      this.listQuery.month = this.testQuery.dateGet.split('-')[1]
      var lastDay = new Date(this.listQuery.year, this.listQuery.month, 0).getDate()
      this.listQuery.startDate = this.testQuery.dateGet
      this.listQuery.endDate = this.testQuery.dateGet.slice(0, 8) + lastDay.toString()
    },
    getList() {
      this.queryDouble()
      getTwo(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawTwo()
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleClick() {
      this.queryDouble()
      getOne(this.listQuery).then(response => {
        this.listClick = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawOne()
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClickNext() {
      this.queryDouble()
      getZero(this.listQuery).then(response => {
        this.listClickNext = response.data
        this.total = response.data.total
        this.listLoading = false
        this.drawZero()
      }).catch(() => {
        this.listLoading = false
      })
    },
    drawTwo() {
      var a = []
      var b = []
      var c = []
      for (var i = 0; i < this.list.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (a.indexOf(this.list[i]) == -1) {
          a.push(this.list[i].proPaperNum)
        }
        // eslint-disable-next-line eqeqeq
        if (b.indexOf(this.list[i]) == -1) {
          b.push(this.list[i].realNum)
        }
        // eslint-disable-next-line eqeqeq
        if (c.indexOf(this.list[i]) == -1) {
          c.push(this.list[i].orgName)
        }
      }
      // 基于准备好的dom，初始化echarts实例 先npm安装，然后在main里
      const charts = this.$echarts.init(document.getElementById('containerTwo'))
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
          axisLabel: {
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          name: '报件数/台数'
        },
        series: [
          {
            name: '报件数',
            type: 'line',
            data: a
          },
          {
            name: '台数',
            type: 'line',
            data: b
          }
        ]
      }
      // 绘制图表
      charts.setOption(option)
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
          axisLabel: {
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          name: '报件数/台数'
        },
        series: [
          {
            name: '报件数',
            type: 'line',
            data: a
          },
          {
            name: '台数',
            type: 'line',
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
          axisLabel: {
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          name: '报件数/台数'
        },
        series: [
          {
            name: '报件数',
            type: 'line',
            data: a
          },
          {
            name: '台数',
            type: 'line',
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
  /*.dashboard {
    position: relative;
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
    &-logo {
      position: absolute;
      top: 80px;
      left: 160px;
      text-align: center;
    }
  }*/
</style>
