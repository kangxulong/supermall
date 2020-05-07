<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in title" 
        :key = "index"
        class="title-item"
        :class="{active: index === currentIndex}"
        @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    data() {
      return {
        title:['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        // 此处打印index如果显示MouseEvent，表示没有index参数传入，只是简单的事件参数
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      backClick() {
        // 返回上一页
        this.$router.back()

        // 使用go方法
        // this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img{
    margin-top: 11px;
  }
</style>
