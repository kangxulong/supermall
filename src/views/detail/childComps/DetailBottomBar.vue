<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left ">
      <div>
        <i class="icon serve"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    background-color: #fff;

    position: relative;
    text-align: center;
    display: flex;
    /* bottom: 49px;  在scroll中计算高度时已经去掉了49px，此处就无需再写了 */
  }

  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item .text {
    font-size: 13px;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .icon {
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    height: 22px;
    width: 22px;
    margin: 5px auto 3px;
    display: block;
  }
  .bar-left .serve {
    background-position: 0 -52px;
  }
  .bar-left .shop {
    background-position: 0 -97px;
  }
  .bar-left .select {
    background-position: 0 -147px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 49px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }
</style>