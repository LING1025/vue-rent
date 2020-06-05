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
            <DateSelect  @keyup.enter.native="handleFilter"/>
          </el-col>
          <!--<el-col :span="4">
            <el-input v-model="listQuery.year" placeholder="年" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4">
            <el-input v-model="listQuery.month" placeholder="月" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>-->
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" stripe border fit min show-summary style="width: 100%">
          <el-table-column align="center" label="部门" prop="" />
          <el-table-column align="center" label="目标台数" prop="" />
          <el-table-column align="center" label="台数" prop="" />
          <el-table-column align="center" label="目标报件户数" prop="" />
          <el-table-column align="center" label="试算报件户数" prop="" />
          <el-table-column align="center" label="回租报件户数" prop="" />
          <el-table-column align="center" label="目标营业额" prop="" />
          <el-table-column align="center" label="营业额" prop="" />
          <el-table-column align="center" label="租_汰" prop="" />
          <el-table-column align="center" label="租_还" prop="" />
          <el-table-column align="center" label="维修_Y	" prop="" />
          <el-table-column align="center" label="新拓(乘用车)" prop="" />
          <el-table-column align="center" label="保有" prop="" />
          <el-table-column align="center" label="通路介绍（乘用车）" prop="" />
          <el-table-column align="center" label="轻货卡" prop="" />
          <el-table-column align="center" label="到_汰" prop="" />
          <el-table-column align="center" label="到_还" prop="" />
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import DateSelect from '../../components/DateSelect'

export default {
  name: 'Dashboard',
  components: {
    DateSelect
  },
  /* computed: {
    ...mapGetters([
      'name'
    ])
  }*/
  data() {
    return {
      listQuery: {
        year: '',
        month: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    getList() {
    },
    handleFilter() {
      this.getList()
    },
    handleQuery() {
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
