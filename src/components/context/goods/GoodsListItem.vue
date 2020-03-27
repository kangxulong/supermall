<template>
  <div class="goodsListItem" @click="itemClick">
    <img :src="goodsListItem.show.img" alt="" @load="imageLoad">
    <div class="good-info">
      <p>{{goodsListItem.title}}</p>
      <span class="price">￥{{goodsListItem.price}}</span>
      <span class="collect">{{goodsListItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
   props: {
     goodsListItem: {
       type: Object,
       default() {
         return {

         }
       }
     }
   },
   methods: {
    // 监听图片加载完成，以进行scroll.refresh()，这样better-scroll才会重新计算高度
    imageLoad() {
      // 利用‘事件总线’作为中继，把图片加载监听事件发送到home中进行监听变化
      this.$bus.$emit('itemImageLoad')
    },

    itemClick() {
      // 跳转到详情页detial
      this.$router.push('/detail/' + this.goodsListItem.iid)
    }
   }
  }
</script>

<style>
  .goodsListItem {
    width: 48%;
    padding-bottom: 44px;
    position: relative;
    margin-bottom: 5px;
  }
  .goodsListItem img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .good-info {
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
  }
  .good-info p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 8px;
  }
  .good-info .price {
    color: var(--color-tint);
    font-weight: bold;
    margin-right: 20px;
  }

  .good-info .collect {
    position: relative;
  }

  .good-info .collect:before {
    content: "";
    position: absolute;
    left: -15px;
    top: 0px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>