<template>
  <div class="goods-list">
    <goods-list-item 
    v-for="(item, index) in goodsList" 
    :goods-list-item="item" 
    :key="index"
    class="goods-list-item">
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem"

  export default {
    components: {
      GoodsListItem
    },
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    } 
  }
</script>

<style>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>