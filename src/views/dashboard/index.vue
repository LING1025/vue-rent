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
            <DateSelect @keyup.enter.native="handleFilter" />
          </el-col>-->
          <el-col :span="4">
            <el-input v-model="listQuery.year" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="1">
            <span>年</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="listQuery.month" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="1">
            <span>月</span>
          </el-col>
          <!--<el-col :span="4">
            <el-input v-model="listQuery.startDate" placeholder="开始日期" clearable maxlength="30" @keyup.enter.native="handleFilter" />
            &lt;!&ndash;            <el-date-picker v-model="listQuery.startDate" clearable type="date" placeholder="请选择开始日期" />&ndash;&gt;
          </el-col>
          <el-col :span="4">
            <el-input v-model="listQuery.endDate" placeholder="结束日期" clearable maxlength="30" @keyup.enter.native="handleFilter" />
            &lt;!&ndash;            <el-date-picker v-model="listQuery.endDate" clearable type="date" placeholder="请选择结束日期" />&ndash;&gt;
          </el-col>-->
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
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import DateSelect from '../../components/DateSelect'
import { getOne } from '../../api/reportTable/formOne'

export default {
  name: 'Dashboard',
  /* components: {
    DateSelect
  },*/
  /* computed: {
    ...mapGetters([
      'name'
    ])
  }*/
  data() {
    return {
      total: 0,
      list: null,
      listLoading: true,
      listQuery: {
        year: '',
        month: ''/*,
        startDate: '',
        endDate: ''*/
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getOne(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleClick(row) {
      console.log(row)
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
