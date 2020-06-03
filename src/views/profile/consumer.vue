<template>
  <div>
    <el-form
      ref="form"
      v-loading="formLoading"
      :data="form"
      element-loading-text="加载中..."
      :model="form"
      label-width="120px"
    >
      <el-input v-model="form.userId" type="hidden" />
      <el-form-item label="账号">
        <el-input v-model="form.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="分机">
        <el-input v-model="form.mobilePIN" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-select v-model="form.isOn" placeholder="请选择是否启用" style="width: 100%;">
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { info, update } from '../../api/consumer'

const statusOptions = [
  { key: '0', display_name: '停用' },
  { key: '1', display_name: '正常' },
  { key: '2', display_name: '删除' }
]
export default {
  name: 'ProfileConsumer',
  data() {
    return {
      formLoading: true,
      statusOptions,
      form: {
        userAuto: '',
        username: '',
        mobilePIN: '',
        email: '',
        isOn: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      info(this.$store.getters.name).then(response => {
        this.form = response.data
        this.formLoading = false
      })
    },
    onSubmit() {
      this.formLoading = true
      update(this.form).then(response => {
        this.formLoading = false
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch(() => {
        this.formLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
