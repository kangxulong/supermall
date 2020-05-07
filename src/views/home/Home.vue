<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control 
        :titles="['流行', '新款', '精选']" 
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl1" 
        v-show="isFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type = "3" 
            @scroll = "contentScroll"
            :pull-up-load = "true"
            @pullingUp = "loadMore">
      <home-swiper :banners = "banners" @swiperImageLoad = "swiperImageLoad"></home-swiper>
      <recommends-view :recommends = "recommends"></recommends-view>
      <feature-view></feature-view>
      <tab-control 
        :titles="['流行', '新款', '精选']" 
        @tabClick="tabClick"
        ref="tabControl2"></tab-control>
      <goods-list :goodsList="showTab"></goods-list>
    </scroll>
    <!-- 直接监听组件的事件需要在click后加上.native，否则组件点击不生效 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendsView from "./childComps/HomeRecommendView"
  import FeatureView from './childComps/FeatureView'
  
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/context/tabControl/TabControl"
  import GoodsList from "components/context/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/context/backtop/BackTop"

  import {
    getHomeMultidata,
    getHomeGoods
    } from "network/home"

  import {debounce} from "common/utils"
  import {itemImgListener} from "common/mixin"


  export default {
    components:{
      HomeSwiper,
      RecommendsView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          "pop": {page:0, list: []},
          "new": {page:0, list: []},
          "sell": {page:0, list: []},
        },
        currentType: "pop",
        isShow: false,
        tabOffSetTop:false,
        isFixed: false,
        saveY: 0
      }
    },
    mixins:[itemImgListener],
    created() {
      // 请求多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
    },
    activated() {
      // 进入页面时滚动到saveY的位置
      // 此时最好进行一次刷新
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      // 1. 将离开前的位置信息保存到变量saveY中
      this.saveY = this.$refs.scroll.getScrollY()

      // 2. 离开home页面后不再进行图片加载的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    computed: {
      showTab() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*
        事件监听相关的方法
      */
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = "pop";
            break
          case 1:
            this.currentType = "new";
            break
          case 2:
            this.currentType = "sell";
            break
        }
        // 使用tabControl组件里的currentIndex属性来确定当前选中的是哪个
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        // 这样调用会非常长，不利于阅读
        // this.$refs.scroll.scroll.scrollTo(0,0,500)

        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // backTop的滑动监听
        this.isShow = (-position.y) > 1000

        // tabControl的fixed监听
        this.isFixed = (-position.y) > this.tabOffSetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 使用tabOffSetTop来保存tabControl的offsetTop属性
        this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
      },

      // backTabControl() {
      //   this.$refs.tabControl1.$el.scrollTo(0, this.tabOffSetTop, 0)
      // },

      /*
        网络请求相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list; 
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>

  #home {
    height: 100vh;
    position: relative;
  }

  .home-bar {
    background-color: #ff8198;
    color: #ffffff; 
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom:49px;
    overflow: hidden;
  }
</style>  