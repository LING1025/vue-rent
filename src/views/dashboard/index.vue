<template>
  <div class="dashboard-container">
    <div class="dashboard-logo">
      <img width="272" height="83" alt="logo" src="../../icons/logo.png">
    </div>
    <div class="dashboard-text2">
      长租系统 V2.0
    </div>
    <div class="dashboard-text">name: {{ name }}</div>
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
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-logo {
    position: absolute;
    right: 0px;
  }
  &-text2 {
    position: absolute;
    top: 105px;
    right: 0px;
  }
}
</style>
