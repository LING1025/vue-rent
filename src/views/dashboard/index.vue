<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-logo">
      <img width="272" height="83" alt="logo" src="../../icons/logo.png">
      <p>长租系统 V2.0</p>
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
    text-align: center;
  }
}
</style>
