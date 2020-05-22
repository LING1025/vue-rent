<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="10">
            <el-button style="margin-left: 10px;" type="primary" plain icon="el-icon-edit" @click="handleCreate">新建</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="listQuery.name" placeholder="本人姓名/代理人姓名" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" stripe border fit min style="width: 100%">
          <el-table-column align="center" label="序号" prop="id" />
          <el-table-column align="center" label="本人姓名" prop="myName" />
          <el-table-column align="center" label="本人部门" prop="myOrg" />
          <el-table-column align="center" label="代理人姓名" prop="agentName" />
          <el-table-column align="center" label="代理人部门" prop="agentOrg" />
          <el-table-column align="center" label="是否有效" prop="isEnable">
            <template slot-scope="scope">
              <span>{{ scope.row.isEnable | isEnableFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="截止日期" prop="stopDate" />
          <el-table-column align="center" label="操作" fixed="right" width="360">
            <el-button plain size="small" type="danger" @click="handleDelete">
              删除
            </el-button>
          </el-table-column>
        </el-table>

        <!--  分页条  -->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
            <el-form-item label="本人姓名" prop="myName">
              <el-select v-model="temp.myName" placeholder="请选择本人姓名" style="width: 100%;"/>
            </el-form-item>
            <el-form-item label="本人部门" prop="myOrg">
              <el-select v-model="temp.myOrg" placeholder="请选择本人部门" style="width: 100%;"/>
            </el-form-item>
            <el-form-item label="代理人姓名" prop="agentName">
              <el-select v-model="temp.agentName" placeholder="请选择代理人姓名" style="width: 100%;"/>
            </el-form-item>
            <el-form-item label="代理人部门" prop="agentOrg">
              <el-select v-model="temp.agentOrg" placeholder="请选择代理人部门" style="width: 100%;"/>
            </el-form-item>
            <el-form-item label="是否有效" prop="isEnable">
              <el-select v-model="temp.isEnable" placeholder="请选择是否有效" style="width: 100%;">
                <el-option v-for="item in enableOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="代理截止日期" prop="stopDate">
              <el-date-picker v-model="temp.stopDate" clearable type="date" class="filter-item" placeholder="请选择代理截止日期" style="width: 100%"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
              保存
            </el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>>

<script>
const enableOptions = [
  { key: '0', display_name: '否' },
  { key: '1', display_name: '是' }
]
export default {
  name: 'StaffAgent',
  filters: {
    isEnableFilter(isEnable) {
      return enableOptions[isEnable].display_name
    }
  },
  data() {
    return {
      agent: '',
      total: 0,
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      enableOptions,
      temp: {
        id: undefined,
        myName: '',
        myOrg: '',
        agentName: '',
        agentOrg: '',
        isEnable: '',
        stopDate: ''
      },
      listQuery: {
        name: '',
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {

    },
    resetTemp() {
      this.temp = {
        id: undefined,
        myName: '',
        myOrg: '',
        agentName: '',
        agentOrg: '',
        isEnable: '',
        stopDate: ''
      }
    },
    /** 新建 */
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /** 编辑 */
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleFilter() {
      this.getList()
    },
    /** 新建 */
    createData() {
      this.$refs['dataForm'].validate((valid) => {

      })
    },
    /** 修改 */
    updateData() {
      this.$refs['dataForm'].validate((valid) => {

      })
    },
    handleDelete() {

    }
  }
}
</script>

<style scoped>

</style>
