<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-date-picker v-model="proQuery.startDT" type="date" value-format="yyyy-MM-dd" placeholder="请选择开始日期" @change="onChangeInput" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="proQuery.endDT" type="date" value-format="yyyy-MM-dd" placeholder="请选择结束日期" style="width: 100%" @keyup.enter.native="handleFilter" /><!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          </el-col>
          <el-col :span="4">
            <el-select v-model="proQuery.projectName" clearable filterable placeholder="请选择专案名称">
              <el-option v-for="item in proNameListResponse" :key="item.projectAuto" :label="item.projectName" :value="item.projectName"/>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main />
    </el-container>
  </div>
</template>

<script>
import { currentDate, getCurrentMonthFirst } from '../../utils/dateSplice'
import { getProNameList } from '../../api/reportTable/formFour'

export default {
  name: 'TableFourTbFour',
  data() {
    return {
      total: 0,
      list: null,
      listClick: null,
      listLoading: true,
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
    handleFilter() {

    }
  }
}
</script>

<style scoped>

</style>
