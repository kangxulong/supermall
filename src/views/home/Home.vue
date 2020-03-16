<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type = "3" 
            @scroll="contentScroll"
            :pull-up-load = "true"
            @pullingUp = "loadMore">
      <home-swiper :banners = "banners"></home-swiper>
      <recommends-view :recommends = "recommends"></recommends-view>
      <feature-view></feature-view>
      <tab-control 
      :titles="['流行', '新款', '精选']" 
      class="tab-control"
      @tabClick="tabClick"></tab-control>
      <goods-list :goodsList="showTab"></goods-list>
    </scroll>
    <!-- 监听组件的事件需要在click后加上.native，否则组件点击不生效 -->
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
        isShow: false
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
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
      },

      backClick() {
        // 这样调用会非常长，不利于阅读
        // this.$refs.scroll.scroll.scrollTo(0,0,500)

        this.$refs.scroll.scrollTo(0, 0)
      },

      contentScroll(position) {
        this.isShow = (-position.y) > 1000
      },

      loadMore() {
        this.getHomeGoods(this.currentType);
        /* 暂时解决better-scroll计算content高度时，因图片未加载，没有计算图片高度 
          导致高度计算错误，从而页面不能滚动，解决方法就是在数据请求后再进行一次刷新
        */
        // this.$refs.scroll.scroll.refresh() 
                                          
      },

      /*
        网络请求相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then( res => {
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
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom:49px;
    overflow: hidden;
  }
</style>  