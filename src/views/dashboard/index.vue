<template>
  <div class="dashboard-container">
<!--    <div class="dashboard-text">登录用户名: {{ name }}</div>-->
    <div class="dashboard-logo">
      <img width="1000" height="500" alt="logo" src="../../icons/tu1.png">
      <p>长租系统 V2.0&nbsp;&nbsp;&nbsp;数据管理中心</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  position: relative;
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-logo {
    position: absolute;
    top: 80px;
    left: 160px;
    text-align: center;
  }
}
</style>
