<!-- 日期搜索框 -->
<template>
  <div id="myDate">
    <!--
    <el-button icon="el-icon-caret-left" @click="dateChange(4)" />
-->
    <el-select v-model="yearsModel" placeholder="请选择" style="width:100px;" @change="dateChange">
      <el-option
        v-for="item in years"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="monthsModel" placeholder="请选择" style="width:100px;" @change="dateChange">
      <el-option
        v-for="item in months"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!--<el-select v-model="daysModel" placeholder="请选择" style="width:100px;" @change="dateChange(3)">
      <el-option
        v-for="item in days"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>-->
    <!--<el-button icon="el-icon-caret-right" @click="dateChange(5)" />-->
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
  },
  data() {
    return {
      yearsModel: null,
      years: [],
      monthsModel: null,
      months: [],
      daysModel: null,
      days: []
    }
  },

  created() {
    this.init()
  },
  methods: {
    init() {
      var myDate = new Date()
      var year = myDate.getFullYear()// 获取当前年
      var month = myDate.getMonth() + 1// 获取当前月
      var day = myDate.getDate()// 获取当前日

      this.initSelectYear(year)
      this.initSelectMonth()
      this.initSelectDay(year, month)
      this.yearsModel = year
      this.monthsModel = month
      this.daysModel = day
      const obj = { year: this.yearsModel, month: this.monthsModel, day: this.daysModel }
      this.$parent.dateChange(obj)
    },
    initSelectYear(year) {
      this.years = []
      for (let i = 0; i < 30; i++) {
        this.years.push({ value: (year - i), label: (year - i) + '年' })
      }
    },
    initSelectMonth() {
      this.months = []
      this.months.push({ value: 0, label: '全部' })
      for (let i = 1; i <= 12; i++) {
        this.months.push({ value: i, label: i + '月' })
      }
    },
    initSelectDay(year, month) {
      var maxDay = this.getMaxDay(year, month)
      this.days = []
      this.days.push({ value: 0, label: '全部' })
      for (var i = 1; i <= maxDay; i++) {
        this.days.push({ value: i, label: i + '日' })
      }
    },
    dateChange() {
      // 1年 2月 3日 4 左 5右
      // eslint-disable-next-line eqeqeq
      /* if (type == 1 || type == 2) {
        // eslint-disable-next-line eqeqeq
        if (this.monthsModel == 0) {
          this.daysModel = 0
          this.initSelectDay(this.yearsModel, 1)
        } else {
          this.initSelectDay(this.yearsModel, this.monthsModel)
        }
      }*/
      /* if (type === 4) {
        this.dayleft()
      }
      if (type === 5) {
        this.dayright()
      }*/

      // 操作父组件方法
      const obj = { year: this.yearsModel, month: this.monthsModel/*, day: this.daysModel*/ }
      this.$parent.dateChange(obj)
    },
    /* dayleft() {
      var tmpYear = this.yearsModel
      var tmpMonth = this.monthsModel
      var tmpDay = this.daysModel
      if (tmpYear == null) {
        var myDate = new Date()
        var year = myDate.getFullYear()// 获取当前年
        var month = myDate.getMonth() + 1// 获取当前月
        var day = myDate.getDate()// 获取当前日
        this.yearsModel = year
        this.monthsModel = month
        this.daysModel = day
        return
      }
      if (tmpMonth == null) { tmpMonth = 0 }
      if (tmpDay == null) { tmpDay = 0 }

      var yearV = tmpYear
      var monthV = tmpMonth
      var dayV = tmpDay

      // eslint-disable-next-line eqeqeq
      if ((tmpMonth == 0 || tmpMonth == 1) && (tmpDay == 0 || tmpDay == 1)) {
        yearV = tmpYear - 1; monthV = 12
        dayV = this.getMaxDay(tmpYear, tmpMonth)
      }
      // eslint-disable-next-line eqeqeq
      if (!(tmpMonth == 0 || tmpMonth == 1) && (tmpDay == 0 || tmpDay == 1)) {
        monthV = tmpMonth - 1
        dayV = this.getMaxDay(tmpYear, tmpMonth)
      }
      // eslint-disable-next-line eqeqeq
      if ((tmpMonth == 0 || tmpMonth == 1) && !(tmpDay == 0 || tmpDay == 1)) {
        dayV = tmpDay - 1
      }
      // eslint-disable-next-line eqeqeq
      if (!(tmpMonth == 0 || tmpMonth == 1) && !(tmpDay == 0 || tmpDay == 1)) {
        dayV = tmpDay - 1
      }
      this.yearsModel = yearV
      this.monthsModel = monthV
      this.daysModel = dayV
    },
    dayright() {
      var myDate = new Date()
      var year = myDate.getFullYear()// 获取当前年
      var month = myDate.getMonth() + 1// 获取当前月
      var day = myDate.getDate()// 获取当前日

      var tmpYear = this.yearsModel
      var tmpMonth = this.monthsModel
      var tmpDay = this.daysModel

      if (tmpYear == null) {
        // eslint-disable-next-line no-redeclare
        var myDate = new Date()
        // eslint-disable-next-line no-redeclare
        var year = myDate.getFullYear()// 获取当前年
        // eslint-disable-next-line no-redeclare
        var month = myDate.getMonth() + 1// 获取当前月
        // eslint-disable-next-line no-redeclare
        var day = myDate.getDate()// 获取当前日
        this.yearsModel = year
        this.monthsModel = month
        this.daysModel = day
        return
      }

      if (tmpMonth == null) { tmpMonth = 0 }
      if (tmpDay == null) { tmpDay = 0 }
      if (tmpYear > year) {
        this.yearsModel = year
        this.monthsModel = month
        this.daysModel = day
        return
      }
      // eslint-disable-next-line eqeqeq
      if (tmpYear == year) {
        // eslint-disable-next-line eqeqeq
        if ((tmpMonth > month || tmpMonth == 0) || (tmpMonth == month) && (tmpDay >= day || tmpDay == 0)) {
          this.yearsModel = year
          this.monthsModel = month
          this.daysModel = day
          return
        }
      }

      var maxDay = this.getMaxDay(tmpYear, tmpMonth)
      var yearV = tmpYear
      var monthV = tmpMonth
      var dayV = tmpDay

      // eslint-disable-next-line eqeqeq
      if ((tmpMonth == 0 || tmpMonth == 12) && (tmpDay == 0 || tmpDay == maxDay)) {
        yearV = tmpYear + 1; monthV = 1
        dayV = 1
      }
      // eslint-disable-next-line eqeqeq
      if (!(tmpMonth == 0 || tmpMonth == 12) && (tmpDay == 0 || tmpDay == maxDay)) {
        monthV = tmpMonth + 1
        dayV = 1
      }
      // eslint-disable-next-line eqeqeq
      if (!(tmpMonth == 0 || tmpMonth == 12) && !(tmpDay == 0 || tmpDay == maxDay)) {
        dayV = tmpDay + 1
      }

      this.yearsModel = yearV
      this.monthsModel = monthV
      this.daysModel = dayV
    },*/
    getMaxDay(year, month) {
      var new_year = year // 取当前的年份
      var new_month = month++// 取下一个月的第一天，方便计算（最后一天不固定）
      if (month > 12) // 如果当前大于12月，则年份转到下一年
      // eslint-disable-next-line brace-style
      {
        new_month -= 12 // 月份减
        new_year++ // 年份增
      }
      var new_date = new Date(new_year, new_month, 1)// 取当年当月中的第一天
      return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate()// 获取当月最后一天日期
    }
  }
}
</script>

<style scoped>

</style>
