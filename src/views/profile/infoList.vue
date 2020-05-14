<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <el-button style="margin-left: 10px;" type="primary" plain icon="el-icon-edit" @click="handleCreate">新建</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="listQuery.username" placeholder="账号" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.isAdmin" placeholder="是否是管理员" class="filter-item" style="width: 100%">
              <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.status" placeholder="状态" class="filter-item" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" stripe border fit min style="width: 100%">
          <el-table-column align="center" label="账号" prop="username" />
          <el-table-column align="center" label="性别" prop="sex" />
          <el-table-column align="center" label="年龄" prop="age" />
          <el-table-column align="center" label="手机号" prop="phone" />
          <el-table-column align="center" label="余额" prop="balance" />
          <el-table-column align="center" label="密码" prop="password" />
          <el-table-column align="center" label="头像" prop="faceUrl" />
          <el-table-column align="center" label="是否是管理员" prop="isAdmin" />
          <el-table-column align="center" label="状态" prop="status" />
          <el-table-column align="center" label="操作" fixed="right" width="360">
            <template slot-scope="{row}">
              <el-button type="info" plain size="small" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
              <el-button v-if="row.status===normal" plain size="small" type="warning" @click="handleModifyStatus(row,stop)">
                禁用
              </el-button>
              <el-button v-if="row.status===stop" plain size="small" type="success" @click="handleModifyStatus(row,normal)">
                启用
              </el-button>
              <el-button v-if="row.status!==del" plain size="small" type="danger" @click="handleModifyStatus(row,del)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--        分页条-->
        <!--        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
            <el-form-item label="头像" prop="faceUrl">
              <img width="60" height="60" alt="头像" src="https://www.w3school.com.cn/i/eg_tulip.jpg">
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input v-model="temp.username" placeholder="请输入账号" maxlength="30" clearable oninput="value=value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="temp.password" placeholder="请输入密码" maxlength="30" clearable oninput="value=value.replace(/[^0-9]/g, '')" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="temp.sex" placeholder="请选择性别" class="filter-item" style="width: 100%;">
                <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="temp.age" placeholder="请输入年龄" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="temp.phone" placeholder="请输入手机号" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="余额" prop="balance">
              <el-input v-model="temp.balance" placeholder="请输入余额" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="是否是管理员" prop="isAdmin">
              <el-select v-model="temp.isAdmin" class="filter-item" placeholder="请选择是否是管理员" style="width: 100%;">
                <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="temp.status" class="filter-item" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
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
import { getUserList, insertUserList, updateUser, patchStart, patchStop, patchDel } from '@/api/profile'
import statusOption from '@/variable/status'
const typeOptions = [
  { key: '0', display_name: 'Yes' },
  { key: '1', display_name: 'No' }
]
const sexOptions = [
  { key: '0', display_name: '男' },
  { key: '1', display_name: '女' }
]
export default {
  name: 'ProfileInfoList',
  data() {
    return {
      label: '',
      total: 0,
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      typeOptions,
      statusOptions: statusOption.statusOption2,
      sexOptions,
      normal: statusOption.normal,
      stop: statusOption.stop,
      del: statusOption.del,
      temp: {
        userId: undefined,
        username: '',
        sex: '',
        age: '',
        phone: '',
        balance: '',
        isAdmin: '',
        status: 1,
        password: '',
        faceUrl: ''
      },
      listQuery: {
        status: '',
        username: '',
        isAdmin: ''
      },
      rules: {
        username: [{ required: true, message: '账号必填', trigger: 'change' }],
        isAdmin: [{ required: true, message: '是否是管理员', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态类型', trigger: 'change' }],
        password: [{ required: true, message: '密码必填', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getUserList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        userId: undefined,
        sex: '',
        age: '',
        phone: '',
        balance: '',
        isAdmin: '',
        status: '',
        faceUrl: '',
        password: ''
      }
    },
    /** 新建对话框 */
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.temp.status = statusOption.statusOption3[0].key
      this.temp.sex = sexOptions[0].key
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /** 编辑 */
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.status = statusOption.statusOption3[this.temp.status - 1].key
      this.temp.isAdmin = typeOptions[this.temp.isAdmin].key
      this.temp.sex = sexOptions[this.temp.sex].key
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /** 修改状态 */
    handleModifyStatus(row, status) {
      this.temp = Object.assign({}, row) // copy obj
      this.listLoading = true
      if (status === this.normal) {
        patchStart(this.temp.userId).then(() => {
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
        row.status = status
      } else if (status === this.stop) {
        patchStop(this.temp.userId).then(() => {
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
        row.status = status
      } else {
        this.$confirm('是否删除该账号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          patchDel(this.temp.userId).then(() => {
            row.status = status
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
          insertUserList(this.temp).then(response => {
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
          updateUser(this.temp).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.userId) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
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
