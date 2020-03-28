<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll:null
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        // click为false时，content中的button可以点击，但是div不可以点击，
        // 如果需要点击div，必须把click设置为true
        click: true,
        probeType: this.probeType,
        pullUpLoader:this.pullUpLoad
      })

      // 2. 监听滚动的位置
      if (this.probeType === 2 || this.probeType ===3 ) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        });
      }
      // 3.监听上拉加载的情况
      if (this.pullUpLoader = true) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>


<style scoped>
/* scoped是作用域，有了这个属性后，即便class与其他组件中的class重名也不会冲突 */


</style>
