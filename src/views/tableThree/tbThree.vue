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
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { currentDate } from '../../utils/dateSplice'

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
    },
    exportExcel() {
      var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector('#tableOne'), xlsxParam)
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), currentDate() + '_' + '格上新增呆帳&回收报表.xlsx')
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
