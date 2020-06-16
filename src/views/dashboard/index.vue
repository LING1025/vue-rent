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
          <!--<el-col :span="4">
            <el-select v-model="listQuery.year" placeholder="请选择年份" class="filter-item" style="width: 100%" @visible-change="yearChange($event)">
              <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.month" placeholder="请选择月份" class="filter-item" style="width: 100%">
              <el-option v-for="item in monthOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>-->
          <el-col :span="4">
            <el-date-picker v-model="testQuery.startDate" type="date" value-format="yyyy-M-dd" placeholder="选择开始日期" @keyup.enter.native="handleFilter" style="width: 100%"/><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="testQuery.endDate" type="date" value-format="yyyy-M-dd" placeholder="选择结束日期" @keyup.enter.native="handleFilter" style="width: 100%"/><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" stripe border fit min style="width: 100%">
          <el-table-column align="center" label="部门" prop="orgName" />
          <el-table-column align="center" label="目标台数" prop="targetNum" />
          <el-table-column align="center" label="台数" prop="realNum" />
          <el-table-column align="center" label="目标报件户数" prop="targetPaperNum" />
          <el-table-column align="center" label="试算报件户数" prop="proPaperNum" />
          <!--          <el-table-column align="center" label="回租报件户数" prop="rentPaperNum" />-->
          <el-table-column align="center" label="目标营业额" prop="targetVolume" />
          <el-table-column align="center" label="营业额" prop="realVolume" />
          <!--<el-table-column align="center" label="租_汰" prop="rentOut" />
          <el-table-column align="center" label="租_还" prop="rentBack" />
          <el-table-column align="center" label="维修_Y	" prop="maintainNum" />
          <el-table-column align="center" label="新拓(乘用车)" prop="extension" />
          <el-table-column align="center" label="保有" prop="tenure" />
          <el-table-column align="center" label="通路介绍（乘用车）" prop="instrNum" />
          <el-table-column align="center" label="轻货卡" prop="carGo" />
          <el-table-column align="center" label="到_汰" prop="getOut" />
          <el-table-column align="center" label="到_还" prop="getBack" />-->
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="row">
              <el-button type="text" size="small" @click="handleClick(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="this.listClick == null ? false : true" v-loading="listLoading" :data="listClick" stripe border fit min style="width: 100%">
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
        <el-table v-show="this.listClickNext == null ? false : true" v-loading="listLoading" :data="listClickNext" stripe border fit min style="width: 100%">
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
    <div ref="main" class="container" style="width: 1000px; height: 500px" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import echarts from 'echarts'
import { getOne, getTwo, getZero } from '../../api/reportTable/formOne'
import typeOption from '../../variable/types'

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
      monthOptions: typeOption.monthOption,
      years: [],
      listQuery: {
        year: '',
        month: '',
        startDate: '',
        endDate: ''
      },
      testQuery: {
        startDate: '',
        endDate: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listQuery.year = this.testQuery.startDate.split('-')[0]
      this.listQuery.month = this.testQuery.startDate.split('-')[1]
      this.listQuery.startDate = this.testQuery.startDate
      this.listQuery.endDate = this.testQuery.endDate
      getTwo(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 年份月份下拉拆分
    /* yearChange() {
      var myDate = new Date()
      var startYear = myDate.getFullYear() - 15// 起始年份
      var endYear = myDate.getFullYear() + 15// 结束年份

      this.years = []
      for (var i = startYear; i <= endYear; i++) {
        this.years.push({ value: (i), label: (i) + '年' })
      }
    },*/
    handleFilter() {
      this.getList()
    },
    handleClick() {
      this.listQuery.year = this.testQuery.startDate.split('-')[0]
      this.listQuery.month = this.testQuery.startDate.split('-')[1]
      this.listQuery.startDate = this.testQuery.startDate
      this.listQuery.endDate = this.testQuery.endDate
      getOne(this.listQuery).then(response => {
        this.listClick = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClickNext() {
      this.listQuery.year = this.testQuery.startDate.split('-')[0]
      this.listQuery.month = this.testQuery.startDate.split('-')[1]
      this.listQuery.startDate = this.testQuery.startDate
      this.listQuery.endDate = this.testQuery.endDate
      getZero(this.listQuery).then(response => {
        this.listClickNext = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    charts(container, option) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(container)
      // 绘制图表
      myChart.setOption(option)
    }
  },
  mounted() {
    const option = {
      title: {
        text: '租车台数/试算报件图表'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
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
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '报件数',
          type: 'line',
          stack: '总量',
          data: [10, 12, 40, 23, 30, 52, 36]
        },
        {
          name: '台数',
          type: 'line',
          stack: '总量',
          data: [120, 232, 201, 134, 190, 130, 220]
        }
      ]
    }
    this.charts(this.$refs.main, option)
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
