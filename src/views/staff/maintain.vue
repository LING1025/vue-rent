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
            <el-select v-model="listQuery.orgName" placeholder="部门" class="filter-item" style="width: 100%">
              <el-option v-for="dep in depNameListResponse" :key="dep.key" :label="dep.depName" :value="dep.depName" />
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
          <el-table-column align="center" label="是否启用" prop="isOn" />
          <el-table-column align="center" label="创建时间" prop="mdt" />
          <el-table-column align="center" label="最后修改时间" prop="muser" />
          <!--<el-table-column align="center" label="创建时间" prop="createTime" />
          <el-table-column align="center" label="最后修改时间" prop="updateTime" />-->
          <el-table-column align="center" label="操作" fixed="right" width="360">
            <template slot-scope="{row}">
              <el-button type="info" plain size="small" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--  分页条  -->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
            <el-form-item label="姓名" prop="fName">
              <el-input v-model="temp.fName" placeholder="请输入姓名" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="身份证" prop="identityCard">
              <el-input v-model="temp.identityCard" placeholder="请输入身份证" maxlength="18" clearable @change="hint" />
            </el-form-item>
            <el-form-item label="部门" prop="orgName">
              <el-select v-model="temp.orgName" placeholder="请选择部门" style="width: 100%;">
                <el-option v-for="dep in depNameListResponse" :key="dep.key" :label="dep.depName" :value="dep.depName" />
              </el-select>
            </el-form-item>
            <el-form-item label="级别" prop="title">
              <el-select v-model="temp.title" placeholder="请选择级别" style="width: 100%;">
                <el-option v-for="item in titleOptions" :key="item.key" :label="item.display_name" :value="item.display_name" />
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
            <el-form-item label="所属组" prop="group">
              <el-select v-model="temp.group" placeholder="请选择所属组" style="width: 100%;">
                <el-option v-for="item in groupOptions" :key="item.key" :label="item.display_name" :value="item.display_name" />
              </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select v-model="temp.role" placeholder="请选择角色" style="width: 100%;" multiple="false">
                <el-option v-for="role in roleNameListResponse" :key="role.key" :label="role.roleName" :value="role.roleName" />
                <!--                <el-option v-for="item in roleOptions" :key="item.key" :label="item.display_name" :value="item.display_name"/>-->
              </el-select>
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input v-model="temp.username" placeholder="请输入账号" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="分机" prop="fenJi">
              <el-input v-model="temp.fenJi" placeholder="请输入分机" maxlength="30" clearable oninput="value" />
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
import { getEmpList, getDepNameList, getRoleNameList } from '../../api/staff/maintain'

const bossOptions = [
  { key: '0', display_name: '是' },
  { key: '1', display_name: '否' }
]
const statusOptions = [
  { key: '0', display_name: '启用' },
  { key: '1', display_name: '停用' }
]
export default {
  name: 'StaffMaintain',
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
      groupOptions: typeOption.groupOption,
      // roleOptions: typeOption.roleOption,
      bossOptions,
      statusOptions,
      temp: {
        empBaseAuto: undefined,
        fName: '',
        identityCard: '',
        orgName: '',
        title: '',
        isOn: '',
        isBoss: '',
        group: '',
        role: '',
        username: '',
        fenJi: '',
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
      rules: {
        fName: [{ required: true, message: '姓名必填', trigger: 'change' }],
        identityCard: [{ required: true, message: '身份证号必填', trigger: 'change' }],
        orgName: [{ required: true, message: '部门必选', trigger: 'change' }],
        title: [{ required: true, message: '职级必选', trigger: 'change' }],
        group: [{ required: true, message: '所属组必选', trigger: 'change' }],
        role: [{ required: true, message: '角色必选', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
    this.getListDepName()
    this.getListRoleName()
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
    resetTemp() {
      this.temp = {
        empBaseAuto: undefined,
        fName: '',
        identityCard: '',
        orgName: '',
        title: '',
        isOn: '',
        isBoss: '',
        group: '',
        role: '',
        username: '',
        fenJi: '',
        email: ''
      }
    },
    /* mounted() {
      this.temp = setTimeout(this.$refs.tree.setCheckedKeys([]), 1000)
    },*/
    /** 新建 */
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.temp.isOn = statusOptions[0].key
      this.temp.isBoss = bossOptions[1].key
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
        if (valid) {
          this.listLoading = true
        }
      })
    },
    /** 修改 */
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
        }
      })
    },
    /** 身份证输入的验证 */
    hint() {
      const phoneTest = /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/
      if (!phoneTest.test(this.temp.identityCard)) {
        this.$message.error('请输入正确的身份证号')
        return false
      }
    }
  }

}
</script>

<style scoped>

</style>
