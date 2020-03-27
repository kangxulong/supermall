<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-columns">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    color: #ccc;
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222;
    font-size: 16px;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .new-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .old-price {
    font-size: 15px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    color: #ffffff;
    background-color: var(--color-high-text);
    padding: 2px 8px;
    border-radius: 8px;
    margin-left: 5px;

    /* 让元素上浮动一点，使用relative即可 */
    position: relative;
    top: -8px;
  }

  .info-columns {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-top: 15px;
    font-size: 13px;
    line-height:30px;
    border-bottom: 3px solid #f2f5f8;

  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    font-size: 13px;
    color: #333;
  }

  .info-service img {
    width: 15px;
    height: 15px;

    position: relative;
    top: 2px;
  }
</style>