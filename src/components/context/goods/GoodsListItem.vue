<template>
  <div class="goodsListItem">
    <a :href="goodsListItem.link">
      <img :src="goodsListItem.show.img" alt="">
      <div class="good-info">
        <p>{{goodsListItem.title}}</p>
        <span class="price">￥{{goodsListItem.price}}</span>
        <span class="collect">{{goodsListItem.cfav}}</span>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
   props: {
     goodsListItem: {
       type: Object,
       default() {
         return {}
       }
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