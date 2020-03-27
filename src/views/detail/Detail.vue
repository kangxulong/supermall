<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages = "topImages" />
      <detail-base-info :goods = "goods"></detail-base-info>
      <detail-shop-info :shop = "shop"></detail-shop-info>
      <detail-goods-info :detailInfo = "detailInfo" @imageLoad = "imageLoad"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"

  import Scroll from "components/common/scroll/Scroll"
  
  import {getDetail, goods, shop} from "network/detail"

  export default {
    name: "Detail",
    data() {
      return {
        iid:null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo:{}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll
    },
    created() {
      // 保存iid
      this.iid = this.$route.params.iid;
      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        
        //设置data变量
        const data = res.result;

        // 获取顶部轮播图数据
        this.topImages = res.result.itemInfo.topImages
        
        // 获取商品信息
        this.goods = new goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 获取店铺信息
        this.shop = new shop(data.shopInfo)

        // 获取店铺商品详情信息
        this.detailInfo = data.detailInfo
      })
    },
    mounted() {
      console.log("mounted");
      this.$refs.scroll.refresh()
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);/* 此处的减号两端一定要有空格！！否则滚动不生效 */
  }
</style>
