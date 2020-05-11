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
      <el-form-item label="头像">
        <img width="60" height="60"  alt="头像" src="https://www.w3school.com.cn/i/eg_tulip.jpg">
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="余额">
        <el-input v-model="form.balance" :disabled="true" />
      </el-form-item>
      <el-form-item label="是否是管理员">
        <el-radio-group v-model="form.isAdmin">
          <el-radio :label="0">Yes</el-radio>
          <el-radio :label="1">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { info, update } from '@/api/profile'

export default {
  name: 'ProfileInfo',
  data() {
    return {
      formLoading: true,
      form: {
        userId: '',
        faceUrl: '',
        username: '',
        sex: '',
        age: '',
        phone: '',
        balance: '',
        isAdmin: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
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
