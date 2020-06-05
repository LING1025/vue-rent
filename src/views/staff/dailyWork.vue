<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="10">
            <el-button style="margin-left: 10px;" type="primary" plain icon="el-icon-edit" @click="handleCreate">新建</el-button>
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.proName" clearable placeholder="请选择查询条件" style="width: 100%;" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4">
            <el-radio-group v-model="listQuery.type">
              <el-radio v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
            </el-radio-group>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" stripe border fit min style="width: 100%">
          <el-table-column align="center" label="序号" prop="creditAgentAuto" />
          <el-table-column align="center" label="序号" prop="creditAgentAuto" />
          <el-table-column align="center" label="序号" prop="creditAgentAuto" />
          <el-table-column align="center" label="序号" prop="creditAgentAuto" />
          <el-table-column align="center" label="序号" prop="creditAgentAuto" />
          <el-table-column align="center" label="操作" fixed="right" width="360">
            <template slot-scope="{row}">
              <el-button type="info" plain size="small" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
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
const typeOptions = [
  { key: '0', display_name: '本人' },
  { key: '1', display_name: '全部' }
]
export default {
  name: 'StaffDailyWork',
  data() {
    return {
      dailyWork: '',
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
      temp: {
        id: undefined,
        proName: '',
        remark: '',
        dailyHours: '',
        workCode: '',
        dailyDate: ''
      },
      listQuery: {
        proName: '',
        dates: '',
        type: '',
        pageNum: 1,
        pageSize: 20
      },
      rules: {
        proName: [{ required: true, message: '专案名称必选', trigger: 'change' }],
        workCode: [{ required: true, message: '工作代码必选', trigger: 'change' }]
      }
    }
  }
}
</script>

<style scoped>

</style>
