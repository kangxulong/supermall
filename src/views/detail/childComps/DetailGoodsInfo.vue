<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info" clear-fix>
    <div class="info-desc">
      <div class="desc-top"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="desc-end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-img">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" 
      @load="imageLoad">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imageLength: 0
      }
    },
    methods: {
      imageLoad() {
        // 判断所有图片都加载完，那么进行一次回调发射就可以了
        if(++this.counter == this.imageLength) {
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      // watch可以监听属性值的变化
      detailInfo() {
        this.imageLength = detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 10px;
  }

  .info-desc {
    padding: 10px 5px;
    font-size: 15px;
  }

  .info-desc .desc {
    padding: 15px 0;
  }

  .info-desc .desc-top,.info-desc .desc-end {
    width: 100px;
    height: 1px;
    background-color: rgb(161, 161, 161);
    position: relative;
  }
  .info-desc .desc-top {
    float: left;
  }
  .info-desc .desc-end {
    float: right;
  }
  
  .info-desc .desc-top::before,.info-desc .desc-end::after {
    content: "";
    width: 5px;
    height: 5px;
    background-color: rgb(12, 12, 12);
    position: absolute;
    bottom: 0;
  }

  .info-desc .desc-end::after {
    right: 0;
  }

  .info-key {
    margin: 10px 0;
    color: #222;
  }

  .info-img img {
    width: 100%;
  }
</style>