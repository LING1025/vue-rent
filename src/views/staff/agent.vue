<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="10">
            <el-button style="margin-left: 10px;" type="primary" plain icon="el-icon-edit" @click="handleCreate">新建</el-button>
          </el-col>
          <el-col :span="4">
            <el-select v-model="nameQuery.names" placeholder="请选择" class="filter-item" style="width: 100%">
              <el-option v-for="item in nameOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input v-model="listQuery.fName" placeholder="姓名" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter==='querySelf'?selfData():agentData()">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" stripe border fit min style="width: 100%">
          <el-table-column align="center" label="序号" prop="creditAgentAuto" />
          <el-table-column align="center" label="本人姓名" prop="selfName" />
          <el-table-column align="center" label="本人部门" prop="selfDept" />
          <el-table-column align="center" label="代理人姓名" prop="agentName" />
          <el-table-column align="center" label="代理人部门" prop="agentDept" />
          <el-table-column align="center" label="是否有效" prop="isOn">
            <template slot-scope="scope">
              <span>{{ scope.row.isOn | isOnFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="截止日期" prop="stopDate" />
          <el-table-column align="center" label="操作" fixed="right" width="360">
            <template slot-scope="{row}">
              <el-button type="info" plain size="small" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
              <el-button v-if="row.isOn===normal" plain size="small" type="warning" @click="handleModifyStatus(row,stop)">
                停用
              </el-button>
              <el-button v-if="row.isOn===stop" plain size="small" type="success" @click="handleModifyStatus(row,normal)">
                启用
              </el-button>
              <el-button v-if="row.isOn!==del" plain size="small" type="danger" @click="handleModifyStatus(row,del)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--  分页条  -->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
            <el-form-item label="本人姓名" prop="selfUser">
              <el-select v-model="temp.selfUser" placeholder="请选择本人姓名" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="本人部门" prop="selfUSerDept">
              <el-select v-model="temp.selfUSerDept" placeholder="请选择本人部门" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="代理人姓名" prop="agentUser">
              <el-select v-model="temp.agentUser" placeholder="请选择代理人姓名" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="代理人部门" prop="agentUserDept">
              <el-select v-model="temp.agentUserDept" placeholder="请选择代理人部门" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="是否有效" prop="isOn">
              <el-select v-model="temp.isOn" placeholder="请选择是否有效" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="代理截止日期" prop="agentCDate">
              <el-date-picker v-model="temp.agentCDate" clearable type="date" class="filter-item" placeholder="请选择代理截止日期" style="width: 100%" />
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
import Pagination from '../../components/Pagination/index'
import { getSelfList, getAgentList } from '../../api/staff/agent'

const nameOptions = [
  { key: '0', display_name: '本人姓名' },
  { key: '1', display_name: '代理人姓名' }
]
const self = 0
const agent1 = 1
const statusOptions = [
  { key: '0', display_name: '停用' },
  { key: '1', display_name: '正常' },
  { key: '2', display_name: '删除' }
]
const stop = 0
const normal = 1
const del = 2
export default {
  name: 'StaffAgent',
  components: { Pagination },
  filters: {
    isOnFilter(isOn) {
      return statusOptions[isOn].display_name
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
      handleFilter: '',
      nameOptions,
      self,
      agent1,
      statusOptions,
      normal,
      stop,
      del,
      temp: {
        creditAgentAuto: undefined,
        selfUser: '',
        selfName: '',
        selfUSerDept: '',
        selfDept: '',
        agentUser: '',
        agentName: '',
        agentUserDept: '',
        agentDept: '',
        isOn: '',
        agentCDate: ''
      },
      listQuery: {
        fName: '',
        pageNum: 1,
        pageSize: 20
      },
      nameQuery: {
        names: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      /* if (this.nameQuery.names === agent1) {
        console.log('this.nameQuery.names' + this.nameQuery.names)
        getAgentList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
        console.log('this.nameQuery.names' + this.nameQuery.names)
      } else if (this.nameQuery.names === self) {
        console.log('this.nameQuery.names' + this.nameQuery.names)
        getSelfList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
        console.log('this.nameQuery.names' + this.nameQuery.names)
      }*/
    },
    resetTemp() {
      this.temp = {
        creditAgentAuto: undefined,
        selfUser: '',
        selfName: '',
        selfUSerDept: '',
        selfDept: '',
        agentUser: '',
        agentName: '',
        agentUserDept: '',
        agentDept: '',
        isOn: '',
        agentCDate: ''
      }
    },
    selfData() {
      getSelfList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    agentData() {
      getAgentList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
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
    }
  }
}
</script>

<style scoped>

</style>
