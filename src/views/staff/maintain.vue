<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <el-button style="margin-left: 10px;" type="primary" plain icon="el-icon-edit" @click="handleCreate">新建</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="listQuery.fName" placeholder="姓名" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.orgName" placeholder="部门" class="filter-item" style="width: 100%" >
              <el-option v-for="dep in depNameListResponse" :key="dep.id" :label="dep.depName" :value="dep.depName" />
              <!--              <el-option v-for="item in orgOptions" :key="item.key" :label="item.display_name" :value="item.display_name" />-->
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" stripe border fit min style="width: 100%">
          <el-table-column align="center" label="员工序号" prop="empBaseAuto" />
          <el-table-column align="center" label="账号" prop="username" />
          <el-table-column align="center" label="姓名" prop="fname" />
          <el-table-column align="center" label="部门" prop="orgName" />
          <el-table-column align="center" label="职级" prop="title" />
          <el-table-column align="center" label="是否启用" prop="isOn">
            <template slot-scope="scope">
              <span>{{ scope.row.isOn | isOnFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建日期" prop="cDT" />
          <el-table-column align="center" label="最后修改日期" prop="mDT" />
          <!--<el-table-column align="center" label="创建时间" prop="createTime" />
          <el-table-column align="center" label="最后修改时间" prop="updateTime" />-->
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
            <el-form-item label="姓名" prop="fname">
              <el-input v-model="temp.fname" placeholder="请输入姓名" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <!--<el-form-item label="身份证" prop="identityCard">
              <el-input v-model="temp.identityCard" placeholder="请输入身份证" maxlength="18" clearable @change="hint()"/>
            </el-form-item>-->
            <el-form-item label="部门" prop="orgAuto">
              <el-select v-model="temp.orgAuto" placeholder="请选择部门" style="width: 100%;" @change="chooseDep">
                <el-option v-for="dep in depNameListResponse" :key="dep.orgAuto" :label="dep.depName" :value="dep.orgAuto" />
              </el-select>
            </el-form-item>
            <el-form-item label="级别" prop="incTitleAuto">
              <el-select v-model="temp.incTitleAuto" placeholder="请选择级别" style="width: 100%;" @change="chooseTitle">
                <el-option v-for="item in titleOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用" prop="isOn">
              <el-select v-model="temp.isOn" placeholder="请选择是否启用" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否为主管" prop="isBoss">
              <el-select v-model="temp.isBoss" placeholder="请选择是否为主管" style="width: 100%;">
                <el-option v-for="item in bossOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>

            <el-form-item label="所属组" prop="orgGroupAuto">
              <el-select v-model="temp.orgGroupAuto" placeholder="请选择所属组" style="width: 100%;" @change="chooseGroupName">
                <el-option v-for="group in orgGroupListResponse" :key="group.orgGroupAuto" :label="group.orgGroupName" :value="group.orgGroupAuto" />
              </el-select>
            </el-form-item>
            <el-form-item id="demo" label="角色" prop="roles">
              <el-select v-model="temp.roles" placeholder="请选择角色" multiple style="width: 100%;"><!--@change="chooseRoles"-->
                <el-option v-for="role in roleNameListResponse" :key="role.id" :label="role.roleName" :value="role.roleName" />
              </el-select>
              <!--<el-checkbox-group v-model="temp.roleNames" placeholder="请选择角色" multiple="false">
                <el-checkbox v-for="role in roleNameListResponse" :key="role.id" :label="role.roleName" :value="role.roleName"/>
              </el-checkbox-group>-->
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input v-model="temp.username" placeholder="请输入账号" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="分机" prop="mobilePIN">
              <el-input v-model="temp.mobilePIN" placeholder="请输入分机" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="temp.email" placeholder="请输入邮箱" maxlength="30" clearable oninput="value" />
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
</template>

<script>
import typeOption from '@/variable/types'
import { getEmpList, getDepNameList, getRoleNameList, getOrgGroupNameList, insertEmp, updateEmp, patchDel, patchStart, patchStop } from '../../api/staff/maintain'
import Pagination from '../../components/Pagination'

const bossOptions = [
  { key: '0', display_name: '否' },
  { key: '1', display_name: '是' }
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
  name: 'StaffMaintain',
  components: { Pagination },
  filters: {
    isOnFilter(isOn) {
      return statusOptions[isOn].display_name
    }
  },
  data() {
    return {
      maintain: '',
      total: 0,
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      // orgOptions: typeOption.orgOption,
      titleOptions: typeOption.titleOption,
      // groupOptions: typeOption.groupOption,
      // roleOptions: typeOption.roleOption,
      bossOptions,
      statusOptions,
      normal,
      stop,
      del,
      orgAuto: this.$route.params.orgAuto, // 部门id
      incTitleAuto: this.$route.params.incTitleAuto, // 职位表id
      // rolesAuto: this.$route.params.rolesAuto, // 角色id
      orgGroupAuto: this.$route.params.orgGroupAuto, // 所属组id
      temp: {
        empBaseAuto: undefined,
        fname: '',
        // identityCard: '',
        orgName: '',
        title: '',
        isOn: '',
        isBoss: '',
        orgGroupName: '',
        /* rolesAuto: '',
        roleName: '',*/
        roles: [],
        username: '',
        orgAuto: '',
        incTitleAuto: '',
        orgGroupAuto: '',
        mobilePIN: '',
        email: ''
      },
      listQuery: {
        orgName: '',
        fName: '',
        pageNum: 1,
        pageSize: 20
      },
      /** 部门名称查询参数 */
      depNameListResponse: null,
      depNameListParam: {
        depName: ''
      },
      /** 角色名称查询参数 */
      roleNameListResponse: null,
      roleNameListParam: {
        roleName: ''
      },
      /** 所属组名称查询参数*/
      orgGroupListResponse: null,
      orgGroupListParam: {
        orgGroupName: ''
      },
      rules: {
        fname: [{ required: true, message: '姓名必填', trigger: 'change' }],
        username: [{ required: true, message: '账号必填', trigger: 'change' }],
        // identityCard: [{ required: true, message: '身份证号必填', trigger: 'change' }],
        orgAuto: [{ required: true, message: '部门必选', trigger: 'change' }],
        incTitleAuto: [{ required: true, message: '职级必选', trigger: 'change' }],
        orgGroupAuto: [{ required: true, message: '所属组必选', trigger: 'change' }],
        roles: [{ required: true, message: '角色必选', trigger: 'change' }],
        email: [{ required: true, message: '邮箱必填', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
    this.getListDepName()
    this.getListRoleName()
    this.getListOrgGroupName()
  },
  methods: {
    getList() {
      getEmpList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    /** 部门名称下拉选 */
    getListDepName() {
      getDepNameList(this.depNameListParam).then(response => {
        this.depNameListResponse = response.data
      })
    },
    /** 角色名称下拉选 */
    getListRoleName() {
      getRoleNameList(this.roleNameListParam).then(response => {
        this.roleNameListResponse = response.data
      })
    },
    /** 所属组名称下拉选 */
    getListOrgGroupName() {
      getOrgGroupNameList(this.orgGroupListParam).then(response => {
        this.orgGroupListResponse = response.data
      })
    },
    /** 监听部门下拉选，根据下标获取部门orgAuto、depName*/
    chooseDep(position) {
      this.temp.orgAuto = position
      for (let i = 0; i < this.depNameListResponse.length; i++) {
        if (this.depNameListResponse[i].orgAuto === position) {
          this.temp.orgName = this.depNameListResponse[i].depName
        }
      }
    },
    /** 监听职位下拉选，根据下标获取职位key、display_name*/
    chooseTitle(position) {
      this.temp.incTitleAuto = position
      for (let i = 0; i < this.titleOptions.length; i++) {
        if (this.titleOptions[i].key === position) {
          this.temp.title = this.titleOptions[i].display_name
        }
      }
    },
    /** 监听角色下拉选，根据下标获取职位rolesAuto、roleName*/
    /* chooseRoles(position) {
      this.temp.rolesAuto = position
      for (let i = 0; i < this.roleNameListResponse.length; i++) {
        if (this.roleNameListResponse[i].rolesAuto === position) {
          this.temp.roleName = this.roleNameListResponse[i].roleName
        }
      }
    },*/
    /** 监听所属组下拉选，根据下标获取部门orgGroupAuto、orgGroupName*/
    chooseGroupName(position) {
      this.temp.orgGroupAuto = position
      for (let i = 0; i < this.orgGroupListResponse.length; i++) {
        if (this.orgGroupListResponse[i].orgGroupAuto === position) {
          this.temp.orgGroupName = this.orgGroupListResponse[i].orgGroupName
        }
      }
    },
    resetTemp() {
      this.temp = {
        empBaseAuto: undefined,
        fname: '',
        // identityCard: '',
        orgName: '',
        title: '',
        isOn: '',
        isBoss: '',
        orgGroupName: '',
        /* rolesAuto: '',
        roleName: '',*/
        roles: [], // 角色名称
        username: '',
        orgAuto: '',
        incTitleAuto: '',
        orgGroupAuto: '',
        mobilePIN: '',
        email: ''
      }
    },
    /** 新建 */
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.temp.isOn = statusOptions[1].key
      this.temp.isBoss = bossOptions[0].key
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /** 编辑 */
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.temp.isOn = statusOptions[this.temp.isOn].key
      this.temp.isBoss = bossOptions[this.temp.isBoss].key
      this.temp.orgAuto = row.orgAuto
      this.temp.incTitleAuto = row.incTitleAuto
      this.temp.orgGroupAuto = row.orgGroupAuto
      var car; var i; var x = ''; var ro = []
      car = row.roles
      for (i in car) {
        x = row.roles[i].roleName
        // console.log(x)
        ro.push(x)
        // console.log(ro)
        this.temp.roles = ro
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /** 修改状态 */
    handleModifyStatus(row, isOn) {
      this.temp = Object.assign({}, row) // copy obj
      this.listLoading = true
      if (isOn === this.normal) {
        patchStart(this.temp.empBaseAuto).then(() => {
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
        patchStop(this.temp.empBaseAuto).then(() => {
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
          patchDel(this.temp.empBaseAuto).then(() => {
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
    handleFilter() {
      this.getList()
    },
    /** 新建 */
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.temp.empBaseAuto = 0
          insertEmp(this.temp).then(response => {
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
          this.listLoading = true
          updateEmp(this.temp).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.empBaseAuto) {
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
    /** 身份证输入的验证 */
    /* hint() {
      const phoneTest = /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/
      if (!phoneTest.test(this.temp.identityCard)) {
        this.$message.error('请输入正确的身份证号')
        return false
      }
    }*/
  }

}
</script>

<style scoped>

</style>
