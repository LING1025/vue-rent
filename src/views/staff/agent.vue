<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="10">
            <el-button style="margin-left: 10px;" type="primary" plain icon="el-icon-edit" @click="handleCreate">新建</el-button>
          </el-col>
          <el-col :span="4">
            <el-select v-model="nameQuery.names" placeholder="==请选择==" class="filter-item" style="width: 100%">
              <el-option v-for="item in nameOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
          <!-- 下拉框输入模糊查询 filterable动态模糊搜索下拉框中的选项 -->
          <el-col :span="4">
            <el-select v-model="listQuery.empBaseAuto" clearable filterable placeholder="请输入姓名" style="width: 100%;" @keyup.enter.native="handleFilter">
              <el-option v-for="item in selfUserListResponse" :key="item.empBaseAuto" :label="item.fname" :value="item.empBaseAuto" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
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
          <el-table-column align="center" label="截止日期" prop="agentCDate" />
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
              <el-select v-model="temp.selfUser" clearable filterable placeholder="请选择本人姓名" style="width: 100%;" @change="chooseSelf">
                <el-option v-for="item in selfUserListResponse" :key="item.empBaseAuto" :label="item.fname" :value="item.empBaseAuto" />
              </el-select>
            </el-form-item>
            <el-form-item label="本人部门" prop="selfUSerDept">
              <el-select v-model="temp.selfUser" placeholder="请选择本人部门" disabled="true" style="width: 100%;">
                <el-option v-for="item in selfUserListResponse" :key="item.empBaseAuto" :label="item.orgName" :value="item.empBaseAuto" />
              </el-select>
            </el-form-item>
            <el-form-item label="代理人姓名" prop="agentUser">
              <el-select v-model="temp.agentUser" clearable filterable placeholder="请选择代理人姓名" style="width: 100%;" @change="chooseAgent">
                <el-option v-for="item in selfUserListResponse" :key="item.empBaseAuto" :label="item.fname" :value="item.empBaseAuto" />
              </el-select>
            </el-form-item>
            <el-form-item label="代理人部门" prop="agentUserDept">
              <el-select v-model="temp.agentUser" placeholder="请选择代理人部门" disabled="true" style="width: 100%;" >
                <el-option v-for="item in selfUserListResponse" :key="item.empBaseAuto" :label="item.orgName" :value="item.empBaseAuto" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否有效" prop="isOn">
              <el-select v-model="temp.isOn" placeholder="请选择是否有效" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="代理截止日期" prop="agentCDate">
              <el-date-picker v-model="temp.agentCDate" clearable type="date" placeholder="请选择代理截止日期" style="width: 100%" />
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
import Pagination from '../../components/Pagination'
import { dateTostring, format } from '../../utils/dateSplice' // 日期的查询
import { getSelfList, getAgentList, insertAgent, updateAgent, patchDel, patchStart, patchStop } from '../../api/staff/agent'
import { getEmpAgent } from '../../api/staff/maintain'
const nameOptions = [
  { key: '0', display_name: '本人姓名' },
  { key: '1', display_name: '代理人姓名' }
]
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
      nameOptions,
      statusOptions,
      normal,
      stop,
      del,
      selfUser: this.$route.params.selfUser, // 本人id
      agentUser: this.$route.params.agentUser, // 代理人id
      // empBaseAuto: this.$route.params.empBaseAuto, // 员工id
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
        empBaseAuto: '',
        pageNum: 1,
        pageSize: 20
      },
      nameQuery: {
        names: ''
      },
      /** 员工id查询（本人姓名/代理人姓名下拉选） */
      selfUserListResponse: null,
      selfUserListParam: {
        empBaseAuto: ''
      }
    }
  },
  rules: {
    selfUser: [{ required: true, message: '本人姓名必选', trigger: 'change' }],
    // selfUSerDept: [{ required: true, message: '本人部门必选', trigger: 'change' }],
    agentUser: [{ required: true, message: '代理人姓名必选', trigger: 'change' }],
    // agentUserDept: [{ required: true, message: '代理人部门必选', trigger: 'change' }],
    agentCDate: [{ required: true, message: '代理截止日期', trigger: 'change' }]
  },
  created() {
    this.getList()
    this.getListSelfUser()
  },
  methods: {
    getList() {
      if (this.nameQuery.names === '0') {
        getSelfList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      } else if (this.nameQuery.names === '1') {
        getAgentList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      } else {
        getSelfList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      }
    },
    /** 本人姓名/代理人姓名下拉选 */
    getListSelfUser() {
      getEmpAgent(this.selfUserListParam).then(response => {
        this.selfUserListResponse = response.data
      })
    },
    /** 监听本人姓名下拉选，根据下标获取员工empBaseAuto、fName、orgAuto、orgName*/
    chooseSelf(position) {
      this.temp.selfUser = position
      for (let i = 0; i < this.selfUserListResponse.length; i++) {
        if (this.selfUserListResponse[i].selfUser === position) {
          this.temp.selfName = this.selfUserListResponse[i].fName
        }
      }
    },
    /** 监听代理人姓名下拉选，根据下标获取员工empBaseAuto、fName、orgAuto、orgName*/
    chooseAgent(position) {
      this.temp.agentUser = position
      for (let i = 0; i < this.selfUserListResponse.length; i++) {
        if (this.selfUserListResponse[i].agentUser === position) {
          this.temp.agentName = this.selfUserListResponse[i].fName
        }
      }
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
    /** 新建 */
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.temp.isOn = statusOptions[1].key
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /** 编辑 */
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.temp.isOn = statusOptions[this.temp.isOn].key
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleFilter() {
      this.getList()
    },
    /** 修改状态 */
    handleModifyStatus(row, isOn) {
      this.temp = Object.assign({}, row) // copy obj
      this.listLoading = true
      if (isOn === this.normal) {
        patchStart(this.temp.creditAgentAuto).then(() => {
          this.dialogFormVisible = false
          this.listLoading = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        }).catch(() => {
          this.listLoading = false
        })
        row.isOn = isOn
      } else if (isOn === this.stop) {
        patchStop(this.temp.creditAgentAuto).then(() => {
          this.dialogFormVisible = false
          this.listLoading = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        }).catch(() => {
          this.listLoading = false
        })
        row.isOn = isOn
      } else {
        this.$confirm('是否删除该员工账号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          patchDel(this.temp.creditAgentAuto).then(() => {
            row.isOn = isOn
            this.dialogFormVisible = false
            this.listLoading = false
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          }).catch(() => {
            this.listLoading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          })
          this.listLoading = false
        })
      }
    },
    /** 新建 */
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.agentCDate = format(dateTostring(this.temp.agentCDate))
          this.listLoading = true
          this.temp.creditAgentAuto = 0
          insertAgent(this.temp).then(response => {
            this.list.unshift(this.temp)
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: response.message
            })
            this.getList()
          }).catch(() => {
            this.listLoading = false
            this.dialogFormVisible = true
          })
        }
      })
    },
    /** 修改 */
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.agentCDate = format(dateTostring(this.temp.agentCDate))
          this.listLoading = true
          updateAgent(this.temp).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.creditAgentAuto) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp) // 个人理解：此处是修改位于index的元素，并添加this.temp元素替代被修改元素
                break
              }
            }
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: response.message
            })
            this.getList()
          }).catch(() => {
            this.listLoading = false
            this.dialogFormVisible = true
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
