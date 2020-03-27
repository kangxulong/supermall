<template>
  <div>
    <swiper class="detail-swiper"> 
    <!--此处的class不可以使用swiper，因为在Swiper封装的时候使用了document.querySelector('.swiper'),
    querySeletor是在全局查找class=“swiper”，所以这里不可以使用swiper-->

      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"

  export default {
    data() {
      return {

      }
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
