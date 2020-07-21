<template>
  <div class="block">
    <el-carousel :height="banH +'px'" :interval="5000">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img ref="banH" class="banner_img" :src="item.idView">
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
      banH: 508,
      // 图片需要引入, 否则无法显示
      imgList: [
        { id: 0, idView: require('../../assets/images/banner1.jpg') },
        { id: 1, idView: require('../../assets/images/banner2.jpg') },
        { id: 2, idView: require('../../assets/images/banner3.jpg') },
        { id: 3, idView: require('../../assets/images/banner4.jpg') }
      ]
    }
  },
  mounted() {
    this.imgLoad()
    window.addEventListener('resize', () => {
      this.banH = this.$refs.banH[0].height
      this.imgLoad()
    }, false)
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {
        // eslint-disable-next-line eqeqeq
        if (this.$refs.banH[0].height == 0) {
          this.banH = 508
        } else {
          this.banH = this.$refs.banH[0].height
        }
      })
    }
  }
}

</script>

<style lang="css" scoped>
  .block {
    margin: 30px;
    font-size: 20px;
    line-height: 65px;
    text-align: center;
  }
  .banner_img {
    background-position: center center;
    background-repeat: no-repeat;
    width:100%;
  }
</style>
