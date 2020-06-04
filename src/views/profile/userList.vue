<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-input v-model="listQuery.username" placeholder="用户名" clearable maxlength="30" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.isOn" clearable placeholder="请选择状态" style="width: 100%;" @keyup.enter.native="handleFilter">
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
          <el-table-column align="center" label="用户序号" prop="userAuto" />
          <el-table-column align="center" label="用户名" prop="username" />
          <el-table-column align="center" label="分机" prop="mobilePIN" />
          <el-table-column align="center" label="邮箱" prop="email" />
          <el-table-column align="center" label="员工序号" prop="empBaseAuto" />
          <el-table-column align="center" label="员工姓名" prop="fname" />
          <el-table-column align="center" label="状态" prop="isOn" >
            <template slot-scope="scope">
              <span>{{ scope.row.isOn | isOnFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建日期" prop="cDT" />
          <el-table-column align="center" label="最后修改日期" prop="mDT" />
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
              <el-button plain size="small" type="success" @click="change(row)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--  分页条  -->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="temp.username" maxlength="30" clearable disabled="true" oninput="value" />
            </el-form-item>
            <el-form-item label="是否启用" prop="isOn">
              <el-select v-model="temp.isOn" placeholder="请选择是否启用" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
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

import { getUserList, updateUser, reset, patchDel, patchStart, patchStop } from '../../api/consumer'
import Pagination from '../../components/Pagination'

const statusOptions = [
  { key: '0', display_name: '停用' },
  { key: '1', display_name: '正常' },
  { key: '2', display_name: '删除' }
]
const stop = 0
const normal = 1
const del = 2

export default {
  name: 'ProfileUserList',
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
      statusOptions,
      normal,
      stop,
      del,
      temp: {
        userAuto: undefined,
        username: '',
        mobilePIN: '',
        email: '',
        /* empBaseAuto: '',
        fname: '',*/
        isOn: ''
      },
      listQuery: {
        username: '',
        isOn: '',
        pageNum: 1,
        pageSize: 20
      },
      /** 重置密码 */
      resetPwd: {
        username: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getUserList(this.listQuery).then(response => {
        this.list = response.data.list
        console.log('response.data.list')
        console.log(response.data.list)
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
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
    /** 重置密码 */
    change(row) {
      this.$confirm('是否重置该账户的密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resetPwd.username = row.username
        reset(this.resetPwd.username).then((response) => {
          this.$notify({
            type: 'success',
            message: response.message
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置密码'
        })
      })
    },
    handleFilter() {
      this.getList()
    },
    /** 修改 */
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          updateUser(this.temp).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.userAuto) {
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
