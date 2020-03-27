<template>
  <div class="shop-info">
    <div class="shop-top">
      <a :href="shop.shopUrl">
        <img :src="shop.logo" alt="">
        <span>{{shop.name}}</span>
      </a>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left" >
        <div class="info-sells">
          {{shop.sells | sellCountFilter}}
          <div class="sells-text">总销量</div>
        </div>
        <div class="good-count">
          {{shop.goodsCount}}
          <div class="count-text">全部宝贝</div>
        </div>
        <div class="good-fans">
          {{shop.fans}}
          <div class="fans-text">粉丝数</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter ? "高":"低"}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">
        <a :href="shop.shopUrl">
          进店逛逛
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      sellCountFilter: function(value) {
        if(value < 10000) return value;
        return (value/10000).toFixed(1) + "万"
      }
    },
  }
</script>

<style scoped>
  .shop-info {
    padding-bottom: 25px;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top a{
    display: flex;
    align-items: center;
    line-height: 50px;
    height: 50px;
    padding: 0px 8px;
    margin: 25px 0;
  }

  .shop-top img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
    margin-right: 8px;
  }

  .shop-middle {
    display: flex;
    text-align: center;
  }

  .shop-middle-item {
    flex: 1;
    width: 100%;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-right: 2px solid #f2f5f8;
    color: #222;
  }
  .info-sells,.good-count,.good-fans {
    font-size: 18px;
  }

  .sells-text,.count-text,.fans-text{
    margin-top: 8px;
    font-size: 13px;
  }

  .shop-middle-right {
    display: flex;
    width: 50%;
    text-align: center;
  }
  .shop-middle-right table {
    margin-left: 30px;
    color: #222;
  }
  .shop-middle-right td {
    padding: 5px 5px;
  }

  .shop-middle-right .score{
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better span {
    color: #fff;
    background-color: #5ea732;
  }

  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    margin-top: 15px;
    text-align: center;/* 只对行内元素和inline-block生效 */
  }
  .shop-bottom .enter-shop {
    display: inline-block;
    padding: 10px 25px;
    background-color: rgb(231, 224, 224);
    width: 150px;
    border-radius: 15px;
  }
</style>