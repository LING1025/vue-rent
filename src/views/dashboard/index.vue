<template>
  <!--    <p>长租系统 V2.0&nbsp;&nbsp;&nbsp;数据管理中心</p>-->
  <div class="block">
    <el-carousel trigger="click" :interval="5000" height="imgHeight">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img ref="imgHeight" :src="item.idView" class="banner_img"/>
      </el-carousel-item>
    </el-carousel>
    <p>长租系统 V2.0&nbsp;&nbsp;&nbsp;数据管理中心</p>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      // 图片需要引入, 否则无法显示
      imgList: [
        { id: 0, idView: require('../../assets/images/banner1.jpg') },
        { id: 1, idView: require('../../assets/images/banner2.jpg') },
        { id: 2, idView: require('../../assets/images/banner3.jpg') },
        { id: 3, idView: require('../../assets/images/banner4.jpg') }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
  .block {
    position: relative;
    margin: 30px;
    font-size: 20px;
    line-height: 46px;
    text-align: center;
  }
  .banner_img {
    background-position: center center;
    background-repeat: no-repeat;
    width:100%;
    height:100%;
    background-size: cover;
    right: 0;
  }
</style>
