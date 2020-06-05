<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <el-button style="margin-left: 10px;" type="primary" plain icon="el-icon-edit" @click="handleCreate">新建</el-button>
          </el-col>
          <el-col :span="3">
            <el-select v-model="listQuery.type" clearable placeholder="==请选择==" style="width: 100%;" @keyup.enter.native="handleFilter" >
              <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="listQuery.status" clearable placeholder="请选择状态" style="width: 100%;" @keyup.enter.native="handleFilter" >
              <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="listQuery.orgType" clearable placeholder="部门" style="width: 100%;" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="3">
            <el-select v-model="listQuery.userAuto" clearable placeholder="姓名" style="width: 100%;" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" stripe border fit min style="width: 100%">
          <el-table-column align="center" label="需求单号" prop="iTRequirementAuto" />
          <el-table-column align="center" label="申请人" prop="userAuto" />
          <el-table-column align="center" label="部门" prop="orgType" />
          <el-table-column align="center" label="分类" prop="typeMode" />
          <el-table-column align="center" label="标题" prop="subject" />
          <el-table-column align="center" label="申请日期" prop="cDT" />
          <el-table-column align="center" label="进度" prop="status" />
          <el-table-column align="center" label="负责人" prop="handler" />
          <el-table-column align="center" label="操作" fixed="right" width="360">
            <template slot-scope="{row}">
              <el-button type="info" plain size="small" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--  分页条  -->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;" >
            <el-form-item label="申请人" prop="userAuto">
              <el-input v-model="temp.userAuto" placeholder="请输入申请人" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="编号" prop="iTRequirementAuto">
              <el-input v-model="temp.iTRequirementAuto" placeholder="请输入编号" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="部门" prop="orgType">
              <el-input v-model="temp.orgType" placeholder="请输入部门" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="申请日期" prop="cDT">
              <el-input v-model="temp.cDT" placeholder="请输入申请日期" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="标题" prop="subject">
              <el-input v-model="temp.subject" placeholder="请输入标题" maxlength="30" clearable oninput="value" />
            </el-form-item>
            <el-form-item label="希望完成日" prop="expectDT">
              <el-date-picker v-model="temp.expectDT" clearable type="date" placeholder="请选择希望完成日" style="width: 100%" />
            </el-form-item>
            <el-form-item label="分类" prop="typeMode">
              <el-select v-model="temp.type" placeholder="==请选择==" style="width: 100%;">
                <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
              <el-select v-model="temp.mode" placeholder="==请选择==" style="width: 100%;">
                <el-option v-for="item in modeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="异动原因" prop="reason">
              <el-select v-model="temp.reason" placeholder="==请选择==" style="width: 100%;">
                <el-option v-for="item in reasonOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="程度" prop="degree">
              <el-select v-model="temp.degree" placeholder="==请选择==" style="width: 100%;">
                <el-option v-for="item in degreeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="contents">
              <el-input type="textarea" :rows="8" v-model="temp.subject" placeholder="请输入内容" maxlength="500" clearable show-word-limit oninput="value" />
            </el-form-item>
            <el-form-item label="附件" prop="fileName">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="签核建议" prop="memo">
              <el-input type="textarea" :rows="3" v-model="temp.memo" placeholder="请输入签核建议" maxlength="100" clearable show-word-limit oninput="value" />
            </el-form-item>
            <!--<el-form-item label="签核列表" prop="flowList">
              <el-input type="textarea" :rows="3" v-model="temp.flowList" placeholder="请输入签核列表" maxlength="30" clearable oninput="value" />
            </el-form-item>-->
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
import { currentDate } from '../../utils/dateSplice' // 获取当天日期
import option from '@/variable/types'

export default {
  name: 'StaffRequestForm',
  data() {
    return {
      requestForm: '',
      total: 0,
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      typeOptions: option.typeOption,
      statusOptions: option.statusOption,
      modeOptions: option.modeOption,
      reasonOptions: option.reasonOption,
      degreeOptions: option.degreeOption,
      temp: {
        iTRequirementAuto: undefined,
        userAuto: '',
        type: '',
        mode: '',
        expectDT: '',
        contents: '',
        status: '',
        flowList: '',
        reason: '',
        degree: '',
        subject: '',
        // memo: '',
        fileName: '',
        cDT: '',
        typeMode: '',
        orgType: ''
      },
      listQuery: {
        type: '',
        status: '',
        orgType: '',
        userAuto: '',
        pageNum: 1,
        pageSize: 20
      },
      rules: {
        userAuto: [{ required: true, message: '申请人必填', trigger: 'change' }],
        iTRequirementAuto: [{ required: true, message: '编号必填', trigger: 'change' }],
        orgType: [{ required: true, message: '部门必填', trigger: 'change' }],
        cDT: [{ required: true, message: '申请日期必填', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    resetTemp() {
      this.temp = {
        iTRequirementAuto: undefined,
        userAuto: '',
        type: '',
        mode: '',
        expectDT: '',
        contents: '',
        status: '',
        flowList: '',
        reason: '',
        degree: '',
        subject: '',
        // memo: '',
        fileName: '',
        cDT: '',
        typeMode: '',
        orgType: ''
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
        // eslint-disable-next-line no-empty
        if (valid) {
          this.temp.cDT = currentDate()
        }
      })
    },
    /** 修改 */
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        // eslint-disable-next-line no-empty
        if (valid) {
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
