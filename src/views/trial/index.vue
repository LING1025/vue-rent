<template>
  <download-excel
    class="export-excel-wrapper"
    :data="json_data"
    :fields="json_fields"
    name="远程诊断报告导出.xls"
  >
    <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
    <el-button type="primary" size="small">导出EXCEL</el-button>
  </download-excel>
</template>

<script>

export default {
  name: 'TrialIndex',
  data() {
    return {
      json_fields: {
        '头部-诊断名称': 'name', // 常规字段
        '头部-联系电话': 'phone.mobile', // 支持嵌套属性
        '头部-损坏区域代码': {
          field: 'phone.landline',
          // 自定义回调函数
          callback: value => {
            return `损坏区域代码 - ${value}`
          }
        }
      },
      json_data: [
        {
          name: '损坏的组件一',
          city: 'New York',
          country: 'United States',
          birthdate: '1978-03-15',
          phone: {
            mobile: '1-541-754-3010',
            landline: '(541) 754-3010'
          }
        },
        {
          name: '损坏的组件二',
          city: 'Athens',
          country: 'Greece',
          birthdate: '1987-11-23',
          phone: {
            mobile: '+1 855 275 5071',
            landline: '(2741) 2621-244'
          }
        }
      ],
      json_meta: [
        [
          {
            ' key ': ' charset ',
            ' value ': ' utf- 8 '
          }
        ]
      ]
    }
  }
}
</script>

<style scoped>

</style>
