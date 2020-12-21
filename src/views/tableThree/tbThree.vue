<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-select v-model="listQuery.year" clearable placeholder="==请选择年份==">
              <el-option v-for="item in yearOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.week" clearable placeholder="==请选择周==">
              <el-option v-for="item in weekOptions" :key="item.key" :label="item.display_name" :value="item.display_name" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
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
          <el-table-column align="center" label="周期" prop="weekNo" />
          <el-table-column align="center" label="新增呆账(件数)" prop="ruDaiCount" />
          <el-table-column align="center" label="新增呆账(金额)" prop="ruDaiAmt" />
          <el-table-column align="center" label="呆账回收(金额)" prop="backAmt" />
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import option from '@/variable/types'
import { getYearList } from '../../api/reportTable/formThree'

export default {
  name: 'TableThreeTbThree',
  data() {
    return {
      total: 0,
      list: null,
      listLoading: true,
      yearOptions: option.yearOption,
      weekOptions: option.weekOption,
      listQuery: {
        year: '2020年',
        week: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getYearList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
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
