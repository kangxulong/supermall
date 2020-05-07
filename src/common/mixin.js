import {debounce} from "./utils"
import BackTop from "../components/context/backtop/BackTop.vue"

export const itemImgListener = {
  data() {
    return {
      itemImgListener:null,

      // 将newRefresh保存起来
      refresh:null
    }
  },
  mounted() {
      // 图片加载完成的事件监听
    let refresh = debounce(this.$refs.scroll.refresh, 500);

    // 监听item中图片加载情况，以让better-scroll重新计算高度
    this.itemImgListener = () => {
      this.refresh;
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    backClick() {
      // 这样调用会非常长，不利于阅读
      // this.$refs.scroll.scroll.scrollTo(0,0,500)

      this.$refs.scroll.scrollTo(0, 0, 200)
    },
    listenShowBackTop(position) {
      this.isShow = (-position.y) > 1000
    }
  }
}