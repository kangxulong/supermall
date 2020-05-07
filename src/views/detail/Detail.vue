<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"
                    @titleClick = "titleClick"
                    ref="navBar"></detail-nav-bar>
    <scroll class="content" 
            ref="scroll"
            @scroll="contentScroll"
            :probe-type = "3">
      <detail-swiper :top-images = "topImages" />
      <detail-base-info :goods = "goods"></detail-base-info>
      <detail-shop-info :shop = "shop"></detail-shop-info>
      <detail-goods-info :detail-info = "detailInfo" @imageLoad = "imageLoad"></detail-goods-info>
      <detail-params-info :goods-params = "goodsParams" ref="params"></detail-params-info>
      <detail-comment-info :comment-info = "commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goodsList = "recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar />
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamsInfo from "./childComps/DetialParamsInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/context/goods/GoodsList"
  
  import {getDetail, goods, shop, goodsParams, comment, getRecommend} from "network/detail"

  import {debounce} from "common/utils"
  import {itemImgListener, backTopMixin} from "common/mixin"

  export default {
    name: "Detail",
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        goodsParams:{},
        commentInfo:{},
        recommend:[],
        themeTopYs:[],
        getThemeTopYs:null,
        currentIndex:0
      }
    },
    mixins:[itemImgListener,backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
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

        // 获取商品参数信息
        this.goodsParams = new goodsParams(data.itemParams.info, data.itemParams.rule)

        // 获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      });
      getRecommend().then(res => {
        console.log(res);
        this.recommend = res.data.list
      })

      this.getThemeTopYs = debounce(() => {
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)

        console.log(this.themeTopYs);
        
      }, 200)
    },
    mounted() {
      // 初始化滚动，首次进入页面滚动为0
    },

    destroyed() {
      this.$bus.$off("itemImageLoad", this.itemImgListener)
    },
    methods: {
      imageLoad() {
        // 因为使用mixin保存了newRefresh，所以可以直接使用this.newRefresh()
        this.refresh
        this.getThemeTopYs()
      },
      titleClick(index) {
        console.log(index);
        // 滚动的位置要去掉navbar的高度44px
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44, 200)
      },
      contentScroll(position) {
        // console.log(position);
        // 1.获取Y值
        const positionY = -position.y

        // 2.positionY和theme中的值进行对比
        // [0, 5364, 6045, 6269]
        // positionY 在 0 和 5364 之间，index = 0
        // positionY 在 5364 和 6045 之间，index = 1
        // positionY 在 6045 和 6269 之间，index = 2
        // positionY 超过 6269，index = 3
        
        // for (let i in this.themeTopYs) {
          // 此时 i 的类型是string，如果出现i+1，得到的结果可能是11，21，31，可以在获取后使用i*1转换为number类型，也可以使用parseInt(i)转换；
          // 直接使用for循环不用考虑i的类型
          const length = this.themeTopYs.length;

          // hack用法会在后面加一个js的Number最大值，所以只取length-1即可
          for (let i = 0; i < length-1; i++) {
            //此时如果i = 3,则i + 1后会越界，导致没有数据 
          // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
          //   console.log(i);
          // }

          // 把length分两个条件进行判定
            // if ( this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i]-44 && positionY < this.themeTopYs[i+1]-44) || ( i === length - 1 && positionY >= this.themeTopYs[i]-44)) ) {
              // 对currentIndex进行一次判定，如果不等于当前i,再进行position的判定，可以降低频率

            // hack做法进行条件判断的简化:
            if (this.currentIndex !== i && ( i< length-1 && positionY >= this.themeTopYs[i]-44 && positionY < this.themeTopYs[i+1]-44)) {
              this.currentIndex = i;
              console.log(i);
              // 将当前currentIndex赋值给navBar中的currentIndex
              this.$refs.navBar.currentIndex = this.currentIndex
              }
            // }
        }
        
        this.listenShowBackTop(position)
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
    height: calc(100% - 44px - 49px);/* 此处的减号两端一定要有空格！！否则滚动不生效 */
  }
</style>
